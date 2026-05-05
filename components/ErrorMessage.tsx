import { FC, PropsWithChildren } from 'react';

const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-sm text-red-600">{children}</p>;
};

export default ErrorMessage;
