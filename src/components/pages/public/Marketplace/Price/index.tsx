import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrency } from '@hooks';
import Group from '../Group';

import styles from './style.module.scss';

interface IProps {
  minMax: {
    min: number;
    max: number;
  };
  setOption: (name: string, options: string | null) => void;
}

interface IState {
  [key: string]: string | null;
}

const Price = ({
  minMax,
  setOption,
}: IProps) => {
  const { changeCurrency } = useCurrency();

  const [searchParams] = useSearchParams();
  const defaultFrom = searchParams.get('priceFrom') ?? minMax.min;
  const defaultTo = searchParams.get('priceTo') ?? minMax.max;
  const mode = searchParams.get('mode');
  const defaultState = useMemo(() => ({
    priceFrom: String(defaultFrom),
    priceTo: String(defaultTo),
  }), [defaultFrom, defaultTo]);

  const [selectedMode, setSelectedMode] = useState<string>(mode ?? 'eth');
  const [values, setValues] = useState<IState>(defaultState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const temp = { ...values };
    const name = e.target.name;
    const value = +e.target.value;

    if (isNaN(value) || value < 0) return;

    if (name === 'priceFrom') {
      if (value < minMax.min) return;
    }

    if (name === 'priceTo') {
      if (value > minMax.max) return;
    }

    temp[name] = String(value);
    setOption('priceFrom', temp.priceFrom);
    setOption('priceTo', temp.priceTo);
    setValues(temp);
  };

  const toggleMode = useCallback(() => {
    if (selectedMode === 'eth') {
      changeCurrency('USD');
    } else {
      changeCurrency('ETH');
    }

    setSelectedMode(prevState => prevState === 'eth' ? 'usd' : 'eth');
  }, [selectedMode]);

  const clearAll = useCallback(() => {
    setOption('priceFrom', '');
    setOption('priceTo', '');
    setValues(defaultState);
  }, []);

  return (
    <Group name="price">
      <div className={styles.root}>
        <div className={styles.root__form}>
          <div className={styles.root__inputBox}>
            <span>From</span>
            <input
              type="number"
              min={minMax.min}
              placeholder="From 0"
              step={0.01}
              name="priceFrom"
              value={values.priceFrom || ''}
              onChange={onChange}
            />
          </div>
          <div className={styles.root__inputBox}>
            <span>To</span>
            <input
              type="number"
              max={minMax.max}
              placeholder="To 1000"
              step={0.01}
              name="priceTo"
              value={values.priceTo || ''}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.root_block}>
        <p className={styles.root_block__currency}>
          Currency:
          <button onClick={toggleMode}>
            {selectedMode}
          </button>
        </p>
        <button onClick={clearAll} className={styles.root_block__clear}>
          Clear All
        </button>
      </div>
    </Group>
  );
};

export default Price;
