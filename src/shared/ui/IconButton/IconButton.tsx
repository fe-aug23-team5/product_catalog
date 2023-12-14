import React from 'react';
import cn from 'classnames';
import classes from './IconButton.module.scss';
import favorite from '../../../img/icons/Favourites (Heart Like).svg';
import favoriteAct from '../../../img/icons/Favorites (Heart LIke Active).svg';

type Props = {
  isActive: boolean;
  defaultAction: () => void;
  activeAction: () => void;
};

export const IconButton: React.FC<Props> = ({
  isActive,
  defaultAction,
  activeAction,
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
      <img src={isActive ? favoriteAct : favorite} alt="Favorite Icon" />
    </button>
  );
};
