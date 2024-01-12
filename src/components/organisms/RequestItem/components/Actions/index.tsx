import { Fragment, useState } from 'react';
import loadable from '@loadable/component';
import { IFee } from '@constants/types';

const Default = loadable(() => import('./Default'));
const Approve = loadable(() => import('./Approve'));
const Reject = loadable(() => import('./Reject'));

export type ActionStateType = 'default' | 'accept' | 'reject';

interface IProps {
  approve: (fee?: IFee) => void;
  reject: (message: string) => void;
  byAdmin?: boolean;
}

const Actions = ({
  approve,
  reject,
  byAdmin,
}: IProps) => {
  const [action, setAction] = useState<ActionStateType>('default');
  const selectAction = (type: ActionStateType): void => setAction(type);

  return (
    <Fragment>
      {(() => {
        switch (action) {
          case 'accept':
            return <Approve selectAction={selectAction} approve={approve} byAdmin={byAdmin} />;
          case 'reject':
            return <Reject selectAction={selectAction} reject={reject} />;
          default:
            return <Default isAdmin={byAdmin} approve={approve} selectAction={selectAction} />;
        }
      })()}
    </Fragment>
  );
};

export default Actions;
