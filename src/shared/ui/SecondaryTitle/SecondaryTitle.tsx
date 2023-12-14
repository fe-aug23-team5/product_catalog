import React from 'react';
import './SecondaryTitle.scss';

type Props = {
  children: string;
};

export const SecondaryTitle: React.FC<Props> = ({
  children,
}) => {
  return (
    <h2 className="secondary_title">
      {children}
    </h2>
  );
};
