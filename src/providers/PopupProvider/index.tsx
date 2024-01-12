import { ReactNode, useState, useMemo, useCallback } from 'react';
import { PopupContext } from '@contexts/PopupContext';

interface IPropTypes {
  children?: ReactNode;
}

const PopupProvider = ({ children }: IPropTypes) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [type, setType] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);

  const open = useCallback((type: string) => {
    setType(type);
    setIsOpened(true);
  }, []);

  const close = useCallback(() => {
    setType(null);
    setIsOpened(false);
    setData(null);
  }, []);

  const toggle = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const contextValue = useMemo(
    () => ({
      type,
      isOpened,
      data,
      open,
      close,
      toggle,
      setData: (data: unknown) => setData(data),
    }),
    [type, isOpened, data, open, close, toggle],
  );

  return (
    // Providing data to our app
    <PopupContext.Provider value={contextValue}>
      {children}
    </PopupContext.Provider>
  );
};


export default PopupProvider;
