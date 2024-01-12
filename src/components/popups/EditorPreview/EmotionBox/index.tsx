import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { IEmotion } from '@constants/types';
import api from '@services/api';
import EmotionItem from './EmotionItem';
import EmotionCounter from './EmotionCounter';

import ArrowDownIcon from '@assets/icons/arrow-down-light.svg';
import styles from '../style.module.scss';

interface IPropTypes {
  selectedEmotions: IEmotion[] | null;
  setValue: (name: string, value: string) => void;
}

const EmotionBox = ({
  selectedEmotions,
  setValue,
}: IPropTypes) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isHide, setIsHide] = useState<boolean>(true);
  const [emotions, setEmotions] = useState<IEmotion[]>([]);
  const [currentEmotions, setCurrentEmotions] = useState<IEmotion[]>([]);

  const selectEmotion = (newEmotion: IEmotion): void => {
    const alreadyExists = currentEmotions.find(item => item['_id'] === newEmotion['_id']);

    if (currentEmotions.length < 5 && !alreadyExists) {
      setCurrentEmotions(prevState => [...prevState, newEmotion]);
    }

    setIsHide(true);
  };

  const removeEmotion = (id: string): void => {
    const temp = [...currentEmotions].filter(emotion => emotion['_id'] !== id);

    setCurrentEmotions(temp);
  };

  useEffect(() => {
    setValue('emotions', '');
    currentEmotions.forEach(({ _id }, index) => {
      setValue(`emotions.${index}`, _id);
    });
  }, [currentEmotions, setValue]);

  useEffect(() => {
    if (selectedEmotions?.length) {
      setCurrentEmotions([...selectedEmotions]);
    }
  }, [selectedEmotions]);

  useEffect(() => {
    let mounted = true;
    const listener = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Element)) {
        setIsHide(true);
      }
    };

    api.emotions.getAll().then(({ data }) => mounted && setEmotions(data)).catch(e => console.log(e));
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.form__group_inner} ref={boxRef}>
      <label className={styles.form__group_label}>
        Emotions
      </label>
      <div className={styles.form__group_select}>
        <div className={styles.form__group_selected} onClick={() => setIsHide(!isHide)}>
          <div className={styles.form__group_selected_emotion_root}>
            {currentEmotions.map(({
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
            {currentEmotions.length > 2 && <EmotionCounter count={currentEmotions.length - 2} />}
            {!currentEmotions.length && 'Choose'}
          </div>
          <button
            type="button"
            className={classNames(styles.form__group_select_button, !isHide && styles.form__group_select_button_active)}
          >
            <img src={ArrowDownIcon} alt="" />
          </button>
        </div>
        {isHide ? null : (
          <ul className={styles.form__group_list}>
            <div className={styles.selected_emotions_root}>
              {currentEmotions.map(({
                _id,
                name,
              }) => (
                <EmotionItem key={_id} id={_id} name={name} remove={removeEmotion} />
              ))}
            </div>
            {emotions?.map((emotion) =>
              !currentEmotions.find(currentEmotion => currentEmotion.name === emotion.name) && (
                <li key={emotion['_id']} onClick={() => selectEmotion(emotion)}>
                  {emotion.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmotionBox;
