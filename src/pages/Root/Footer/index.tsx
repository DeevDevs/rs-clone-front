import React, { useState } from 'react';
import styles from './style.module.scss';
import FooterLink from './FooterLink';
import FooterStore from '../../../data/FooterLinksStore';

const Footer = () => {
  const [state] = useState(FooterStore);
  return (
    <footer className={styles.footer}>
      <img
        src={state.logo.src}
        alt={state.logo.alt}
        className={styles.logo}
      />
      <div className={styles.info}>
        <FooterLink
          to={state.rsLink.to}
          imgSrc={state.rsLink.imgSrc}
          imgAlt={state.rsLink.imgAlt}
          imgClassName={styles.rsEmblem}
        />
        <div className={styles.links}>
          {state.gitLinks.map(({
            to, imgSrc, imgAlt, spanText, key,
          }) => (
            <FooterLink
              to={to}
              imgSrc={imgSrc}
              imgAlt={imgAlt}
              imgClassName={styles.ghLink__img}
              linkClassName={styles.ghLink}
              spanText={spanText}
              key={key}
            />
          ))}
        </div>
        <span className={styles.year}>Created in 2023</span>
      </div>
    </footer>
  );
};
export default Footer;
