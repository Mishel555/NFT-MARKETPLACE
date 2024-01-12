import { useEffect, useRef, useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames';
import { IEmotion } from '@constants/types';
import api from '@services/api';
import EmotionItem from '../EmotionItem';
import EmotionCounter from '../EmotionCounter';

import ArrowDownIcon from '@assets/icons/arrow-down.svg';
import styles from './style.module.scss';

interface IProps {
  // eslint-disable-next-line
  control: Control<any>;
  // eslint-disable-next-line
  setValue: UseFormSetValue<any>;
  defaultEmotions?: string[];
}

const EmotionBox = ({ control, setValue, defaultEmotions }: IProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isHide, setIsHide] = useState<boolean>(true);
  const [emotions, setEmotions] = useState<IEmotion[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<IEmotion[]>([]);

  const selectEmotion = (emotion: IEmotion): void => {
    const temp = [...selectedEmotions];
    const alreadyExists = temp.find(item => item['_id'] === emotion['_id']);

    if (selectedEmotions.length < 5 && !alreadyExists) {
      temp.push(emotion);
      setValue('emotions', '');
    }

    temp.forEach(({ _id }, index) => {
      setValue(`emotions.${index}`, _id);
    });

    setIsHide(true);
    setSelectedEmotions(temp);
  };

  const removeEmotion = (id: string): void => {
    const temp = [...selectedEmotions].filter(emotion => emotion['_id'] !== id);

    setValue('emotions', null);

    temp.forEach(({ _id }, index) => {
      setValue(`emotions.${index}`, _id);
    });

    setSelectedEmotions(temp);
  };

  useEffect(() => {
    let mounted = true;
    const listener = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Element)) {
        setIsHide(true);
      }
    };

    api.emotions.getAll().then(({ data }) => {
      const emotions = data as IEmotion[];

      if (mounted) {
        emotions.map(emotion => {
          if (defaultEmotions?.includes(emotion['_id'])) {
            setSelectedEmotions(prevState => [...prevState, emotion]);
          }
        });

        setEmotions(emotions);
      }
    }).catch(e => console.log(e));

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
      mounted = false;
    };
  }, [defaultEmotions]);

  return (
    <Controller
      control={control}
      name="emotions"
      defaultValue="[]"
      render={({ fieldState: { error } }) => (
        <div className={styles.root} ref={boxRef}>
          <p className={styles.root__label}>
            Emotions
          </p>
          <div className={styles.root__select}>
            <div className={styles.root__selected} onClick={() => setIsHide(!isHide)}>
              <div className={styles.root__emotion}>
                {selectedEmotions.map(({
                  _id,
                  name,
                }, index) => index < 2 && (
                  <EmotionItem
                    key={_id}
                    id={_id}
                    name={name}
                    remove={removeEmotion}
                  />
                ))}
                {selectedEmotions.length > 2 && <EmotionCounter count={selectedEmotions.length - 2} />}
                {!selectedEmotions.length && 'Choose'}
              </div>
              <button
                type="button"
                className={classNames(styles.root__select_btn, !isHide && styles.root__select_btn)}
              >
                <img src={ArrowDownIcon} alt="" />
              </button>
            </div>
            {isHide ? null : (
              <ul className={styles.root__list}>
                <div className={styles.root__emotion}>
                  {selectedEmotions.map(({
                    _id,
                    name,
                  }) => (
                    <EmotionItem key={_id} id={_id} name={name} remove={removeEmotion} />
                  ))}
                </div>
                {emotions?.map((emotion) =>
                  !selectedEmotions.find(selectedEmotion => selectedEmotion.name === emotion.name) && (
                    <li key={emotion['_id']} onClick={() => selectEmotion(emotion)}>
                      {emotion.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {error && (
            <span className={styles.root__error}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default EmotionBox;
