import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import SvgAndText from '../../../../../components/SvgAndTextComponent';
import StatisticItem from '../../../../../components/StatisticItem';
import { PagePath, StatisticsItemsText } from '../../../../../enums';
import goBackImg from '../../../../../assets/svg/backButton.svg';
import descriptionAsideStore from '../../../../../data/DescriptionAsideStore';
import { SingleOfferOnPageInterface } from '../../../../../interfaces';
import keyGenerator from '../../../../../functions';
import OfferMap from '../OfferMap/OfferMap';

const Aside = ({ data }: { data: SingleOfferOnPageInterface | null | undefined }) => {
  const navigate = useNavigate();
  const tourLocations = data?.locations as [number, number][];
  return (
    <aside className={styles.aside}>
      <div className={styles.map}>
        {data?.locations && <OfferMap locations={tourLocations} /> }
      </div>
      {descriptionAsideStore.map(({ img, text }) => (
        <SvgAndText
          img={img}
          header={`${text[0].toUpperCase()}${text.slice(1, text.length)}`}
          text={data ? data[text] : 'info-missing'}
          key={keyGenerator(text)}
        />
      ))}
      <StatisticItem
        mark={data ? data.rating : 10}
        maximum={10}
        text={StatisticsItemsText.Rating}
        size="medium"
      />
      <button
        className={styles.button}
        onClick={() => navigate(`/${PagePath.Offers}`)}
        type="button"
      >
        <SvgAndText
          img={goBackImg}
          header="Go back"
          text=""
        />
      </button>
    </aside>
  );
};

export default Aside;
