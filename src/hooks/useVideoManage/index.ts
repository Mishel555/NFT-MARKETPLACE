import { useContext } from 'react';
import { VideoManageContext } from '@contexts/VideoManageContext';

// returning all updated data from out context with useContext hook
// from now we are going to use useVideoManage custom hook everywhere were we will need data from context,
// to not import everywhere { useContext }
const useVideoManage = () => useContext(VideoManageContext);

export default useVideoManage;
