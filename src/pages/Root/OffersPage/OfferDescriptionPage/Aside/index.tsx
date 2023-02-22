import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import SvgAndText from '../../../../../components/SvgAndTextComponent';
import StatisticItem from '../../../../../components/StatisticItem';
import { StatisticsItemsText } from '../../../../../enums';
import goBackImg from '../../../../../assets/svg/backButton.svg';
import descriptionAsideStore from '../../../../../data/DescriptionAsideStore';
import { SingleOfferOnPageInterface } from '../../../../../interfaces';
import keyGenerator from '../../../../../functions';

const Aside = ({ data }: { data: SingleOfferOnPageInterface | null | undefined }) => {
  const navigate = useNavigate();
  return (
    <aside className={styles.aside}>
      <div className={styles.map}>map</div>
      {descriptionAsideStore.map(({ img, text }) => (
        <SvgAndText
          img={img}
          header={`${text[0].toUpperCase()}${text.slice(1, text.length)}`}
          text={data![text]}
          key={keyGenerator(text)}
        />
      ))}
      <StatisticItem
        mark={data!.rating}
        maximum={10}
        text={StatisticsItemsText.Rating}
        size="medium"
      />
      <button
        className={styles.button}
        onClick={() => navigate(-1)}
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
