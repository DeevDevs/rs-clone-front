import React from 'react';
import setKey from '../../../../functions';
import { TripSitesProp } from '../../../../types';
import style from './TripSitesBox.module.scss';

const TripSitesBox = ({ sites, handleDelete } : TripSitesProp) => {
  const removeElem = (e: React.MouseEvent) => {
    const newSites = sites.filter(
      (site) => site !== (e.target as HTMLDivElement).parentElement?.innerText.slice(0, -2),
    );
    handleDelete(newSites);
  };
  return (
    <div className={style.sightBox}>
      {sites.map((site) => (
        <div key={setKey()}>
          {site}
          <button type="button" onClick={(e) => removeElem(e)}>&times;</button>
        </div>
      ))}
    </div>
  );
};

export default TripSitesBox;
