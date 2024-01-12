console.log('[sw]:waking-up');

self.addEventListener('install', () => {
  console.log('[sw]:install');
});

self.addEventListener('fetch', () => {
});

self.addEventListener('activate', async () => {
  console.log('[sw]:activate');
});

self.addEventListener('push', async event => {
  const text = event.data.text();
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  clients[0].postMessage({ message: text });

  await self.registration.showNotification(text, {
    icon: '/email-logo.png',
  });
});

self.addEventListener('message', (e) => {
  const { token } = e.data;

  if (token) {
    // console.log('[sw]:message', token);
  }
});

//
// self.addEventListener('pushsubscriptionchange', async event => {
//   event.waitUntil(
//     fetch('https://pushpad.xyz/pushsubscriptionchange', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
//         new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
//         new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
//         new_auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null,
//       }),
//     }),
//   );
// });
