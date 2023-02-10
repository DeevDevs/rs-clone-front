import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import logo from '../../../assets/svg/logo.svg';
import gitLogo from '../../../assets/svg/gitLogo.svg';
import rsLogo from '../../../assets/svg/rsLogo.svg';
import { Links } from '../../../enums';

const Footer = () => (
  <footer className={styles.footer}>
    <img
      src={logo}
      alt="logo"
      className={styles.logo}
    />
    <div className={styles.info}>
      <Link to={Links.Rs}>
        <img
          src={rsLogo}
          alt="rsLogo"
          className={styles.rsEmblem}
        />
      </Link>
      <div className={styles.links}>
        <Link to={Links.Vnuchkov} className={styles.ghLink}>
          <img
            src={gitLogo}
            alt="gitLogo"
            className={styles.ghLink__img}
          />
          <span className={styles.ghLink__name}>Dmitriy Vnuchkov</span>
        </Link>
        <Link to={Links.Kazakov} className={styles.ghLink}>
          <img
            src={gitLogo}
            alt="gitLogo"
            className={styles.ghLink__img}
          />
          <span className={styles.ghLink__name}>Maksim Kazakov</span>
        </Link>
        <Link to={Links.Luferov} className={styles.ghLink}>
          <img
            src={gitLogo}
            alt="gitLogo"
            className={styles.ghLink__img}
          />
          <span className={styles.ghLink__name}>Dmitriy Luferov</span>
        </Link>
      </div>
      <span className={styles.year}>Created in 2023</span>
    </div>
  </footer>
);

export default Footer;
