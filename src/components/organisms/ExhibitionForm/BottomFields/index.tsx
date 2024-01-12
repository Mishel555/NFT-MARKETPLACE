import { Control } from 'react-hook-form';
import { IExhibitionFormValues, IExhibitionUserList, IUser } from '@constants/types';
import ArtistsField from '../ArtistsField';
import CuratorField from '../CuratorField';
import InputField from '../InputField';

import styles from './style.module.scss';

interface IProps {
  control: Control<IExhibitionFormValues>;
  artists: IUser[];
  curators: IUser[];
  unregisteredArtists: string[];
  unregisteredCurators: string[];
  userList: IExhibitionUserList;
  saveArtists: (users: IUser[]) => void;
  saveCurator: (users: IUser[]) => void;
  saveUnregisteredArtists: (users: string[]) => void;
  saveUnregisteredCurator: (users: string[]) => void;
}

const BottomFields = ({
  control,
  artists,
  curators,
  unregisteredArtists,
  unregisteredCurators,
  userList,
  saveArtists,
  saveCurator,
  saveUnregisteredArtists,
  saveUnregisteredCurator,
}: IProps) => (
  <div className={styles.root__main}>
    <ArtistsField
      users={userList.artists}
      artists={artists}
      unregisteredArtists={unregisteredArtists}
      saveArtists={saveArtists}
      saveUnregisteredArtists={saveUnregisteredArtists}
    />
    <div className={styles.root__desc}>
      <InputField
        control={control}
        name="description"
        type="textarea"
        placeholder="Description of Exhibition"
        label="Description"
      />
    </div>
    <div className={styles.root__desc}>
      <InputField
        control={control}
        name="url"
        placeholder="www.event.com"
        label="Link"
      />
    </div>
    <CuratorField
      users={[...userList.galleries, ...userList.artists]}
      curators={curators}
      unregisteredCurators={unregisteredCurators}
      saveCurators={saveCurator}
      saveUnregisteredCurators={saveUnregisteredCurator}
    />
  </div>
);

export default BottomFields;
