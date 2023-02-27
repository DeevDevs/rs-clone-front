import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory';
import { StatisticsItemInterface } from '../../interfaces';
import styles from './style.module.scss';

const StatisticItem = ({
  text, maximum, mark, size,
}: StatisticsItemInterface) => (
  <div className={text ? styles.container : `${styles.container} ${styles.zeroText}`}>
    <svg
      viewBox="0 0 400 400"
      width={size === 'medium' ? '22%' : '40%'}
      height={size === 'medium' ? '9vh' : '15vh'}
    >
      <VictoryPie
        standalone={false}
        width={400}
        height={400}
        data={[
          { y: mark },
          { y: maximum - mark },
        ]}
        innerRadius={100}
        labelRadius={100}
        colorScale={['#8860d0', 'transparent']}
        labels={() => null}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={200}
        y={200}
        style={{ fontSize: 120, lineHeight: 140 }}
        text={mark}
      />
      <circle cx="200" cy="200" r="100" fill="none" stroke="#8860d0" strokeWidth={6} />
      <circle cx="200" cy="200" r="155" fill="none" stroke="#8860d0" strokeWidth={6} />
    </svg>
    {text
      ? (
        <span className={styles.text}>
          {text}
        </span>
      )
      : null}

  </div>
);

export default StatisticItem;
