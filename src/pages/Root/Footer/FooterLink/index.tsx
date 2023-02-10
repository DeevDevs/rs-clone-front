import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLinkInterface } from '../../../../interfaces';
import styles from './style.module.scss';

const FooterLink = ({
  to, imgSrc, imgAlt, imgClassName, linkClassName, spanText,
}: FooterLinkInterface) => (
  <Link
    to={to}
    className={linkClassName}
  >
    <img
      src={imgSrc}
      alt={imgAlt}
      className={imgClassName}
    />
    {spanText ? <span className={styles.ghLink__name}>{spanText}</span> : null}
  </Link>
);

export default FooterLink;
