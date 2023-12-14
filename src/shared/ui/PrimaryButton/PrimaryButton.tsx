import React from 'react';
import cn from 'classnames';
import classes from './PrimaryButton.module.scss';

type Props = {
  isActive?: boolean;
  defaultAction: () => void;
  activeAction?: () => void;
  defaultTitle: string;
  activeTitle?: string;
};

export const PrimaryButton: React.FC<Props> = ({
  isActive,
  defaultAction,
  activeAction,
  defaultTitle,
  activeTitle,
}) => {
  return (
    <button
      type="submit"
      className={cn(classes['base-button'], {
        [classes['base-class--active']]: isActive,
        [classes['base-button-hover']]: !isActive,
      })}
      onClick={isActive ? activeAction : defaultAction}
    >
      {isActive ? activeTitle : defaultTitle}
    </button>
  );
};
