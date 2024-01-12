import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IPropTypes {
  onChange: (value: boolean) => void;
}

const Terms = ({ onChange }: IPropTypes) => (
  <div className={styles.root}>
    <div className={styles.checkbox_block}>
      <input type="checkbox" id="terms" onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor="terms"></label>
    </div>
    <p className={styles.root_text}>
      I confirm that I have read and agree to the
      <InternalLink to="/terms">
        Terms and conditions
      </InternalLink>
      and agree to the processing
      of my personal info
    </p>
  </div>
);

export default Terms;
