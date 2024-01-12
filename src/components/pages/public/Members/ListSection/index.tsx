import { useEffect, useState } from 'react';
import { ITypes, IProfileArtType, MembershipType } from '@constants/types';
import api from '@services/api';
import { MembershipCard } from '@components/molecules';

import styles from './style.module.scss';

const ListSection = () => {
  const [data, setData] = useState<IProfileArtType[] | null>(null);

  useEffect(() => {
    let mounted = true;

    const getMemberships = async () => {
      try {
        const { data: types } = await api.types.getAll();
        const { data } = await api.art.getAll({
          perPage: 2,
          status: 'published',
          type: types.filter((type: ITypes) => type.special).map((type: ITypes) => type['_id']).join(','),
        });

        if (mounted) {
          setData(data.arts);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getMemberships();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className={styles.root}>
      <h1 className={styles.root__title}>Choose your membership pass</h1>
      <p className={styles.root__subTitle}>
        Choose between our Partner and Associate membership passes to begin unlocking access to our technologies,
        permanent exhibitions, participating galleries, marketing support, and everything you need to leave your mark
        in the 5th Dimension of Art.
      </p>

      {data && (
        <div className={styles.root__wrapper}>
          {data.map((data) => !!data.blockchain && (
            <MembershipCard
              id={data['_id']}
              title={data.title}
              copies={data.copiesForSale || 0}
              type={data.type.name as MembershipType}
              image={data.isImage ? data.preview : data.image}
              price={data.price}
              blockchain={data.blockchain}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListSection;
