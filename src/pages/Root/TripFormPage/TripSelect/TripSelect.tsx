import React from 'react';
import { TripSelectProp } from '../../../../types';
import setKey from '../../../../functions';

const TripSelect = ({ values, selectedVal, handleChange }: TripSelectProp) => {
  const options = [...new Array(values.length)]
    .map((item, idx) => <option key={setKey()}>{idx + 1}</option>);
  return (
    <select
      value={selectedVal}
      onChange={(Event) => handleChange(+Event.target.value)}
    >
      {options}
    </select>
  );
};

export default TripSelect;
