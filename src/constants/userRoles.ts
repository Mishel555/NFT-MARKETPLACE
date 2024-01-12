interface IRoles {
  name: string;
  title: string;
  description: string;
}

export const USER_ROLES: IRoles[] = [
  {
    name: 'user',
    title: 'Collector',
    description: 'Sign up or log in. \n' +
      'View all your purchases, easily manage subscriptions, receive great special offers, and much more!',
  },
  {
    name: 'gallery',
    title: 'Gallery and Curator',
    description: 'Sign up or log in. \n' +
      'View all your purchases, easily manage subscriptions, receive great special offers, and much more!',
  },
  {
    name: 'artist',
    title: 'Artist',
    description: 'Sign up or log in. \n' +
      'View all your purchases, easily manage subscriptions, receive great special offers, and much more!',
  },
];
