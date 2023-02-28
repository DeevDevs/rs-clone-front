import React from 'react';
import { Link } from 'react-router-dom';
import { OfferInterface } from '../../../../interfaces';
import styles from './style.module.scss';
import { OffersImgAlts } from '../../../../enums';
import plane from '../../../../assets/svg/plane.svg';
import RatingComp from '../../../../components/RatingComponent';

const Offer = ({
  header, info, images, rating, id,
}: OfferInterface) => (
  <div className={styles.container}>
    <img
      src={images[0]}
      alt={OffersImgAlts.MainImg}
      className={styles.mainImg}
    />
    <div className={styles.content}>
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.text}>{`${info.slice(0, 250)}...`}</p>
      <Link
        to={`${id}`}
        className={styles.button}
      >
        Read more
      </Link>
      <img
        src={plane}
        alt={OffersImgAlts.Plane}
        className={styles.plane}
      />
    </div>
    <RatingComp rating={rating} />
  </div>
);

export default Offer;
