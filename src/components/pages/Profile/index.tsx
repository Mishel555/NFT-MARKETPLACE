import { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { IUser } from '@constants/types';
import api from '@services/api';
import { useAuth } from '@hooks';
import { ProfileRouter } from '@routes/routers';
import { ProfileCard, ProfileIntro } from '@components/molecules';

import styles from './style.module.scss';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user: loggedUser } = useAuth();

  const [user, setUser] = useState<IUser | null>(null);
  const [isPublic, setIsPublic] = useState<boolean | null>(null);

  const loadUser = useCallback(async () => {
    try {
      if (id) {
        const { data } = await api.users.getOne(id);

        if (loggedUser && loggedUser['_id'] === id) {
          setIsPublic(false);
        } else {
          setIsPublic(true);
        }

        setUser(data);
      } else {
        navigate('/');
      }
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  }, [id, loggedUser, navigate]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => setIsPublic(true);
  }, []);

  return (isPublic !== null && user) ? (
    <Fragment>
      <ProfileIntro isPublic={isPublic} coverSrc={user.banner} avatarSrc={user.avatar} />
      <div className={styles.root}>
        <div className={styles.root__wrapper}>
          <ProfileCard path={isPublic ? 'public' : 'private'} user={user} />
          <ProfileRouter path={isPublic ? 'public' : 'private'} user={user} />
        </div>
      </div>
    </Fragment>
  ) : <Fragment> </Fragment>;
};

export default Profile;
