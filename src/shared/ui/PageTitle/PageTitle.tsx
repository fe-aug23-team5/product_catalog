import React from 'react';
import './PageTitle.scss';

type Props = {
  children: string;
};

export const PageTitle: React.FC<Props> = ({ children }) => {
  return <h1 className="title_primary">{children}</h1>;
};
