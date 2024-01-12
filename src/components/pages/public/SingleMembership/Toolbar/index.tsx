import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRole, IUser } from '@constants/types';
import api from '@services/api';
import { getProfilePublicRoute } from '@utils';
import { useAuth } from '@hooks';
import { LikeIcon } from '@components/icons';
import { InternalLink } from '@components/atoms';

// import GalleryViewIcon from '@assets/icons/gallery-view-icon.svg';
// import VrViewIcon from '@assets/icons/vr-view-icon.svg';
// import FullScreenIcon from '@assets/icons/fullscreen-view-icon.svg';
// import BlackMoreIcon from '@assets/icons/black-more-icon.svg';
import styles from './style.module.scss';

interface ILikers {
  id: string;
  name: string;
  role: IRole;
}

interface IProps {
  id: string;
  isLiked: boolean;
  likeCount: number;
}

const Toolbar = ({
  id,
  isLiked,
  likeCount,
}: IProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [liked, setLiked] = useState<boolean>(isLiked);
  const [count, setCount] = useState<number>(likeCount);
  const [users, setUsers] = useState<ILikers[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);

  const showLikes = useCallback(() => setIsShow(true), []);
  const hideLikes = useCallback(() => setIsShow(false), []);

  const toggleLike = useCallback(async () => {
    try {
      if (!user) {
        return navigate('/signIn');
      }

      setLiked(prevState => !prevState);
      setCount(prevState => liked ? prevState - 1 : prevState + 1);
      await api.art.like(id);
      await loadUsers();
    } catch (e) {
      console.log(e);
    }
  }, [liked]);

  const loadUsers = useCallback(async () => {
    try {
      const { data } = await api.art.getLikers(id);

      const temp: ILikers[] = [];

      data.forEach(({ user }: { user: IUser }) => {
        temp.push({
          id: user['_id'],
          name: user.header ?? user.login,
          role: user.role,
        });
      });

      setUsers(temp);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className={styles.root}>
      {/* <ul className={styles.root__list}> */}
      {/*   <li className={styles.root__item}> */}
      {/*     <p className={styles.root__item__text}>GALLERY VIEW</p> */}
      {/*     <button className={styles.root__item__btn}> */}
      {/*       <img src={GalleryViewIcon} alt="" /> */}
      {/*     </button> */}
      {/*   </li> */}
      {/*   <li className={styles.root__item}> */}
      {/*     <p className={styles.root__item__text}>VR VIEW</p> */}
      {/*     <button className={styles.root__item__btn}> */}
      {/*       <img src={VrViewIcon} alt="" /> */}
      {/*     </button> */}
      {/*   </li> */}
      {/*   <li className={styles.root__item}> */}
      {/*     <p className={styles.root__item__text}>fullscreen 360* view</p> */}
      {/*     <button className={styles.root__item__btn}> */}
      {/*       <img src={FullScreenIcon} alt="" /> */}
      {/*     </button> */}
      {/*   </li> */}
      {/* </ul> */}
      <div className={styles.root__controllers}>
        <div className={styles.root__likes} onMouseEnter={showLikes} onMouseLeave={hideLikes}>
          <button onClick={toggleLike} className={styles.root__likes_btn}>
            <LikeIcon stroke="#504A48" fill={liked ? '#504A48' : 'none'} />
            {count}
          </button>
          {isShow && !!users.length && (
            <ul className={styles.root__likes_wrapper}>
              {users.map(user => (
                <li key={user.id} className={styles.root__likes_wrapper_item}>
                  <InternalLink to={getProfilePublicRoute(user.id, user.role.name)}>
                    @{user.name}
                  </InternalLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* <button className={styles.root__more}> */}
        {/*   <img src={BlackMoreIcon} alt="" /> */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default Toolbar;
