import { ArtType } from '@constants/types';
import { ImageViewer, SingleArtPlayer } from '@components/organisms';
import Processing from '../Processing';
import styles from './style.module.scss';

interface IProps {
  type: ArtType;
  preview: string | null;
  cancel: () => void;
}

const PreviewStep = ({
  type,
  preview,
  cancel,
}: IProps) => (
  <div className={styles.root}>
    {!preview && <Processing cancel={cancel} />}
    {preview && (type === 'video' ? <SingleArtPlayer src={preview} /> : <ImageViewer src={preview} />)}
  </div>
);

export default PreviewStep;
