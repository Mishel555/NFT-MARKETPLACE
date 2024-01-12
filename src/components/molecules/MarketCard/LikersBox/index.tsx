import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRole, IUser } from '@constants/types';
import api from '@services/api';
import { getProfilePublicRoute } from '@utils';
import { LikeIcon } from '@components/icons';
import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  artId: string;
  likes: number;
  iLiked: boolean;
  myUser?: IUser | null;
}

interface ILikers {
  id: string;
  name: string;
  role: IRole;
}

const LikersBox = ({
  artId,
  likes,
  iLiked,
  myUser,
}: IProps) => {
  const navigate = useNavigate();

  const initialState = useMemo(() => {
    if (iLiked && myUser) {
      return [{
        id: myUser['_id'],
        name: myUser?.header ?? myUser?.login,
        role: myUser?.role,
      }];
    }

    return [];
  }, [iLiked, myUser]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [count, setCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(iLiked);
  const [users, setUsers] = useState<ILikers[]>(initialState);

  const toggleShow = useCallback(() => {
    setIsShow(prevState => !prevState);
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const { data } = await api.art.getLikers(artId);

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
  }, [artId]);

  const toggleLike = useCallback(async () => {
    try {
      if (!myUser) {
        return navigate('/signIn');
      }

      setLiked(!liked);
      setCount(prevState => liked ? prevState - 1 : prevState + 1);
      await api.art.like(artId);
      await loadUsers();
    } catch (e) {
      console.log(e);
    }
  }, [artId, loadUsers, liked, myUser, navigate]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element) && isShow) {
      setIsShow(false);
    }
  }, [isShow]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} onMouseEnter={loadUsers} className={styles.root}>
      <button className={styles.root_btn} onClick={toggleLike}>
        <LikeIcon stroke="#000000" fill={liked ? '#000000' : 'transparent'} />
      </button>
      <button onClick={toggleShow} className={styles.root_counter}>
        {count}
      </button>
      {isShow && !!users.length && (
        <ul className={styles.root__wrapper}>
          {users.map(user => (
            <li key={user.id} className={styles.root__wrapper_item}>
              <InternalLink to={getProfilePublicRoute(user.id)}>
                @{user.name}
              </InternalLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikersBox;
