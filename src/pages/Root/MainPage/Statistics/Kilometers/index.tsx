import React from 'react';
import { VictoryBar } from 'victory';
import styles from './style.module.scss';
import { KilometersInterface } from '../../../../../interfaces';

const Kilometers = ({ distance }: KilometersInterface) => (
  <div className={styles.container}>
    <span className={styles.number}>
      {distance}
    </span>
    <svg
      viewBox="1280 -100 400 400"
      width="100%"
      height="50px"
      overflow="visible"
    >
      <VictoryBar
        standalone={false}
        data={[
          { x: 2, y: (distance / 10000) * 100, fill: '#8860d0' },
          { x: 1, y: 100, fill: 'transparent' },
        ]}
        style={{ data: { fill: ({ datum }) => datum.fill } }}
        alignment="middle"
        barWidth={150}
        width={3000}
        height={400}
        horizontal
      />
      <rect
        width={2950}
        height={150}
        stroke="#8860d0"
        strokeWidth={50}
        fill="transparent"
        x={25}
        y={-10}
      />
    </svg>
    <p className={styles.text}>Kilometers covered</p>
  </div>
);

export default Kilometers;
