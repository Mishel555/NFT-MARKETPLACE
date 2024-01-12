import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ArtType } from '@constants/types';
import api from '@services/api';
import UploadArea from '../UploadArea';
import ResolutionWarning from '../ResolutionWarning';
import UploadProgress from '../UploadProgress';
import UploadDone from '../UploadDone';
import styles from './style.module.scss';

interface IProps {
  type: ArtType;
  setArt: (id: string | null) => void;
}

const UploadStep = ({ type, setArt }: IProps) => {
  const navigate = useNavigate();
  const abortController = useRef<AbortController>(new AbortController());

  const [file, setFile] = useState<File | null>(null);
  const [incompatibleResolution, setIncompatibleResolution] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<null | number>(null);

  const resetValues = () => {
    setArt(null);
    setFile(null);
    setUploadProgress(null);
    setIncompatibleResolution(false);
  };

  const uploadFile = useCallback(async (file: File) => {
    try {
      const { signal } = abortController.current;
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        signal,
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const {
            total,
            loaded,
          } = progressEvent;
          const progress = Math.round((loaded * 100) / total);
          setUploadProgress(progress);
        },
      };

      const { data } = type === 'video' ? await api.art.uploadVideo(formData, config)
        : await api.art.uploadNftImage(formData, config);

      const artId = data.art || data['_id'];
      setArt(artId);
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      if (error.response?.status === 401) {
        toast.error('Something went wrong, please try again...');
        navigate('/signIn');
      } else {
        if (error.response?.data.message) {
          toast.error(error.response?.data.message);
        } else {
          toast.error(error.message || e as string);
        }
      }
    }
  }, [setArt, type, navigate]);

  const getFile = useCallback(async (file: File, incompatibleResolution?: boolean) => {
    if (!incompatibleResolution) {
      setFile(file);
      await uploadFile(file);
      return;
    }

    setFile(file);
    setIncompatibleResolution(true);
  }, [uploadFile]);

  const confirmIncompatibleFile = async () => {
    if (!file) {
      return;
    }

    setIncompatibleResolution(false);
    await uploadFile(file);
  };

  const removeFile = () => {
    setFile(null);
    setIncompatibleResolution(false);
  };

  const cancelUpload = () => {
    resetValues();
    abortController.current.abort();
    abortController.current = new AbortController();
  };

  return (
    <div className={styles.root}>
      {!file && !incompatibleResolution && (
        <UploadArea type={type} loadFile={getFile} />
      )}

      {incompatibleResolution && (
        <ResolutionWarning type={type} confirm={confirmIncompatibleFile} cancel={removeFile} />
      )}

      {uploadProgress !== null && uploadProgress !== 100 && (
        <UploadProgress progress={uploadProgress} cancel={cancelUpload} />
      )}

      {uploadProgress === 100 && (
        <UploadDone cancel={resetValues} />
      )}
    </div>
  );
};

export default UploadStep;
