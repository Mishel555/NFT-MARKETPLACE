import { Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { ETemplates } from '@constants/types/enums';
import { IRoute, IUser } from './types';
import PATHS from './paths';

interface IRoutes {
  public: { [key: string]: IRoute[] };
  private: { [key: string]: IRoute[] };
}

// Root Pages
const SignIn = loadable(() => import('@components/pages/public/Auth/SignIn'));
const SignUp = loadable(() => import('@components/pages/public/Auth/SignUp'));
const Confirm = loadable(() => import('@components/pages/public/Auth/Confirm'));

const Home = loadable(() => import('@components/pages/public/Home'));
const MarketPlace = loadable(() => import('@components/pages/public/Marketplace'));
const MultisensoryEditor = loadable(() => import('@components/pages/private/MultisensoryEditor'));
const Editor = loadable(() => import('@components/pages/private/Editor'));
const ProfilePage = loadable(() => import('@components/pages/Profile'));
const Privacy = loadable(() => import('@components/pages/public/Privacy'));
const Faq = loadable(() => import('@components/pages/public/Faq'));
const Terms = loadable(() => import('@components/pages/public/Terms'));
const Collectors = loadable(() => import('@components/pages/public/Collectors'));
const Membership = loadable(() => import('@components/pages/public/Members'));
const Galleries = loadable(() => import('@components/pages/public/Galleries'));
const Artists = loadable(() => import('@components/pages/public/Artists'));
const Exhibitions = loadable(() => import('@components/pages/public/Exhibitions'));
const SingleArt = loadable(() => import('@components/pages/public/SingleArt'));
const SingleExhibition = loadable(() => import('@components/pages/public/SingleExhibition'));
const SingleMembership = loadable(() => import('@components/pages/public/SingleMembership'));
const SettingsRouter = loadable(() => import('@routes/routers/SettingsRouter'));
const NotFound = loadable(() => import('@components/pages/public/NotFound'));

// Profile Pages
const Arts = loadable(() => import('@components/pages/Profile/Arts'));
const Favorites = loadable(() => import('@components/pages/Profile/Favorites'));
const Members = loadable(() => import('@components/pages/Profile/Members'));
const Requests = loadable(() => import('@components/pages/Profile/Requests'));
const Submission = loadable(() => import('@components/pages/Profile/Submissions'));
const Profile = loadable(() => import('@components/pages/Profile/Profile'));
const ProfileExhibitions = loadable(() => import('@components/pages/Profile/Exhibitions'));
const Collaboration = loadable(() => import('@components/pages/Profile/Collaboration'));

// Settings Pages
const AccountDetails = loadable(() => import('@components/pages/private/Settings/AccountDetails'));
const Approvals = loadable(() => import('@components/pages/private/Settings/Approvals'));
const Dashboard = loadable(() => import('@components/pages/private/Settings/Dashboard'));
const MyLibrary = loadable(() => import('@components/pages/private/Settings/MyLibrary'));
const MyArts = loadable(() => import('@components/pages/private/Settings/MyArts'));
const Security = loadable(() => import('@components/pages/private/Settings/Security'));
const Apps = loadable(() => import('@components/pages/private/Settings/Apps'));
const ArtRooms = loadable(() => import('@components/pages/private/Settings/ArtRooms'));
const GalleryTermsSettings = loadable(() => import('@components/pages/private/Settings/GalleryTerms'));
const GalleryPrivacySettings = loadable(() => import('@components/pages/private/Settings/GalleryPrivacy'));
const MarketPrivacySettings = loadable(() => import('@components/pages/private/Settings/MarketPrivacy'));
const MarketTermsSettings = loadable(() => import('@components/pages/private/Settings/MarketTerms'));
const FaqSettings = loadable(() => import('@components/pages/private/Settings/Faq'));
const Treatments = loadable(() => import('@components/pages/private/Settings/Treatments'));
const Banners = loadable(() => import('@components/pages/private/Settings/Banners'));
const ExhibitionsSetting = loadable(() => import('@components/pages/private/Settings/Exhibitions'));
const Notifications = loadable(() => import('@components/pages/private/Settings/Notifications'));
// const Listings = loadable(() => import('@components/pages/private/Settings/Listings'));
// const SettingsFavorites = loadable(() => import('@components/pages/private/Settings/Favorites'));
// const Following = loadable(() => import('@components/pages/private/Settings/Following'));
// const Payouts = loadable(() => import('@components/pages/private/Settings/Payouts'));
// const Help = loadable(() => import('@components/pages/private/Settings/Help'));

export const RootRoutes: IRoute[] = [
  {
    path: PATHS.HOME,
    element: <Home />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.MARKETPLACE,
    element: <MarketPlace />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.MEMBERSHIP,
    element: <Membership />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.COLLECTORS,
    element: <Collectors />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.GALLERIES,
    element: <Galleries />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.ARTISTS,
    element: <Artists />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.EXHIBITIONS,
    element: <Exhibitions />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.SINGLE_ART,
    element: <SingleArt />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.SINGLE_MEMBERSHIP,
    element: <SingleMembership />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.SINGLE_EXHIBITION,
    element: <SingleExhibition />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.PUBLIC_PROFILE,
    element: <ProfilePage />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.MULTISENSORY,
    element: <MultisensoryEditor />,
    mode: 'private',
    roles: ['artist', 'admin'],
    template: ETemplates.Blank,
  },
  {
    path: PATHS.EDITOR,
    element: <Editor />,
    mode: 'private',
    roles: ['artist', 'admin'],
    template: ETemplates.Editor,
  },
  {
    path: PATHS.SETTING,
    element: <SettingsRouter />,
    mode: 'private',
    template: ETemplates.Settings,
  },
  {
    path: PATHS.SIGN_IN,
    element: <SignIn />,
    template: ETemplates.Auth,
    mode: 'guest',
  },
  {
    path: PATHS.SIGN_UP,
    element: <SignUp />,
    template: ETemplates.Auth,
    mode: 'guest',
  },
  {
    path: PATHS.CONFIRM,
    element: <Confirm />,
    template: ETemplates.Auth,
    mode: 'private',
  },
  {
    path: PATHS.FAQ,
    element: <Faq />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.PRIVACY,
    element: <Privacy />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.TERMS,
    element: <Terms />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.NOT_FOUND,
    element: <NotFound />,
    template: ETemplates.Main,
  },
  {
    path: PATHS.UNKNOWN,
    element: <NotFound />,
    template: ETemplates.Main,
  },
];

export const ProfileRoutes = (user: IUser): IRoutes => ({
  public: {
    admin: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Profile user={user} isPublic />,
        title: 'Profile',
        tabTitle: 'Profile',
      },
      {
        path: PATHS.PROFILE.ARTS,
        element: <Arts user={user} />,
        title: 'Arts',
        tabTitle: 'Admin arts',
      },
    ],
    user: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Arts user={user} />,
        title: 'Arts',
        tabTitle: 'collector arts',
      },
    ],
    gallery: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Profile user={user} isPublic />,
        title: 'Profile',
        tabTitle: 'Profile',
      },
      {
        path: PATHS.PROFILE.MEMBERS,
        element: <Members user={user} isPublic />,
        title: 'Members',
        tabTitle: 'gallery members',
      },
      {
        path: PATHS.PROFILE.EXHIBITIONS,
        element: <ProfileExhibitions user={user} />,
        tabTitle: 'Exhibitions',
      },
      {
        path: PATHS.PROFILE.SHOW_ROOM,
        element: <Arts user={user} />,
        title: 'showroom',
        tabTitle: 'My Gallery',
      },
      {
        path: PATHS.PROFILE.FAVORITES,
        element: <Favorites user={user} />,
        title: 'Favorites',
        tabTitle: 'favorites',
      },
      // {
      //   path: PATHS.PROFILE.NFT_OF_MEMBERS,
      //   element: <Arts user={user} nftOfMembers />,
      //   title: 'NFT\'S of Members',
      //   tabTitle: 'NFT\'S of Members',
      // },
    ],
    artist: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Profile user={user} isPublic />,
        title: 'Profile',
        tabTitle: 'Profile',
      },
      {
        path: PATHS.PROFILE.EXHIBITIONS,
        element: <ProfileExhibitions user={user} />,
        tabTitle: 'Exhibitions',
      },
      {
        path: PATHS.PROFILE.GALLERY,
        element: <Arts user={user} />,
        title: 'Gallery',
        tabTitle: 'gallery',
      },
      {
        path: PATHS.PROFILE.FAVORITES,
        element: <Favorites user={user} />,
        title: 'Favorites',
        tabTitle: 'favorites',
      },
    ],
  },
  private: {
    admin: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Navigate to={`/settings/${PATHS.SETTINGS.DEFAULT}`} replace />,
        mode: 'private',
      },
    ],
    user: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Profile user={user} />,
        title: 'My Profile',
        tabTitle: 'profile',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.ARTS,
        element: <Arts user={user} />,
        title: 'PURCHASED ART',
        tabTitle: 'my arts',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.FAVORITES,
        element: <Favorites user={user} />,
        title: 'My Favorites',
        tabTitle: 'favorites',
        mode: 'private',
      },
    ],
    gallery: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Profile user={user} />,
        title: 'Profile',
        // tabTitle: 'profile',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.MEMBERS,
        element: <Members user={user} />,
        title: 'Members',
        tabTitle: 'members',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.EXHIBITIONS,
        element: <ProfileExhibitions user={user} isPrivate />,
        // tabTitle: 'Exhibitions',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.SHOW_ROOM,
        element: <Arts user={user} />,
        title: 'showroom',
        tabTitle: 'My Gallery',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.FAVORITES,
        element: <Favorites user={user} />,
        title: 'favorites',
        // tabTitle: 'favorites',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.ART_SUBMISSION,
        element: <Submission user={user} />,
        title: 'art Submission',
        tabTitle: 'Art Submission',
        counter: user.artSubmissions,
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.ARTIST_REQUESTS,
        element: <Requests user={user} />,
        title: 'artistRequests',
        tabTitle: 'Artist Requests',
        counter: user.artistRequests,
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.NFT_OF_MEMBERS,
        element: <Arts user={user} nftOfMembers />,
        title: 'NFT\'S of Members',
        // tabTitle: 'NFT\'S of Members',
      },
    ],
    artist: [
      {
        path: PATHS.PROFILE.DEFAULT,
        element: <Profile user={user} />,
        title: 'My Profile',
        tabTitle: 'profile',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.EXHIBITIONS,
        element: <ProfileExhibitions user={user} isPrivate />,
        tabTitle: 'Exhibitions',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.GALLERY,
        element: <Arts user={user} />,
        title: 'gallery',
        tabTitle: 'gallery',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.COLLABORATION,
        element: <Collaboration user={user} />,
        title: 'collaboration',
        tabTitle: 'collaboration',
        mode: 'private',
      },
      {
        path: PATHS.PROFILE.FAVORITES,
        element: <Favorites user={user} />,
        title: 'My Favorites',
        tabTitle: 'favorites',
        mode: 'private',
      },
    ],
  },
});

