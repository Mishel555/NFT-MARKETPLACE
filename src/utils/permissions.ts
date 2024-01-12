export const requestNotificationPermission = async () => {
  if (window.Notification) {
    return await Notification.requestPermission();
  }
};
