import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
// import { APPLICATION_SERVER_KEY } from '@constants/environment';
// import { IPushSubscription } from '@constants/types';
// import api from '@services/api';
// import {
//   sendMessage,
//   handlePostMessages,
//   registerServiceWorker,
//   subscribeToPushNotification,
//   requestNotificationPermission,
// } from '@utils';
// import { useAuth, useNotification } from '@hooks';
import { PopupRenderer } from '@components/main';
import { RootRouter } from './routes/routers';

// const subscribeOptions = {
//   userVisibleOnly: true,
//   applicationServerKey: APPLICATION_SERVER_KEY,
// };

// const { user, token } = useAuth();
// const { addNotification } = useNotification();
//
// const postMessageListener = useCallback((e: MessageEvent) => {
//   const { data } = e;
//
//   const notification = {
//     read: false,
//     message: data.message,
//     date: new Date().toDateString(),
//   };
//
//   addNotification(notification);
// }, [addNotification]);
//
// const initPushNotification = useCallback(async () => {
//   try {
//     if (!user) return;
//
//     const subscriptions = user.subscriptions || [];
//     const permission = await requestNotificationPermission();
//
//     if (permission !== 'granted') return;
//
//     await registerServiceWorker('/service-worker.js');
//
//     if (token) {
//       await sendMessage({ token });
//     }
//
//     const subscription = await subscribeToPushNotification(subscribeOptions);
//     if (!subscription) return;
//
//     handlePostMessages(postMessageListener);
//
//     const includeThisDevice = subscriptions.some(item => item?.endpoint === subscription.endpoint);
//     subscriptions.push(subscription as IPushSubscription);
//
//     if (!includeThisDevice) {
//       return await api.users.editMe({
//         subscriptions,
//       });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }, [postMessageListener, token, user]);
//
// useEffect(() => {
//   initPushNotification();
// }, [initPushNotification]);

const App = () => (
  <Fragment>
    <RootRouter />
    <ToastContainer />
    <PopupRenderer />
  </Fragment>
);

export default App;
