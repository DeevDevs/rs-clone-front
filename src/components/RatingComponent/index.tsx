import React from 'react';
import styles from './style.module.scss';
import StatisticItem from '../StatisticItem';
import { StatisticsItemsText } from '../../enums';

const RatingComp = ({ rating }: { rating: number }) => (
  <div className={styles.container}>
    <span className={styles.text}>Rating:</span>
    <StatisticItem mark={rating} maximum={10} text={StatisticsItemsText.None} />
  </div>
);

export default RatingComp;
