import { cn } from '@/lib/utils';
import { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  section?: boolean;
} & HtmlHTMLAttributes<HTMLDivElement>;

export const Container: FC<PropsWithChildren<Props>> = ({
  section: isSection = false,
  className,
  children,
  ...rest
}) => {
  const Content = isSection ? 'section' : 'div';

  return (
    <Content
      className={cn('mx-auto box-content max-w-5xl px-4', className)}
      {...rest}
    >
      {children}
    </Content>
  );
};
