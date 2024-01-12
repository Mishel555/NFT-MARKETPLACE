import { IArtUser, ICollaborator, IUser } from '@constants/types';
import { SingleUser } from '@components/atoms';
import styles from './style.module.scss';

interface IProps {
  title: string;
  creator?: IUser;
  collaborators?: ICollaborator[];
}

const TitleSection = ({ title, creator, collaborators }: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      {title}
    </h1>
    <div className={styles.root__block}>
      {!!creator && <SingleUser user={creator as IArtUser} status="creator" />}
      {collaborators?.map(({ user }, index) => (
        <SingleUser
          user={user}
          status={index === 0 ? collaborators?.length > 1 ? 'collaborators' : 'collaborator' : ''}
        />
      ))}
    </div>
  </div>
);

export default TitleSection;
