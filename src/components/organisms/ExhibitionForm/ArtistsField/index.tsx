import { useCallback, useState } from 'react';
import { IUser } from '@constants/types';
import UserList from '../UserList';

import PlusIcon from '@assets/icons/plus-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  artists: IUser[];
  unregisteredArtists: string[];
  users: IUser[];
  saveArtists: (users: IUser[]) => void;
  saveUnregisteredArtists: (users: string[]) => void;
}

const MAX_COUNT = 20;

const ArtistsField = ({
  artists,
  unregisteredArtists,
  users,
  saveArtists,
  saveUnregisteredArtists,
}: IProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const open = () => setIsActive(true);
  const close = () => setIsActive(false);

  const addArtist = useCallback((user: IUser) => {
    const data = [...artists, user];

    close();
    saveArtists(data);
  }, [artists, saveArtists]);

  const addUnregisteredArtist = useCallback((user: string) => {
    close();
    saveUnregisteredArtists([...unregisteredArtists, user]);
  }, [unregisteredArtists, saveUnregisteredArtists]);

  const removeArtist = useCallback((user: string) => {
    const artistIndex = artists.findIndex(({ _id }) => _id === user);
    const unregisteredArtistIndex = unregisteredArtists.findIndex(name => name === user);

    if (artistIndex > -1) {
      const temp = [...artists];
      temp.splice(artistIndex, 1);

      saveArtists(temp);
    }

    if (unregisteredArtistIndex > -1) {
      const temp = [...unregisteredArtists];
      temp.splice(unregisteredArtistIndex, 1);

      saveUnregisteredArtists(temp);
    }
  }, [artists, unregisteredArtists, saveArtists, saveUnregisteredArtists]);

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>
        Artists name
      </h4>
      <ul className={styles.root__list}>
        {artists.map(({
          _id,
          header,
          login,
        }) => (
          <li key={_id} onClick={() => removeArtist(_id)} className={styles.root__list_item}>
            <p className={styles.root__list_text}>{header ?? login}</p>
          </li>
        ))}
        {unregisteredArtists.map((user) => (
          <li key={user} onClick={() => removeArtist(user)} className={styles.root__list_item}>
            <p className={styles.root__list_text}>{user}</p>
          </li>
        ))}
        {isActive ? (
          <UserList
            users={users}
            name="Artist"
            hiddenUsers={artists.map(artist => artist['_id'])}
            selectUser={addArtist}
            addUnregisteredUser={addUnregisteredArtist}
            close={close}
          />
        ) : (artists.length + unregisteredArtists.length) < MAX_COUNT && (
          <button type="button" onClick={open} className={styles.root__list_btn}>
            Add Artist
            <img src={PlusIcon} alt="" />
          </button>
        )}
      </ul>
    </div>
  );
};

export default ArtistsField;
