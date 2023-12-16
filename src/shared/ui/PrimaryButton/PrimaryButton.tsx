import React, { CSSProperties } from 'react';
import cn from 'classnames';
import classes from './PrimaryButton.module.scss';

type Props = {
  isActive?: boolean;
  defaultAction: () => void;
  activeAction?: () => void;
  defaultTitle: string;
  activeTitle?: string;
  additionalStyles?: CSSProperties;
};

export const PrimaryButton: React.FC<Props> = ({
  isActive,
  defaultAction,
  activeAction,
  defaultTitle,
  activeTitle,
  additionalStyles,
}) => {
  return (
    <button
      type="submit"
      className={cn(classes['base-button'], {
        [classes['base-class--active']]: isActive,
        [classes['base-button-hover']]: !isActive,
      })}
      onClick={isActive ? activeAction : defaultAction}
      style={additionalStyles}
    >
      {isActive ? activeTitle : defaultTitle}
    </button>
  );
};
