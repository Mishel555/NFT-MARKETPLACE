import { ILinkedTabs } from '@constants/types';
import { SECOND_URL } from '@constants/environment';

export const profileMenu = (userId: string): { [key: string]: ILinkedTabs[] } => {
  const profileBase = `/profile/${userId}`;

  return {
    admin: [
      {
        to: '/settings/myLibrary',
        label: 'My Library',
      },
      {
        to: '/settings/dashboard',
        label: 'Dashboard',
      },
      {
        to: '/settings/',
        label: 'Settings',
      },
      {
        to: '/settings/approvals',
        label: 'Registration requests',
      },
    ],
    user: [
      {
        to: profileBase,
        label: 'Profile',
      },
      {
        to: `${profileBase}/arts`,
        label: 'My arts',
      },
      {
        to: `${profileBase}/favorites`,
        label: 'Favorites',
      },
      {
        to: '/settings/dashboard',
        label: 'Dashboard',
      },
      {
        to: '/settings/',
        label: 'Settings',
      },
    ],
    gallery: [
      {
        to: profileBase,
        label: 'Profile',
      },
      {
        to: `${profileBase}/members`,
        label: 'My members',
      },
      {
        to: `${profileBase}/artistRequests`,
        label: 'Artist Requests',
      },
      {
        to: `${profileBase}/showroom`,
        label: 'My Gallery',
      },
      {
        to: `${profileBase}/favorites`,
        label: 'Favorites',
      },
      {
        to: '/settings/dashboard',
        label: 'Dashboard',
      },
      {
        to: '/settings/',
        label: 'Settings',
      },
    ],
    artist: [
      {
        to: profileBase,
        label: 'Profile',
      },
      {
        to: `${profileBase}/gallery`,
        label: 'Gallery',
      },
      {
        to: `${profileBase}/favorites`,
        label: 'Favorites',
      },
      {
        to: '/settings/dashboard',
        label: 'Dashboard',
      },
      {
        to: '/settings/',
        label: 'Settings',
      },
    ],
  };
};

export const navLinks: { [key: string]: ILinkedTabs[] } = {
  admin: [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: SECOND_URL || '/',
      label: 'About',
      external: true,
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/memberships',
      label: 'Membership',
    },
    {
      to: '/settings/myLibrary',
      label: 'Mint new Experience',
    },
    {
      to: '/exhibitions',
      label: 'exhibitions',
    },
  ],
  user: [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: SECOND_URL || '/',
      label: 'About',
      external: true,
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/memberships',
      label: 'Membership',
    },
    {
      to: '/exhibitions',
      label: 'exhibitions',
    },
  ],
  gallery: [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: SECOND_URL || '/',
      label: 'About',
      external: true,
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/memberships',
      label: 'Membership',
    },
    {
      to: '/exhibitions',
      label: 'exhibitions',
    },
  ],
  artist: [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: SECOND_URL || '/',
      label: 'About',
      external: true,
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/memberships',
      label: 'Membership',
    },
    {
      to: '/multisensory',
      label: 'Mint new Experience',
    },
    {
      to: '/exhibitions',
      label: 'exhibitions',
    },
  ],
  guest: [
    {
      to: '/',
      label: 'Home',
    },
    {
      to: SECOND_URL || '/',
      label: 'About',
      external: true,
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/memberships',
      label: 'Membership',
    },
    {
      to: '/exhibitions',
      label: 'exhibitions',
    },
  ],
};
