import { Fragment } from 'react';
import { IStep } from '@constants/types';
import classNames from 'classnames';
import StepItem from './Item';
import styles from './style.module.scss';

interface IProps {
  data: IStep[];
}

const Steps = ({ data }: IProps) => (
  <div className={styles.root}>
    {data.map((step, index) => {
      const prevDone = data[index - 1] ? data[index - 1].status === 'done' : true;

      return (
        <Fragment key={step.label}>
          <StepItem data={step} active={prevDone} />
          {index !== data.length - 1 && (
            <span
              className={classNames(
                styles.root__divide,
                data[index].status === 'pending' && styles.root__divide_disabled,
              )}
            />
          )}
        </Fragment>
      );
    })}
  </div>
);

export default Steps;
