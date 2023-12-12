import React, { useState } from 'react';
import cn from 'classnames';
import classes from './PrimaryButton.module.scss';

export const PrimaryButton: React.FC = () => {
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
      Add to cart
    </button>
  );
};
