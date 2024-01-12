import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '@services/api';
import { IUser } from '@constants/types';
import { MemberCard } from '@components/molecules';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
  isPublic?: boolean;
}

const Members = ({
  user,
  isPublic,
}: IProps) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<IUser[]>([]);

  useEffect(() => {
    if (user) {
      api.users.getOne(user['_id']).then(({ data }) => {
        const { members } = data;
        const temp: IUser[] = members?.map((member: IUser) => ({
          ...member,
          gallery: data,
        }));

        if (temp) {
          setMembers(temp);
        }
      }).catch(e => {
        const error = e as AxiosError;

        if (error.response?.status === 401) {
          navigate('/signIn');
        }

        console.log(e);
      });
    }
  }, [navigate, user]);

  return (
    <div className={styles.root}>
      {members.map(user => (
        <MemberCard key={user['_id']} user={user} isPublic={isPublic} />
      ))}
    </div>
  );
};

export default Members;
