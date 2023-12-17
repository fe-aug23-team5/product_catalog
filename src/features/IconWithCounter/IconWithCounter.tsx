import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './IconWithCounter.module.scss';

type Props = {
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count: number;
  onClick?: () => void;
};

export const IconWithCounter: React.FC<Props> = ({
  to, icon, count, onClick,
}) => {
  const IconComponent = icon;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        styles.icon__item, { [styles.icon__item_active]: isActive },
      )}
      onClick={onClick}
    >
      <IconComponent />
      {count > 0 && (
        <div className={styles.icon__counter_box}>
          <div className={styles.icon__number}>{count}</div>
        </div>
      )}
    </NavLink>
  );
};
