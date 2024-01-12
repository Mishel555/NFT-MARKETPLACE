import { useContext } from 'react';
import { DeviceManageContext } from '@contexts/DeviceManageContext';

// returning all updated data from out context with useContext hook
// from now we are going to use useVideoManage custom hook everywhere were we will need data from context,
// to not import everywhere { useContext }
const useDeviceManage = () => useContext(DeviceManageContext);

export default useDeviceManage;
