import { useContext } from 'react';
import { PopupContext } from '@contexts/PopupContext';

// returning all updated data from out context with useContext hook
// from now we are going to use usePopupManage custom hook everywhere were we will need data from context,
// to not import everywhere { useContext }
const usePopup = () => useContext(PopupContext);

export default usePopup;
