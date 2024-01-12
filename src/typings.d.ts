declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;
  export = classNames;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.webp';
declare module '*.svg';
declare module '*.gif';
declare module '*.mp4';

interface Window {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  ethereum: any;
}
