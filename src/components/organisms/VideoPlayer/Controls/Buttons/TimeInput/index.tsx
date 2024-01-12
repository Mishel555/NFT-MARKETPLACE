import { ChangeEvent, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useFormatSeconds } from '@hooks';

import styles from './style.module.scss';

interface IPropTypes {
  progress: number;
  duration: number;
  seek: (seconds: number) => void;
}

const TimeInput = ({ progress, duration, seek }: IPropTypes) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputProgressChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const pattern = /^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]:?[0-5][0-9]+$))/;
    const value = e.target.value;

    if (!isNaN(+(value.replaceAll(':', '')))) {
      if (value.match(pattern)) {
        const lastIndex = value.lastIndexOf(':');
        const miniSeconds = +parseInt(value.slice(lastIndex).replace(':', ''), 10) / 10;
        const seconds = moment.duration(value.slice(0, lastIndex)).asSeconds() + miniSeconds;

        if (seconds < duration) {
          seek(seconds);
        }
      }
    } else {
      e.target.value = useFormatSeconds(progress);
    }
  };

  useEffect(() => {
    if (inputRef.current && !isFocused) {
      inputRef.current.value = useFormatSeconds(progress);
    }
  }, [progress, isFocused]);

  return (
    <div>
      <input
        ref={inputRef}
        className={styles.input}
        maxLength={11}
        defaultValue={useFormatSeconds(progress)}
        onChange={inputProgressChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default TimeInput;
