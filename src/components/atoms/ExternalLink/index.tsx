import { ReactNode } from 'react';

interface IPropTypes {
  to: string;
  children: ReactNode;
  className?: string;
  noBlank?: boolean;
}

const ExternalLink = ({
  to,
  className,
  children,
  noBlank,
}: IPropTypes) => (
  <a href={to?.startsWith('http') ? to : `//${to}`} target={noBlank ? '_self' : '_blank'} className={className}>
    {children}
  </a>
);

export default ExternalLink;
