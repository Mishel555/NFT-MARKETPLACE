export const registerServiceWorker = async (scriptUrl: string) => {
  if (navigator.serviceWorker) {
    await navigator.serviceWorker.register(scriptUrl);
  }
};

export const getSubscription = async (): Promise<PushSubscription | null> => {
  const swRegistration = await navigator.serviceWorker.ready;

  const pushManager = swRegistration.pushManager;
  return await pushManager.getSubscription();
};

export const handlePostMessages = (cb: (e: MessageEvent) => void) => {
  if (!navigator.serviceWorker) {
    return;
  }
  const listener = (e: MessageEvent) => {
    cb(e);
  };

  navigator.serviceWorker.addEventListener('message', listener);

  return () => navigator.serviceWorker.removeEventListener('message', listener);
};

export const subscribeToPushNotification = async (
  options: PushSubscriptionOptionsInit,
): Promise<PushSubscription | null> => {
  if (!navigator.serviceWorker) {
    return null;
  }

  const swRegistration = await navigator.serviceWorker.ready;

  const pushManager = swRegistration.pushManager;
  const subscription = await pushManager.getSubscription();

  if (!subscription) {
    return await pushManager.subscribe(options);
  }

  return subscription;
};

export const sendMessage = async (message: object) => {
  if (!navigator.serviceWorker) {
    return null;
  }

  const swRegistration = await navigator.serviceWorker.ready;
  const activeSw = swRegistration.active;

  if (activeSw) {
    activeSw.postMessage(message);
  }
};

export const unsubscribeFromPushNotification = async () => {
  if (!navigator.serviceWorker) {
    return null;
  }

  const swRegistration = await navigator.serviceWorker.ready;

  const pushManager = swRegistration.pushManager;
  const subscription = await pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  await subscription.unsubscribe();
};
