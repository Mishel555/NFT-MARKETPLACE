import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  INft,
  IProfileArtType,
  AvailableNetworks,
  IAuctionPublishFormValues,
  IFixedPublishFormValues, PublishPopupActionTypes, ArtStatusType,
} from '@constants/types';
import { ZERO_ADDRESS } from '@constants/web3';
import { getGalleryFee, getPublishPopupAction } from '@utils';
import api from '@services/api';
import { useAuth, useCurrency, usePopup, useWeb3 } from '@hooks';
import FormField from '../FormField';
import StartTime from '../StartTime';
import DateField from '../DateField';
import BlockchainSelect from '../BlockchainSelect';
import Profit from '../Profit';
import Collaborators from '../Collaborators';
import FormActions from '../FormActions';
import RejectArea from '../RejectArea';
import ReasonOfRejection from '../ReasonOfRejection';
import validationSchema from './validation';

import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
  defaultBlockchain: AvailableNetworks;
  copies: INft[] | null;
  resell?: boolean;
  scrollTop: () => void;
  setLoading: (value: boolean) => void;
  cb?: () => void;
  loadFn?: () => void;
}

interface IAction {
  label: string;
  onClick?: () => void;
  submit?: boolean;
}

const READ_STATUSES: ArtStatusType[] = ['processed'];

