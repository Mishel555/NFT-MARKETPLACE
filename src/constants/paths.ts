const ROOT = {
  HOME: '/',
  MARKETPLACE: '/market',
  PUBLIC_PROFILE: '/profile/:id/*',
  MULTISENSORY: '/multisensory',
  EDITOR: '/editor',
  COLLECTORS: '/collectors',
  MEMBERSHIP: '/memberships',
  SINGLE_MEMBERSHIP: '/membership/:id',
  GALLERIES: '/galleries',
  ARTISTS: '/artists',
  EXHIBITIONS: '/exhibitions',
  SINGLE_ART: '/art/:id',
  SINGLE_EXHIBITION: '/exhibition/:id',
  SETTING: '/settings/*',
  SIGN_IN: '/signIn',
  SIGN_UP: '/signUp/*',
  CONFIRM: '/confirm',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '/not-found-404',
  UNKNOWN: '*',
};

const SIGN_UPS = {
  DEFAULT: '/',
  ROLE: '/role',
  INFO: '/info',
  GALLERY: '/gallery',
};

const PROFILE = {
  DEFAULT: '',
  ARTS: 'arts',
  SHOW_ROOM: 'showroom',
  FAVORITES: 'favorites',
  MEMBERS: 'members',
  GALLERY: 'gallery',
  ART_SUBMISSION: 'artSubmission',
  ARTIST_REQUESTS: 'artistRequests',
  EXHIBITIONS: 'exhibitions',
  NFT_OF_MEMBERS: 'nftOfMembers',
  COLLABORATION: 'collaboration',
};

const SETTINGS = {
  DEFAULT: '',
  APPROVALS: 'approvals',
  DASHBOARD: 'dashboard',
  MY_ARTS: 'myArts',
  MY_LIBRARY: 'myLibrary',
  EXHIBITIONS: 'exhibitions',
  SECURITY: 'security',
  APPS: 'apps',
  ART_ROOMS: 'artRooms',
  GALLERY_TERMS: 'galleryTerms',
  GALLERY_PRIVACY: 'galleryPrivacy',
  MARKET_TERMS: 'marketTerms',
  MARKET_PRIVACY: 'marketPrivacy',
  FAQ: 'faq',
  TREATMENTS: 'treatments',
  BANNERS: 'banners',
  NOTIFICATIONS: 'notifications',
};

export default {
  ...ROOT,
  SIGN_UPS,
  PROFILE,
  SETTINGS,
};
