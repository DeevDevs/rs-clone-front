import React from 'react';
import { StatisticsPlacesInterface } from '../../../../../interfaces';
import StatisticItem from '../../../../../components/StatisticItem';
import { StatisticsItemsKeys, StatisticsItemsText } from '../../../../../enums';
import styles from './style.module.scss';

const Marks = ({ places, satisfaction, sites }: StatisticsPlacesInterface) => {
  const info = [
    {
      mark: places,
      maximum: 10,
      text: StatisticsItemsText.Places,
      key: StatisticsItemsKeys.StatisticsItem1,
    },
    {
      mark: satisfaction,
      maximum: 10,
      text: StatisticsItemsText.Satisfaction,
      key: StatisticsItemsKeys.StatisticsItem2,
    },
    {
      mark: sites,
      maximum: 10,
      text: StatisticsItemsText.Sites,
      key: StatisticsItemsKeys.StatisticsItem3,
    },
  ];
  return (
    <div className={styles.container}>
      {info.map(({
        mark, maximum, text, key,
      }) => (
        <StatisticItem
          mark={mark}
          maximum={maximum}
          text={text}
          key={key}
        />
      ))}
    </div>
  );
};

export default Marks;
