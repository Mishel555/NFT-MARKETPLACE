import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '@hooks';
import { IArtAction, IProfileArtType, ArtStatusType } from '@constants/types';

import BlackMoreIcon from '@assets/icons/black-more-icon.svg';
import animations from '@styles/animations.module.scss';
import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
  actions: IArtAction[];
}

const SELL_STATUSES: ArtStatusType[] = ['closed', 'owned', 'sold out', 'published'];
const REVIEW_STATUSES: ArtStatusType[] = ['processed', 'onCollaboratorsReview', 'onGalleryApproval', 'approval', 'rejected'];
const EDIT_DISALLOWED_STATUSES: ArtStatusType[] = ['approval', 'approved', 'published', 'sold out', 'closed'];
const DOWNLOAD_ALLOWED_STATUSES: ArtStatusType[] = ['published', 'sold out', 'closed'];
const APPROVAL_ALLOWED_STATUSES: ArtStatusType[] = ['approval', 'approved', 'published', 'sold out', 'closed'];

const Actions = ({ art, actions }: IProps) => {
  const { id: paramID } = useParams();
  const { user } = useAuth();

  const {
    type,
    owned,
    status,
    isImage,
    inMyPage,
    artCreatorId,
    artGallery,
    collaborators,
  } = useMemo(() => ({
    type: art.type,
    status: art.status,
    isImage: art.isImage,
    artCreatorId: art.artist['_id'],
    artGallery: art.artist.gallery,
    inMyPage: user && user['_id'] === paramID,
    owned: art.doIOwnNotSelling && art.doIOwnNotSelling > 0,
    isGif: art.info.type === 'gif',
    collaborators: art.collaborators,
  }), [art, paramID, user]);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const open = () => setShow(true);

  const close = () => setShow(false);

  const userActions = useMemo<IArtAction[]>(() => {
    const artOwnerId = (owned && user) ? user['_id'] : artCreatorId;
    const temp: IArtAction[] = [];

    actions.forEach(({ name }, index) => {
      if (name === 'Review') {
        if (!user) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const iAmCollaborator = collaborators.findIndex(coll => coll.user === user['_id']) > -1;

        if (!REVIEW_STATUSES.includes(status)) return;

        if (user.role.name !== 'admin') {
          if (!iAmCollaborator) {
            if (user.role.name !== 'gallery' && user['_id'] !== artOwnerId) return;

            if (artGallery && user.role.name === 'gallery') {
              if (user['_id'] !== artGallery['_id']) return;
            }
          }
        }
      }

      if (name === 'Delete') {
        if (!user) return;

        if (type?.special) return;

        if (user.role.name !== 'admin') {
          if (status === 'published') return;

          if (artOwnerId !== user['_id']) return;
        }

        if (artOwnerId !== user['_id'] && status !== 'published') return;
      }

      if (name === 'Edit') {
        if (!user) return;

        if (isImage) return;

        if (status !== 'processed') return;

        if (user.role.name === 'user' || user.role.name === 'gallery') return;

        if (user.role.name !== 'admin' && artOwnerId && artOwnerId !== user['_id']) return;

        if (EDIT_DISALLOWED_STATUSES.includes(status)) return;
      }

      if (name === 'Edit Preview') {
        if (!user) return;

        if (status !== 'processed') return;

        if (user.role.name === 'user' || user.role.name === 'gallery') return;

        if (user.role.name !== 'admin' && artOwnerId && artOwnerId !== user['_id']) return;

        if (EDIT_DISALLOWED_STATUSES.includes(status)) return;
      }

      if (name === 'Edit Details') {
        if (!user) return;

        if (status !== 'processed') return;

        if (!isImage) return;

        if (user.role.name === 'user' || user.role.name === 'gallery') return;

        if (user.role.name !== 'admin' && artOwnerId && artOwnerId !== user['_id']) return;

        if (EDIT_DISALLOWED_STATUSES.includes(status)) return;
      }

      if (name === 'Download') {
        if (!user) return;

        if (!inMyPage && user.role.name !== 'admin') return;

        if (artOwnerId !== user['_id'] && user.role.name !== 'admin') return;

        if (!DOWNLOAD_ALLOWED_STATUSES.includes(status)) {
          if (user.role.name !== 'admin') return;
        }
      }

      if (name === 'Publish') {
        if (!user) return;

        if (status === 'sold out' || status === 'published' || status === 'closed') return;

        if (artOwnerId !== user['_id']) return;

        if (status !== 'approved' && user.role.name !== 'admin') return;
      }

      if (name === 'Sell') {
        if (!user) return;

        if (type?.special) return;

        if (!inMyPage && user.role.name !== 'admin') return;

        if (!owned) return;

        if (!SELL_STATUSES.includes(status)) return;
      }

      if (name === 'Send for approval') {
        if (APPROVAL_ALLOWED_STATUSES.includes(status) || user?.role.name === 'admin') return;
      }

      temp.push(actions[index]);
    });

    return temp;
  }, [owned, collaborators, artGallery, user, artCreatorId, actions, type, status, isImage, inMyPage]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Element)) {
        close();
      }
    };

    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <button onClick={open} className={styles.root__button}>
        <img src={BlackMoreIcon} alt="" />
      </button>
      {show && (
        <ul className={classNames(styles.root__wrapper, show && animations.born_via_fade)}>
          {userActions.map(({ name, fn }, index) => (
            <li
              key={index}
              onClick={() => fn(name === 'Publish' || name === 'Sell' || name === 'Review' ? art : art['_id'])}
              className={styles.root__action}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Actions;
