import { FC } from "react";

type Props = {
  section: boolean;
};

export const Container: FC<Props> = ({ section: isSection = false }) => {
  const Content = isSection ? "section" : "div";

  return <Content className="" />;
};
