import { IMockNotification } from '@constants/types';

export const NOTIFICATIONS: IMockNotification = {
  auction: [
    {
      key: 'purchasedNft',
      text: 'You have successfully purchased nft (nft- link to nft details)',
    },
    {
      key: 'yourNftSold',
      text: 'Somebody has purchased [number of copies] of your nft (nft- link to nft details)',
    },
  ],
  general: [
    {
      key: 'overbidOffer',
      text: 'Somebody made an offer higher',
    },
    {
      key: 'auctionEnds',
      text: 'The time for the auction is about to end',
    },
    {
      key: 'timeExtended',
      text: 'The maximum time has been extended because another offer has been made',
    },
    {
      key: 'wonInAuction',
      text: 'You won the auction',
    },
    {
      key: 'lostInAuction',
      text: 'Auction is won by another (user-nickname)',
    },
    {
      key: 'userBoughtNow',
      text: 'A user bought at the maximum price',
    },
    {
      key: 'reservePrice',
      text: 'The reserve price has not been exceeded',
    },
  ],
};

// [
// // {
// //   key: 'platform',
// //   title: 'Product updates',
// //   text: 'Receive messages from our platform',
// // },
// // {
// //   key: 'reminders',
// //   title: 'Reminders',
// //   text: 'Receive booking reminders, pricing notices',
// // },
// // {
// //   key: 'promotional',
// //   title: 'Promotions and tips',
// //   text: 'Receive coupons, promotions, surveys',
// // },
// // {
// //   key: 'jobRegulations',
// //   title: 'Policy and community',
// //   text: 'Receive updates on job regulations',
// // },
// // {
// //   key: 'accountMessages',
// //   title: 'Account support',
// //   text: 'Receive messages about your account, your trips, legal alerts',
// // },
// // {
// //   key: 'billingUpdates',
// //   title: 'Reminders',
// //   text: 'Upcoming payments and balance changes',
// // },
// // {
// //   key: 'governmentUpdates',
// //   title: 'Policy and community',
// //   text: 'Receive updates on government regulations',
// // },
//
// ];
