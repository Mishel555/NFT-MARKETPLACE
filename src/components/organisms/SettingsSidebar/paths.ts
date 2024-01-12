import { ISettingsPath, UserRoles } from '@constants/types';
import paths from '@constants/paths';
import DashboardIcon from '@assets/icons/settings/dashboard-icon.svg';
// import ListingIcon from '@assets/icons/settings/listing-icon.svg';
// import FavoriteIcon from '@assets/icons/settings/favorite-icon.svg';
import FollowingIcon from '@assets/icons/settings/following-icon.svg';
import PayoutIcon from '@assets/icons/settings/payout-icon.svg';
import AccountIcon from '@assets/icons/settings/account-icon.svg';
import SecurityIcon from '@assets/icons/settings/security-icon.svg';
import AppIcon from '@assets/icons/settings/app-icon.svg';
import NotificationIcon from '@assets/icons/settings/notification-icon.svg';
// import HelpIcon from '@assets/icons/settings/help-icon.svg';
import ExhibitionIcon from '@assets/icons/settings/exhibition-icon.svg';

const PATHS: { [key in UserRoles]: ISettingsPath } = {
  admin: {
    'Manage listings': [
      {
        path: paths.SETTINGS.DASHBOARD,
        label: 'Dashboard',
        image: DashboardIcon,
      },
      // {
      //   path: paths.SETTINGS.MY_LIBRARY,
      //   label: 'My Library',
      //   image: ListingIcon,
      //   external: true,
      // },
      // {
      //   path: paths.SETTING,
      //   label: 'Favorites',
      //   image: FavoriteIcon,
      //   disabled: true,
      // },
      {
        path: paths.SETTINGS.EXHIBITIONS,
        label: 'Your Exhibitions',
        image: ExhibitionIcon,
      },
      {
        path: paths.SETTINGS.MY_ARTS,
        label: 'My Arts',
        image: FollowingIcon,
      },
      {
        path: paths.SETTING,
        label: 'Credit card purchases and Payouts',
        image: PayoutIcon,
        disabled: true,
      },
    ],
    'Profile settings': [
      {
        path: paths.SETTINGS.DEFAULT,
        label: 'Account details',
        image: AccountIcon,
      },
      {
        path: paths.SETTINGS.SECURITY,
        label: 'Security',
        image: SecurityIcon,
      },
      {
        path: paths.SETTINGS.APPS,
        label: 'Apps',
        image: AppIcon,
      },
      {
        path: paths.SETTINGS.NOTIFICATIONS,
        label: 'Notifications',
        image: NotificationIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Help center',
      //   image: HelpIcon,
      //   disabled: true,
      // },
    ],
    'Manage App': [
      {
        path: paths.SETTINGS.APPROVALS,
        label: 'Registration requests',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.BANNERS,
        label: 'Banners',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.ART_ROOMS,
        label: 'ArtRooms',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.GALLERY_TERMS,
        label: 'Terms and Conditions (Gallery)',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.MARKET_PRIVACY,
        label: 'Privacy Policy (Marketplace)',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.GALLERY_PRIVACY,
        label: 'Privacy Policy (Gallery)',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.MARKET_TERMS,
        label: 'Terms and Conditions (Marketplace)',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.FAQ,
        label: 'Faq',
        image: PayoutIcon,
      },
      {
        path: paths.SETTINGS.TREATMENTS,
        label: 'Treatments',
        image: PayoutIcon,
      },
    ],
  },
  user: {
    'Manage listings': [
      {
        path: paths.SETTINGS.DASHBOARD,
        label: 'Dashboard',
        image: DashboardIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Your Listings',
      //   image: ListingIcon,
      //   disabled: true,
      // },
      // {
      //   path: paths.SETTING,
      //   label: 'Favorites',
      //   image: FavoriteIcon,
      //   disabled: true,
      // },
      // {
      //   path: paths.SETTING,
      //   label: 'Following',
      //   image: FollowingIcon,
      //   disabled: true,
      // },
      {
        path: paths.SETTING,
        label: 'Credit card purchases and Payouts',
        image: PayoutIcon,
        disabled: true,
      },
    ],
    'Profile settings': [
      {
        path: paths.SETTINGS.DEFAULT,
        label: 'Account details',
        image: AccountIcon,
      },
      {
        path: paths.SETTINGS.SECURITY,
        label: 'Security',
        image: SecurityIcon,
      },
      {
        path: paths.SETTINGS.APPS,
        label: 'Apps',
        image: AppIcon,
      },
      {
        path: paths.SETTINGS.NOTIFICATIONS,
        label: 'Notifications',
        image: NotificationIcon,
      },
      // {
      //   path: paths.SETTINGS.NOTIFICATIONS,
      //   label: 'Help center',
      //   image: HelpIcon,
      //   disabled: true,
      // },
    ],
  },
  gallery: {
    'Manage listings': [
      {
        path: paths.SETTINGS.DASHBOARD,
        label: 'Dashboard',
        image: DashboardIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Your Listings',
      //   image: ListingIcon,
      //   disabled: true,
      // },
      {
        path: paths.SETTINGS.EXHIBITIONS,
        label: 'Your Exhibitions',
        image: ExhibitionIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Favorites',
      //   image: FavoriteIcon,
      //   disabled: true,
      // },
      // {
      //   path: paths.SETTING,
      //   label: 'Following',
      //   image: FollowingIcon,
      //   disabled: true,
      // },
      {
        path: paths.SETTING,
        label: 'Credit card purchases and Payouts',
        image: PayoutIcon,
        disabled: true,
      },
    ],
    'Profile settings': [
      {
        path: paths.SETTINGS.DEFAULT,
        label: 'Account details',
        image: AccountIcon,
      },
      {
        path: paths.SETTINGS.SECURITY,
        label: 'Security',
        image: SecurityIcon,
      },
      {
        path: paths.SETTINGS.APPS,
        label: 'Apps',
        image: AppIcon,
      },
      {
        path: paths.SETTINGS.NOTIFICATIONS,
        label: 'Notifications',
        image: NotificationIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Help center',
      //   image: HelpIcon,
      //   disabled: true,
      // },
    ],
  },
  artist: {
    'Manage listings': [
      {
        path: paths.SETTINGS.DASHBOARD,
        label: 'Dashboard',
        image: DashboardIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Your Listings',
      //   image: ListingIcon,
      //   disabled: true,
      // },
      {
        path: paths.SETTINGS.EXHIBITIONS,
        label: 'Your Exhibitions',
        image: ExhibitionIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Favorites',
      //   image: FavoriteIcon,
      //   disabled: true,
      // },
      // {
      //   path: paths.SETTING,
      //   label: 'Following',
      //   image: FollowingIcon,
      //   disabled: true,
      // },
      {
        path: paths.SETTING,
        label: 'Credit card purchases and Payouts',
        image: PayoutIcon,
        disabled: true,
      },
    ],
    'Profile settings': [
      {
        path: paths.SETTINGS.DEFAULT,
        label: 'Account details',
        image: AccountIcon,
      },
      {
        path: paths.SETTINGS.SECURITY,
        label: 'Security',
        image: SecurityIcon,
      },
      {
        path: paths.SETTINGS.APPS,
        label: 'Apps',
        image: AppIcon,
      },
      {
        path: paths.SETTINGS.NOTIFICATIONS,
        label: 'Notifications',
        image: NotificationIcon,
      },
      // {
      //   path: paths.SETTING,
      //   label: 'Help center',
      //   image: HelpIcon,
      //   disabled: true,
      // },
    ],
  },
};

export default PATHS;
