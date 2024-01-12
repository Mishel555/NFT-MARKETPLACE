import { Fragment, ReactNode } from 'react';
import { EditorFooter, EditorHeader } from '@components/main';
import styles from './style.module.scss';

interface IProps {
  children: ReactNode;
}

const EditorTemplate = ({ children }: IProps) => (
  <Fragment>
    <EditorHeader />
    <div className={styles.root}>
      {children}
    </div>
    <EditorFooter />
  </Fragment>
);

export default EditorTemplate;
