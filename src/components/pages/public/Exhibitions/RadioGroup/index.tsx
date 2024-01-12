import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Group from '../Group';

import styles from './style.module.scss';

interface IProps {
  name: string;
  options: string[];
  setOption: (name: string, options: string | null) => void;
}

const RadioGroup = ({
  name,
  options,
  setOption,
}: IProps) => {
  const memoizedOptions = useMemo(() => options, [options]);

  const urlName = name.replaceAll(' ', '');
  const [searchParams] = useSearchParams();
  const urlParams = searchParams.get(urlName);

  const [selectedType, setSelectedType] = useState<string | null>(urlParams || 'all');

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setSelectedType(e.target.name);
    }
  };

  useEffect(() => {
    if (selectedType && selectedType !== options[0]) {
      setOption(urlName, selectedType);
    } else {
      setOption(urlName, null);
    }
  }, [selectedType]);

  return (
    <Group name={name}>
      <div className={styles.root}>
        <ul className={styles.root__group}>
          {memoizedOptions.map((option) => (
            <li key={option} className={styles.root__option}>
              <input
                id={option}
                key={selectedType?.length}
                type="radio"
                defaultChecked={selectedType === option}
                onChange={onChange}
                name={option}
              />
              <label htmlFor={option}>{option}</label>
            </li>
          ))}
        </ul>
      </div>
    </Group>
  );
};

export default RadioGroup;
