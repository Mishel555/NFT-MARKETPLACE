import { useCallback, useRef } from 'react';

import ProfileCoverImg from '@assets/images/profile-back-img.png';
import ProfileImg from '@assets/images/profile-img.png';
import DefaultEvent from '@assets/images/exhibition.png';

interface IProps {
  src?: string;
  fallback: string | 'defaultAvatar' | 'defaultBanner' | 'defaultEvent';
  className?: string;
}

const ImageWithFallback = ({
  src,
  fallback,
  className,
}: IProps) => {
  const ref = useRef<HTMLImageElement | null>(null);

  const onError = useCallback(() => {
    if (ref.current) {
      switch (fallback) {
        case 'defaultBanner': {
          ref.current.src = ProfileCoverImg;
          break;
        }

        case 'defaultAvatar': {
          ref.current.src = ProfileImg;
          break;
        }

        case 'defaultEvent': {
          ref.current.src = DefaultEvent;
          break;
        }

        default: {
          ref.current.src = fallback;
        }
      }
    }
  }, [fallback]);

  return (
    <img ref={ref} src={src ?? fallback} alt="image" onError={onError} className={className} />
  );
};

export default ImageWithFallback;
