import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

// returning all updated data from out context with useContext hook
// from now we are going to use useAuth custom hook everywhere were we will need data from context,
// to not import everywhere { useContext }
const useAuth = () => useContext(AuthContext);

export default useAuth;
