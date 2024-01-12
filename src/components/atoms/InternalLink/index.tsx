import { forwardRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  to: string;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const InternalLink = forwardRef<HTMLAnchorElement, IProps>(({
  to,
  children,
  onClick,
  className,
}, forwardedRef) => (
  <Link ref={forwardedRef} to={to} onClick={onClick} className={className}>
    {children}
  </Link>
));

export default InternalLink;
