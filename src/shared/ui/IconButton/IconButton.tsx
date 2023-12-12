import React, { useState } from 'react';
import cn from 'classnames';
import classes from './IconButton.module.scss';
import favorite from '../../../img/icons/Favourites (Heart Like).svg';
import favoriteAct from '../../../img/icons/Favorites (Heart LIke Active).svg';

export const IconButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      type="submit"
      className={cn(classes['base-button'], {
        [classes['base-class--active']]: isActive,
        [classes['base-button-hover']]: !isActive,
      })}
      onClick={handleButtonClick}
    >
      <img src={isActive ? favoriteAct : favorite} alt="Favorite Icon" />
    </button>
  );
};
