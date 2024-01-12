import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import {
  INft,
  MembershipType,
  IProfileArtType,
  AvailableNetworks,
  IFixedPublishFormValues,
  IAuctionPublishFormValues,
  PublishPopupActionTypes, ArtStatusType,
} from '@constants/types';
import { ZERO_ADDRESS } from '@constants/web3';
import api from '@services/api';
import { useAuth, useCurrency, usePopup, useWeb3 } from '@hooks';
import { getGalleryFee, getPublishPopupAction } from '@utils';
import validationSchema from './validation';
import Info from '../Info';
import FormField from '../FormField';
import BlockchainSelect from '../BlockchainSelect';
import Profit from '../Profit';
import Membership from '../Membership';
import Collaborators from '../Collaborators';
import FormActions from '../FormActions';
import RejectArea from '../RejectArea';
import ReasonOfRejection from '../ReasonOfRejection';

import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
  defaultBlockchain: AvailableNetworks;
  minQuantity: number;
  maxQuantity: number;
  resell?: boolean;
  isMembership?: boolean;
  artCopies: INft[] | null;
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

const FixedForm = ({
  cb,
  art,
  resell,
  artCopies,
  minQuantity,
  maxQuantity,
  defaultBlockchain,
  isMembership,
  loadFn,
  setLoading,
  scrollTop,
}: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const popup = usePopup();
  const { usdRates } = useCurrency();
  const { send } = useWeb3();
  const {
    type,
    status,
    artist,
    copies,
    emotions,
    _id: artId,
    description,
    price: defaultPrice,
    collaborators: artCollaborators,
    reason,
  } = art;

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
    unregister,
    getValues,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IFixedPublishFormValues>({
    defaultValues: {
      price: defaultPrice ? defaultPrice : 1,
      quantity: copies?.length && maxQuantity === 10000 ? copies.length : 1,
      blockchain: defaultBlockchain,
      collaborators: [],
      ...(isMembership && ({ membership: 'Standard Membership' })),
    },
    resolver: yupResolver(validationSchema),
  });

  const price = watch('price');
  const membership = watch('membership');
  const quantity = watch('quantity');
  const collaboratorsFees = watch('collaborators')?.map(coll => +coll.fee);

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [blockchain, setBlockchain] = useState<AvailableNetworks>(defaultBlockchain);
  const [galleryFee, setGalleryFee] = useState<number>(0);
  const [priceInUsd, setPriceInUsd] = useState<number>(0);
  const [action, setAction] = useState<PublishPopupActionTypes>(getPublishPopupAction(art, artist, user, resell));
  const [rejectValue, setRejectValue] = useState<string>('');

  const onRejectChange = (value: string) => setRejectValue(value);

  const changeMembership = (membership: MembershipType) => {
    setValue('membership', membership);
  };

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

        if (!myCollaboration?.feedback) {
          return toast.error('Fill cause of rejection');
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

  const sendToApprove = async (data: IFixedPublishFormValues) => {
    try {
      if (!user) return;

      // const priceInUsd = price * usdRates[blockchain];

      // if (priceInUsd < 0.9) {
      //   toast.error('Price can not be lower than 1 USD');
      //   return setLoading(false);
      // }

      await save(data, true);

      await api.art.sendToApprove(artId);

      if (loadFn) {
        loadFn();
      }

      toast.success('Art successfully sent to review');
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

  const save = async (data: IFixedPublishFormValues, fromPublish?: boolean) => {
    try {
      if (!user) return;

      const { collaborators, quantity, blockchain, price } = data;

      await api.art.edit(artId, {
        price,
        blockchain,
        quantity,
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
        publishType: 'fixPrice',
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

  const publishNft = async (data: IFixedPublishFormValues) => {
    try {
      if (!user) return;

      setLoading(true);

      const { price, quantity, blockchain } = data;

      const galleryAddress = user.gallery?.wallet || ZERO_ADDRESS;
      const priceInUsd = price * usdRates[blockchain];
      const galleryFee = getGalleryFee({ fee: user.fee, priceInUsd });

      await save(data, true);

      const { data: singleArt } = await api.art.getSingle(artId);

      if (status !== 'approved' && user.role.name === 'admin') {
        await api.art.approveArt(art['_id']);
      }

      const contractResponse = await send('nftMint', {
        artId,
        price,
        quantity,
        galleryFee,
        galleryAddress,
        blockchain,
        collaborators: singleArt.collaborators || [],
      });

      const nftId = contractResponse.events.SaleCreated.returnValues.tokenId;
      // const { data: copyIds } =
      await api.art.mint(artId, {
        nftId,
        blockchain,
        contractTX: contractResponse.transactionHash,
        ...(singleArt.copies?.length ? ({ copyIds: singleArt.copies.map((copy: INft) => copy['_id']) }) : ({ quantity })),
      });

      // await api.art.publish(artId, {
      //   price,
      //   blockchain,
      //   copyIds: copyIds.map((copy: INft) => copy['_id']),
      // });

      if (cb) {
        cb();
      }

      setLoading(false);
      popup.close();
      navigate('/market');
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

  const resellNft = async () => {
    try {
      if (!user) return;

      setLoading(true);

      if (!artCopies) return;

      const copies = artCopies.filter(copy => !copy.seller && copy.owner === user['_id']);

      if (!copies.length) {
        toast.error('No available copies for resell');
        return setLoading(false);
      }

      // await save(data, true);

      await send('nftSell', {
        price,
        quantity,
        tokenId: copies[0].nftId,
        blockchain,
      });

      await api.art.resell(artId, {
        price,
        copyIds: copies.slice(0, quantity).map(copy => copy['_id']),
      });

      if (cb) {
        cb();
      }

      setLoading(false);
      popup.close();
      navigate('/market');
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

  const onFormSuccess = async (data: IFixedPublishFormValues) => {
    if (!user) return;

    const availableFee = 100 - data.collaborators?.reduce((acc, item) => acc + +item.fee, 0);
    if (availableFee < 0) {
      return toast.error('The sum of collaborators fees cannot exceed 100%');
    }

    if (resell) {
      return await resellNft();
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
    setBlockchain(blockchain);
  };

  useEffect(() => {
    setValue('blockchain', blockchain);
  }, [setValue, blockchain]);

  useEffect(() => {
    if (!user) return;

    const priceInUsd = price * usdRates[blockchain];
    const fee = getGalleryFee({ fee: user.fee, priceInUsd });

    setGalleryFee(fee);
    setPriceInUsd(priceInUsd);
  }, [user, price, usdRates, blockchain]);

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

  return (
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
      {type && emotions && description && (
        <Info description={description} emotions={emotions} type={type} />
      )}

      {isMembership && (
        <Membership type={membership} changeType={changeMembership} />
      )}

      <BlockchainSelect defaultBlockchain={blockchain} readonly={resell || readOnly} onChange={selectBlockchain} />
      <div className={styles.root__wrapper}>
        <FormField
          control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
          name="quantity"
          type="number"
          label="Quantity"
          min={minQuantity}
          max={maxQuantity}
          readonly={readOnly}
        />
        <FormField
          control={control as Control<IFixedPublishFormValues | IAuctionPublishFormValues>}
          name="price"
          type="number"
          label="Price (Per Copy)"
          step={0.0001}
          readonly={readOnly}
        />
        <Profit
          galleryFee={galleryFee}
          price={priceInUsd}
          count={quantity}
          userRole={user?.role.name || 'admin'}
          collaboratorsFees={collaboratorsFees}
        />
      </div>
      {action === 'reject' && (user?.role.name === 'gallery' || user?.role.name === 'admin') && !allowCollaboration && (
        <RejectArea value={rejectValue} onChange={onRejectChange} />
      )}
      {!!reason && <ReasonOfRejection message={reason} />}
      <FormActions actions={ACTIONS[action]} />
    </form>
  );
};

export default FixedForm;

// if (membership) {
//   const { isPublishedPlatinum, isPublishedStandard } = user;
//
//   const { data: typesResponse } = await api.types.getAll();
//   const types = typesResponse as ITypes[];
//   const foundedType = types.filter(type => type.special).find(type => (type.name === membership));
//
//   if (!foundedType) {
//     toast.error('Cannot find type...');
//     return setLoading(false);
//   }
//
//   const membershipType = foundedType.name.replaceAll(' Membership', '').toLowerCase();
//
//   if (membershipType === 'standard' && isPublishedStandard) {
//     toast.error(`You have already published a ${membershipType} membership`);
//     return setLoading(false);
//   }
//
//   if (membershipType === 'platinum' && isPublishedPlatinum) {
//     toast.error(`You have already published a ${membershipType} membership`);
//     return setLoading(false);
//   }
//
//   const mintResponse = await send('membershipMint', {
//     artId,
//     price,
//     blockchain,
//     type: membershipType,
//   });
//
//   const nftId = mintResponse.events.MembershipCreated.returnValues.tokenId;
//
//   await api.art.edit(artId, {
//     type: foundedType['_id'],
//     ...(collaborators.length && ({ collaborators: [{ user: 'ais', fee: 0.1 }] })),
//   });
//
//   const { data: copyIds } = await api.art.mint(artId, {
//     nftId,
//     quantity,
//     blockchain,
//     contractTX: mintResponse.transactionHash,
//   });
//
//   await api.art.publish(artId, {
//     price,
//     blockchain,
//     copyIds: copyIds.map((copy: INft) => copy['_id']),
//   });
//
//   if (cb) {
//     cb();
//   }
//
//   setUser({
//     ...user,
//     [camelize(`isPublished${membershipType}`)]: true,
//   });
//
//   setLoading(false);
//   popup.close();
//   return navigate(`/membership/${art}`);
// }
