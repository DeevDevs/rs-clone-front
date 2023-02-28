import React from 'react';
import styles from './style.module.scss';
import { PlacesInterface } from '../../../../../interfaces';
import keyGenerator from '../../../../../functions';

const Places = ({ continents, countries }: PlacesInterface) => (
  <div className={styles.container}>
    <div className={styles.countries}>
      <p className={styles.text}>Countries where you left a footstep:</p>
      {countries
        .map((item) => item[0])
        .map((text) => (
          <span
            className={styles.name}
            key={keyGenerator(text)}
          >
            {text}
          </span>
        ))}
    </div>
    <div className={styles.continents}>
      <p className={styles.text}>Parts of the world you have been to:</p>
      {continents
        .map((item) => item[0])
        .map((text) => (
          <span
            className={styles.name}
            key={keyGenerator(text)}
          >
            {text}
          </span>
        ))}
    </div>
  </div>
);

export default Places;
