import React from 'react';
import { VictoryLabel, VictoryPie } from 'victory';
import { StatisticsItemInterface } from '../../interfaces';
import styles from './style.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StatisticItem = ({ text, maximum, mark }: StatisticsItemInterface) => (
  <div className={styles.container}>
    <svg
      viewBox="0 0 400 400"
      width="100px"
      height="100px"
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
        style={{ fontSize: 140, lineHeight: 140 }}
        text={mark}
      />
      <circle cx="200" cy="200" r="100" fill="none" stroke="#8860d0" strokeWidth={15} />
      <circle cx="200" cy="200" r="155" fill="none" stroke="#8860d0" strokeWidth={15} />
    </svg>
    <span className={styles.text}>
      {text}
    </span>
  </div>
);

export default StatisticItem;