const AuctionForm = ({
  cb,
  art,
  defaultBlockchain,
  copies,
  resell,
  loadFn,
  setLoading,
  scrollTop,
}: IProps) => {
  const navigate = useNavigate();
  const { send } = useWeb3();
  const popup = usePopup();
  const { user } = useAuth();
  const { usdRates } = useCurrency();

  const { _id: artId, reason, auction, collaborators: artCollaborators, status, artist } = art;

  const myCollaboration = user && artCollaborators.find(collaborator => collaborator.user['_id'] === user['_id']);
  const allowCollaboration = myCollaboration && !myCollaboration.agreedAt && !myCollaboration.feedback;
  const readOnly = ((): boolean => {
    if (!user) return true;

    if (resell) {
      return false;
    }

    if (user['_id'] !== artist['_id']) return true;

    return !READ_STATUSES.includes(status);
  })();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    unregister,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IAuctionPublishFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      blockchain: defaultBlockchain,
      collaborators: [],
      ...(auction?.prices && ({
        minimumPrice: auction.prices.minimum,
        buyNowPrice: auction.prices.buyNow,
        startPrice: auction.prices.start,
      })),
    },
  });

  const dateError = errors.endDate?.message;
  const startPrice = watch('startPrice');
  const buyNowPrice = watch('buyNowPrice');
  const minPrice = watch('minimumPrice');
  const collaboratorsFees = watch('collaborators')?.map(coll => +coll.fee);

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [blockchain, setBlockchain] = useState<AvailableNetworks>(defaultBlockchain);
  const [galleryFee, setGalleryFee] = useState<number>(0);
  const [priceInUsd, setPriceInUsd] = useState<number>(0);
  const [action, setAction] = useState<PublishPopupActionTypes>(getPublishPopupAction(art, artist, user, resell));
  const [rejectValue, setRejectValue] = useState<string>('');

  const onRejectChange = (value: string) => setRejectValue(value);

  const approve = async () => {
    try {
      if (!user) return;

      if (art.status === 'onCollaboratorsReview' && allowCollaboration) {
        await api.art.reviewCollaboration(art['_id'], true);
        toast.success('The collaboration has successfully been approved');
      }

      if (user.role.name === 'gallery' && art.status === 'onGalleryApproval') {
        await api.art.approveArt(art['_id']);
        toast.success('The art has successfully been approved');
      }

      if (user.role.name === 'admin' && art.status === 'approval') {
        await api.art.approveArt(art['_id']);
        toast.success('The art has successfully been approved');
      }

      if (loadFn) {
        loadFn();
      }

      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const reject = async () => {
    try {
      if (!user) return;

      if (allowCollaboration) {
        const collaborators = getValues('collaborators');
        const myCollaborationIndex = collaborators.findIndex(coll => coll.username === (user.header ?? user.login));
        const myCollaboration = collaborators[myCollaborationIndex];

        if (!myCollaboration?.feedback && allowCollaboration) {
          setError(`collaborators.${myCollaborationIndex}.feedback`, { message: 'Fill cause of rejection' });
          scrollTop();
          return toast.error('Fill cause of rejection');
        }

        if (!myCollaboration.feedback) {
          return toast.error('Something went wrong...');
        }

        if (myCollaboration.feedback.length < 10) {
          return setError(`collaborators.${myCollaborationIndex}.feedback`, { message: 'Min length of comment is 10' });
        }

        if (myCollaboration.feedback.length > 300) {
          return setError(`collaborators.${myCollaborationIndex}.feedback`, { message: 'Max length of comment is 300' });
        }

        await api.art.reviewCollaboration(art['_id'], false, myCollaboration?.feedback);
        toast.success('The art has successfully been rejected');

        if (loadFn) {
          loadFn();
        }

        return popup.close();
      }

      if (!rejectValue) {
        return toast.error('Fill cause of rejection');
      }

      await api.art.rejectArt(art['_id'], { reason: rejectValue });

      if (loadFn) {
        loadFn();
      }

      toast.error('The art has been rejected');

      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const cancelRejection = () => {
    if (!user) return;

    const collaborators = getValues('collaborators');
    const myCollaborationIndex = collaborators.findIndex(coll => coll.username === (user.header ?? user.login));

    setAction('review');
    clearErrors(`collaborators.${myCollaborationIndex}.feedback`);
  };

  const save = async (data: IAuctionPublishFormValues, fromPublish?: boolean) => {
    try {
      if (!user) return;

      const {
        blockchain,
        endDate,
        buyNowPrice,
        startPrice,
        minimumPrice,
        collaborators,
      } = data;

      await api.art.edit(artId, {
        quantity: 1,
        blockchain,
        publishType: 'auction',
        auction: {
          endsAt: endDate,
          prices: {
            start: startPrice,
            ...(!!minimumPrice && ({ minimum: +minimumPrice })),
            ...(!!buyNowPrice && ({ buyNow: +buyNowPrice })),
          },
        },
        collaborators: collaborators?.map(({ id, fee }) => {
          const collFromObj = artCollaborators?.find(coll => coll.user['_id'] === id);

          if (collFromObj) {
            return {
              fee,
              user: collFromObj.user['_id'],
              ...(collFromObj.comment && ({
                comment: collFromObj.comment,
              })),
              ...(collFromObj.feedback && ({
                feedback: collFromObj.feedback,
              })),
              ...(collFromObj.agreedAt && ({
                agreedAt: collFromObj.agreedAt,
              })),
            };
          }

          return {
            fee,
            user: id,
          };
        }) || [],
      });

      if (loadFn) {
        loadFn();
      }

      if (fromPublish) return;

      toast.success('Art successfully saved');
      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      setLoading(false);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const deleteArt = async () => {
    try {
      if (!user) return;

      await api.art.delete(artId);

      toast.success('Art successfully deleted');

      if (loadFn) {
        loadFn();
      }

      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      setLoading(false);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const sendToDraft = async () => {
    try {
      if (!user) return;

      await api.art.sendToDraft(artId);

      toast.success('Art successfully sent to draft');

      if (loadFn) {
        loadFn();
      }

      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      setLoading(false);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const sendToApprove = async (data: IAuctionPublishFormValues) => {
    try {
      if (!user) return;

      // const priceInUsd = startPrice * usdRates[blockchain];
      //
      // if (priceInUsd < 0.9) {
      //   toast.error('Price can not be lower than 1 USD');
      //   return setLoading(false);
      // }

      await save(data, true);

      await api.art.sendToApprove(artId);
      toast.success('Art successfully sent to review');

      if (loadFn) {
        loadFn();
      }

      popup.close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const publishNft = async (data: IAuctionPublishFormValues) => {
    try {
      if (!user) return;

      setLoading(true);

      const galleryAddress = user?.gallery?.wallet || ZERO_ADDRESS;

      const userCopies = copies;
      // let copyId: string | null = (userCopies && userCopies[0]) ? userCopies[0]['_id'] : null;
      let nftId: number | null = (userCopies && userCopies[0] && userCopies[0].nftId) ? userCopies[0].nftId : null;

      const {
        endDate,
        startPrice,
        buyNowPrice,
        minimumPrice,
        blockchain,
      } = data;

      await save(data, true);

      await api.art.edit(artId, {
        auction: { endsAt: endDate },
      });

      const duration = Math.ceil((moment(endDate).valueOf() - moment().valueOf()) / 1000);
      const priceInUsd = startPrice * usdRates[blockchain];

      const galleryFee = getGalleryFee({
        fee: user.fee,
        priceInUsd,
      });

      const { data: singleArt } = await api.art.getSingle(artId);

      if (status !== 'approved' && user.role.name === 'admin') {
        await api.art.approveArt(art['_id']);
      }

      const mintResponse = await send('auctionMint', {
        artId,
        duration,
        blockchain,
        galleryAddress,
        galleryFee: galleryFee || 0,
        minPrice: startPrice,
        collaborators: singleArt.collaborators || [],
        ...(buyNowPrice && ({ maxPrice: buyNowPrice })),
        ...(minimumPrice && ({ reservePrice: minimumPrice })),
      });

      nftId = mintResponse.events.AuctionCreated.returnValues.tokenId;
      // const { data: copyIds } =
      await api.art.mint(artId, {
        nftId,
        blockchain,
        copyIds: singleArt.copies.map((copy: INft) => copy['_id']),
        contractTX: mintResponse.transactionHash,
      });

      // copyId = copyIds[0]['_id'];

      // await api.art.publish(artId, {
      //   blockchain,
      //   auction: {
      //     endsAt: endDate,
      //     prices: {
      //       start: startPrice,
      //       ...(!!minimumPrice && ({ minimum: +minimumPrice })),
      //       ...(!!buyNowPrice && ({ buyNow: +buyNowPrice })),
      //     },
      //   },
      //   copyIds: [copyId],
      // });

      if (cb) {
        cb();
      }

      setLoading(false);
      popup.close();
      navigate('/market');
    } catch (e) {
      const error = e as AxiosError;
      setLoading(false);
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const resellNft = async (data: IAuctionPublishFormValues) => {
    try {
      if (!user) return;

      setLoading(true);

      const userCopies = copies?.find(copy => !copy.seller && copy.owner === user['_id']);
      const copyId: string | null = userCopies ? userCopies['_id'] : null;
      const nftId: number | null = userCopies ? userCopies.nftId : null;

      const {
        endDate,
        startPrice,
        buyNowPrice,
        minimumPrice,
        blockchain,
      } = data;

      const duration = Math.ceil((moment(endDate).valueOf() - moment().valueOf()) / 1000);

      // const priceInUsd = startPrice * usdRates[blockchain];

      // if (priceInUsd < 0.9) {
      //   toast.error('Price can not be lower than 1 USD');
      //   return setLoading(false);
      // }

      if (!copyId || !nftId || !copies) {
        return toast.error('You don\'t have copies for resell');
      }

      // await save(data, true);
      // let newArtId = artId;
      // const { data: artResponse } =
      // await api.art.fork(artId, { copyId });

      // const newArt = artResponse as IProfileArtType;
      // newArtId = newArt['_id'];
      // const resellResponse =
      await send('auctionSell', {
        duration,
        blockchain,
        tokenId: nftId,
        minPrice: startPrice,
        ...(buyNowPrice && ({ maxPrice: buyNowPrice })),
        ...(minimumPrice && ({ reservePrice: minimumPrice })),
      });

      // await api.art.publish(newArtId, {
      //   blockchain,
      //   auction: {
      //     endsAt: endDate,
      //     prices: {
      //       start: startPrice,
      //       ...(!!minimumPrice && ({ minimum: +minimumPrice })),
      //       ...(!!buyNowPrice && ({ buyNow: +buyNowPrice })),
      //     },
      //   },
      //   copyIds: [copyId],
      //   contractTX: resellResponse.transactionHash,
      // });

      if (cb) {
        cb();
      }

      setLoading(false);
      popup.close();
      navigate('/market');
      return;
    } catch (e) {
      const error = e as AxiosError;
      setLoading(false);
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const onFormSuccess = async (data: IAuctionPublishFormValues) => {
    if (!user) return;

    const availableFee = 100 - data.collaborators?.reduce((acc, item) => acc + +item.fee, 0);

    if (availableFee < 0) {
      return toast.error('The sum of collaborators fees cannot exceed 100%');
    }

    if (resell) {
      return await resellNft(data);
    }

    if (data.save) {
      return await save(data);
    }

    if (user.role.name === 'admin' && !data.collaborators?.length) {
      return await publishNft(data);
    }

    if (art.status === 'processed') {
      return await sendToApprove(data);
    }

    await publishNft(data);
  };

  const onFormError = (e: FieldErrors<IFixedPublishFormValues>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isRoleError = e.collaborators && e.collaborators.findIndex(e => e?.role) > -1;

    if (isRoleError) {
      return toast.error('Please fill out collaborator\'s role or remove it');
    }

    setShowMessage(true);
  };

  const selectBlockchain = (blockchain: AvailableNetworks) => {
    if (resell) {
      return;
    }

    setBlockchain(blockchain);
  };

  const onDateChange = (dateString: string) => {
    setValue('endDate', dateString);
  };

  useEffect(() => {
    setValue('blockchain', blockchain);
  }, [setValue, blockchain]);

  useEffect(() => {
    if (!user) return;

    const priceInUsd = (startPrice || minPrice || buyNowPrice || 0) * usdRates[blockchain];
    const galleryFee = getGalleryFee({
      fee: user.fee,
      priceInUsd,
    });

    setGalleryFee(galleryFee);
    setPriceInUsd(priceInUsd);
  }, [user, usdRates, blockchain, startPrice, minPrice, buyNowPrice]);

  useEffect(() => {
    api.art.getSingle(artId).then(({ data }) => {
      const art = data as IProfileArtType;
      if (art.collaborators?.length) {
        setValue('collaborators', art.collaborators.map(({ user, comment, fee }) => ({
          fee,
          comment,
          id: user['_id'],
          key: user['_id'],
          username: user.header ?? user.login,
          role: user.role?.name,
        })));
      }
    });
  }, [artId, setValue]);

  const ACTIONS: { [key in PublishPopupActionTypes]: IAction[] } = {
    resell: [
      { label: 'Sell', submit: true },
      { label: 'Cancel', onClick: popup.close },
    ],
    publish: [
      ...(() => status === 'processed' ? [
        {
          label: 'Save',
          onClick: () => {
            setValue('save', true);
            handleSubmit(onFormSuccess, onFormError)();
          },
        },
      ] : [])(),
      {
        label: (
          user?.role.name === 'artist' && status === 'processed'
          || user?.role.name === 'admin' && status === 'processed' && collaboratorsFees.length
        ) ? 'Send to review' : 'Publish',
        submit: true,
      },
      { label: 'Cancel', onClick: popup.close },
    ],
    review: [
      { label: 'Cancel', onClick: popup.close },
      ...(() => {
        if (allowCollaboration) {
          return [
            { label: 'Approve', onClick: approve },
            {
              label: 'Reject',
              onClick: () => {
                setAction('reject');
                scrollTop();
              },
            },
          ];
        }

        if (user?.role.name === 'admin' && status === 'approval') {
          return [
            { label: 'Approve', onClick: approve },
            {
              label: 'Reject',
              onClick: () => {
                setAction('reject');
              },
            },
          ];
        }

        if (user && art.artist.gallery && art.artist.gallery['_id'] === user['_id'] && status === 'onGalleryApproval') {
          return [
            { label: 'Approve', onClick: approve },
            {
              label: 'Reject',
              onClick: () => {
                setAction('reject');
              },
            },
          ];
        }

        return [];
      })(),
    ],
    reject: [
      { label: 'Reject', onClick: reject },
      { label: 'Cancel', onClick: cancelRejection },
    ],
    return: [
      { label: 'Back to Draft', onClick: sendToDraft },
      { label: 'Delete', onClick: deleteArt },
      { label: 'Close', onClick: popup.close },
    ],
    default: [
      { label: 'Close', onClick: popup.close },
    ],
  };

  return user ? (
    <form onSubmit={handleSubmit(onFormSuccess, onFormError)} className={styles.root}>
      <Collaborators
        {...((showMessage && ({ errors })))}
        creator={artist['_id']}
        allowAdd={status === 'processed'}
        allowFeedback={action === 'reject'}
        collaboratorsObj={artCollaborators}
        // eslint-disable-next-line
        // @ts-ignore
        watch={watch}
        // eslint-disable-next-line
        // @ts-ignore
        control={control}
        // eslint-disable-next-line
        // @ts-ignore
        setValue={setValue}
        // eslint-disable-next-line
        // @ts-ignore
        unregister={unregister}
        resell={resell}
        readonly={resell || readOnly}
      />

      <BlockchainSelect defaultBlockchain={blockchain} readonly={resell || readOnly} onChange={selectBlockchain} />
      <div className={styles.root__wrapper}>
        <StartTime />
        <DateField
          error={dateError}
          readonly={readOnly && artist['_id'] !== user['_id']}
          defaultValue={auction?.endsAt}
          onDateChange={onDateChange}
        />
      </div>
      <div className={styles.root__wrapper}>
        <FormField
          control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
          type="number"
          name="startPrice"
          label="minimum starting price"
          step={0.0001}
          readonly={readOnly}
        />
        <FormField
          control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
          type="number"
          name="minimumPrice"
          label="reserve price"
          step={0.0001}
          readonly={readOnly}
        />
        <FormField
          control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
          type="number"
          name="buyNowPrice"
          label="max price"
          step={0.0001}
          readonly={readOnly}
        />
        <Profit
          galleryFee={galleryFee}
          price={priceInUsd}
          count={1}
          userRole={user?.role.name || 'admin'}
          collaboratorsFees={collaboratorsFees || []}
        />
      </div>

      {action === 'reject' && (user?.role.name === 'gallery' || user?.role.name === 'admin') && !allowCollaboration && (
        <RejectArea value={rejectValue} onChange={onRejectChange} />
      )}
      {!!reason && <ReasonOfRejection message={reason} />}
      <FormActions actions={ACTIONS[action]} />
    </form>
  ) : null;
};

export default AuctionForm;
