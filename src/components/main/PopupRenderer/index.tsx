import loadable from '@loadable/component';
import {
  IArtPublishProps,
  IRejectProps,
  IArtRemoveProps,
  IImageUploaderProps,
  IEffectPreview,
  IBuyArt,
  IDeleteConfirmProps,
  IArtPreviewProps,
  ICreateNftProps,
  IOfferNftProps,
  IAuctionNotification,
  IBuyNow,
  IEditDetails,
  IAddFundsPopup,
  IEditPreviewProps,
} from '@constants/types';
import { usePopup, useDisableBodyScroll } from '@hooks';

const Notification = loadable(() => import('@components/popups/Notification'));
const ImageView = loadable(() => import('@components/popups/ImageView'));
const ArtPreview = loadable(() => import('@components/popups/ArtPreview'));
const EditorPreview = loadable(() => import('@components/popups/EditorPreview'));
const EditorLoader = loadable(() => import('@components/popups/EditorLoad'));
const MetaMaskAlert = loadable(() => import('@components/popups/MetaMaskAlert'));
const ArtPublish = loadable(() => import('@components/popups/ArtPublish'));
const ArtReject = loadable(() => import('@components/popups/ArtReject'));
const ArtRemove = loadable(() => import('@components/popups/RemoveArtModal'));
const WithoutSave = loadable(() => import('@components/popups/WithoutSave'));
const DeleteConfirm = loadable(() => import('@components/popups/DeleteConfirm'));
const ImageUploader = loadable(() => import('@components/popups/ImageUploader'));
const EffectPreview = loadable(() => import('@components/popups/EffectPreview'));
const BuyArt = loadable(() => import('@components/popups/BuyArt'));
const CreateNft = loadable(() => import('@components/popups/CreateNft'));
const OfferNft = loadable(() => import('@components/popups/OfferNft'));
const AuctionNotification = loadable(() => import('@components/popups/AuctionNotification'));
const AddFunds = loadable(() => import('@components/popups/AddFunds'));
const BuyNow = loadable(() => import('@components/popups/BuyNow'));
const BuyMembership = loadable(() => import('@components/popups/BuyMembership'));
const EditDetails = loadable(() => import('@components/popups/EditDetails'));
const EditPreview = loadable(() => import('@components/popups/EditPreview'));

import styles from './style.module.scss';

const PopupRenderer = () => {
  const {
    data,
    type,
    // open,
    isOpened,
  } = usePopup();

  // open('create_nft');
  useDisableBodyScroll(isOpened);

  return isOpened ? (
    <div className={styles.root}>
      {(() => {
        switch (type) {
          case 'notification':
            return <Notification message={data as string ?? ''} />;
          case 'image':
            return <ImageView src={data as string ?? ''} />;
          case 'art_preview':
            return <ArtPreview {...data as IArtPreviewProps} />;
          case 'editor_preview':
            return <EditorPreview />;
          case 'editor_loader' :
            return <EditorLoader />;
          case 'meta_mask_alert' :
            return <MetaMaskAlert />;
          case 'art_publish' :
            return <ArtPublish {...data as IArtPublishProps} />;
          case 'art_reject' :
            return <ArtReject {...data as IRejectProps} />;
          case 'art_remove' :
            return <ArtRemove {...data as IArtRemoveProps} />;
          case 'without_save':
            return <WithoutSave />;
          case 'delete_confirm':
            return <DeleteConfirm {...data as IDeleteConfirmProps} />;
          case 'image_upload':
            return <ImageUploader {...data as IImageUploaderProps} />;
          case 'effect_preview':
            return <EffectPreview {...data as IEffectPreview} />;
          case 'buy_art':
            return <BuyArt {...data as IBuyArt} />;
          case 'create_nft':
            return <CreateNft {...data as ICreateNftProps} />;
          case 'offer_nft':
            return <OfferNft {...data as IOfferNftProps} />;
          case 'auction_notification':
            return <AuctionNotification {...data as IAuctionNotification} />;
          case 'add_funds':
            return <AddFunds {...data as IAddFundsPopup} />;
          case 'buy_now':
            return <BuyNow {...data as IBuyNow} />;
          case 'buy_membership':
            return <BuyMembership {...data as IBuyNow} />;
          case 'edit_details':
            return <EditDetails {...data as IEditDetails} />;
          case 'edit_preview':
            return <EditPreview {...data as IEditPreviewProps} />;
        }
      })()}
    </div>
  ) : null;
};

export default PopupRenderer;
