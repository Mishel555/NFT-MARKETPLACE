import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import api from '@services/api';
import { useAuth, useDeviceManage, usePopup, useVideoManage } from '@hooks';
import { hexToRgba } from '@utils';
import { IDeviceData, IProfileArtType, IScriptInitialType } from '@constants/types';
import Player from './components/Player';
import Timeline from './components/Timeline';

import style from './style.module.scss';

const ALLOWED_STATUSES = ['processed', 'rejected'];
export const initialOptions = (currentDevice: IDeviceData) => {
  const data: IScriptInitialType = {};

  currentDevice.options?.forEach((option) => {
    if (option === 'markIntensity' || option === 'sliderIntensity') {
      if (currentDevice.type !== 'light') {
        data.value = 1; // intensity ( 'value' more comfortable than 'intensity' for devices )
      }
    }

    if (option === 'temperature') {
      data.temperature = 'cold';
    }

    if (option === 'color') {
      data.color = hexToRgba('#ABEBC6', 1);
    }

    if (option === 'type') {
      data.type = 'Hypnotic';
      data.typeId = 300;
    }
  });

  return data;
};

const Editor = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoManager = useVideoManage();
  const deviceManager = useDeviceManage();
  const popupController = usePopup();

  const deviceLoaded = deviceManager.isLoaded;
  const videoLoaded = videoManager.isLoaded;
  const forceRenderState = deviceManager.renderState;
  const artId = useMemo(() => search.get('art'), [search]);

  // state for force handle render
  const [playerRender, setPlayerRender] = useState<number>(0);
  const [timelineRender, setTimelineRender] = useState<number>(0);

  // functions for handle force render
  const playerForceRender = (): void => setPlayerRender(playerRender + 1);
  const timelineForceRender = (): void => setTimelineRender(timelineRender + 1);

  useEffect(() => {
    if (!deviceLoaded || !videoLoaded) {
      popupController.open('editor_loader');
    } else {
      popupController.close();
    }
    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
  }, [deviceLoaded, videoLoaded]);

  useEffect(() => {
    if (!artId) {
      popupController.close();
      return navigate('me');
    }

    if (!videoLoaded && !deviceLoaded) {
      api.art.getSingle(artId).then(({ data }: { data: IProfileArtType }) => {
        let rejectEdit = false;

        if (!user) {
          navigate('/signIn');
          return;
        }

        if (user.role.name !== 'admin' && data.artist['_id'] !== user['_id']) {
          rejectEdit = true;
        }

        if (!ALLOWED_STATUSES.includes(data.status)) {
          rejectEdit = true;
        }

        if (rejectEdit) {
          popupController.close();
          toast.error('You can not edit this art...');
          return navigate(`/profile/${user['_id']}`, { replace: true });
        }

        videoManager.setSource(data.preview);
        deviceManager.loadData(artId);
      }).catch(e => {
        const error = e as AxiosError;

        if (error.response?.status === 401) {
          navigate('/signIn');
        }

        console.log(e);
      });
    }

    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
  }, [artId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      deviceManager.revertValues();
      videoManager.revertValues();
    };
    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.root} key={forceRenderState}>
      <div className={style.editor_wrapper}>
        <Player renderState={playerRender} forceRender={timelineForceRender} />
        <Timeline renderState={timelineRender} forceRender={playerForceRender} />
      </div>
    </div>
  );
};

export default Editor;