export const SettingsRoutes = (user: IUser): IRoute[] => ([
  // {
  //   path: 'listings',
  //   element: <Listings />,
  // },
  // {
  //   path: 'favorites',
  //   element: <SettingsFavorites />,
  // },
  // {
  //   path: 'following',
  //   element: <Following />,
  // },
  // {
  //   path: 'payouts',
  //   element: <Payouts />,
  // },
  {
    path: PATHS.SETTINGS.DEFAULT,
    element: <AccountDetails user={user} />,
    title: 'Account Details',
    mode: 'private',
  },
  {
    path: PATHS.SETTINGS.DASHBOARD,
    element: <Dashboard user={user} />,
    title: 'Dashboard',
    mode: 'private',
  },
  {
    path: PATHS.SETTINGS.APPROVALS,
    element: <Approvals user={user} />,
    title: 'User requests',
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.EXHIBITIONS,
    element: <ExhibitionsSetting user={user} />,
    title: 'Your Exhibitions',
    mode: 'private',
    roles: ['admin', 'artist', 'gallery'],
  },
  {
    path: PATHS.SETTINGS.MY_LIBRARY,
    element: <MyLibrary />,
    mode: 'private',
    roles: ['admin', 'artist'],
  },
  {
    path: PATHS.SETTINGS.MY_ARTS,
    element: <MyArts user={user} />,
    mode: 'private',
  },
  {
    path: PATHS.SETTINGS.SECURITY,
    element: <Security user={user} />,
    mode: 'private',
  },
  {
    path: PATHS.SETTINGS.APPS,
    element: <Apps user={user} />,
    mode: 'private',
  },
  {
    path: PATHS.SETTINGS.BANNERS,
    element: <Banners />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.ART_ROOMS,
    element: <ArtRooms />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.GALLERY_TERMS,
    element: <GalleryTermsSettings />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.MARKET_PRIVACY,
    element: <MarketPrivacySettings />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.GALLERY_PRIVACY,
    element: <GalleryPrivacySettings />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.MARKET_TERMS,
    element: <MarketTermsSettings />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.FAQ,
    element: <FaqSettings />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.TREATMENTS,
    element: <Treatments />,
    mode: 'private',
    roles: ['admin'],
  },
  {
    path: PATHS.SETTINGS.NOTIFICATIONS,
    element: <Notifications user={user} />,
    mode: 'private',
    title: 'Notifications',
  },
  // {
  //   path: 'help',
  //   element: <Help />,
  // },
]);
