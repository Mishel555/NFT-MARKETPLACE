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
    ],
  };
};

export const navLinks: { [key: string]: ILinkedTabs[] } = {
  admin: [
    {
      to: '/',
      label: 'Marketplace',
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/settings/myLibrary',
      label: 'Multisensory Editor',
    },
    {
      to: SECOND_URL || 'artinspacegallery.art',
      label: 'About art in space',
      external: true,
    },
  ],
  user: [
    {
      to: '/',
      label: 'Marketplace',
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: SECOND_URL || 'artinspacegallery.art',
      label: 'About art in space',
      external: true,
    },
  ],
  gallery: [
    {
      to: '/',
      label: 'Marketplace',
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: SECOND_URL || 'artinspacegallery.art',
      label: 'About art in space',
      external: true,
    },
  ],
  artist: [
    {
      to: '/',
      label: 'Marketplace',
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: '/multisensory',
      label: 'Multisensory Editor',
    },
    {
      to: SECOND_URL || 'artinspacegallery.art',
      label: 'About art in space',
      external: true,
    },
  ],
  guest: [
    {
      to: '/',
      label: 'Marketplace',
    },
    {
      to: '/market',
      label: 'Explore',
    },
    {
      to: SECOND_URL || 'artinspacegallery.art',
      label: 'About art in space',
      external: true,
    },
  ],
};
