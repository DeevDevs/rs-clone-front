import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import { PagePath } from '../../../enums';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.header__text}>Travel the world... travel the life!</h1>
    <div className={styles.links}>
      <NavLink
        to={PagePath.Root}
        className={({ isActive }) => (isActive ? styles.button_active : styles.button)}
      >
        Home
      </NavLink>
      <NavLink
        to={PagePath.Offers}
        className={({ isActive }) => (isActive ? styles.button_active : styles.button)}
      >
        Offers
      </NavLink>
      <NavLink
        to={PagePath.Profile}
        className={styles.user}
      >
        <span className={styles.user__name}>John John</span>
        <img
          className={styles.user__img}
          alt="user-img"
        />
      </NavLink>
    </div>
  </header>
);

export default Header;
