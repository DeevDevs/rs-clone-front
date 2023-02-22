import React from 'react';
import styles from './style.module.scss';

const SvgAndText = ({ img, header, text }: { img: string, header: string, text: string }) => (
  <div className={styles.container}>
    <img
      src={img}
      alt={header}
      className={styles.svg}
    />
    <div className={styles.textContainer}>
      <span className={styles.header}>
        {header}
      </span>
      {text ? (
        <>
          <span className={styles.header}>:&nbsp;</span>
          <span className={styles.text}>{text}</span>
        </>
      ) : null}
    </div>
  </div>
);

export default SvgAndText;
