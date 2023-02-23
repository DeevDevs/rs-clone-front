import React from 'react';
import styles from './style.module.scss';
import { SingleOfferOnPageInterface } from '../../../../../interfaces';
import OfferImagesSwiper from './Swiper';

const Article = ({ data }: { data: SingleOfferOnPageInterface | null | undefined }) => (
  <article className={styles.article}>
    <h3 className={styles.subHeader}>
      {data?.subHeader}
    </h3>
    <p className={styles.text}>
      {data?.info}
    </p>
    <h3 className={styles.gallery}>Gallery</h3>
    <OfferImagesSwiper images={data?.images} />
  </article>
);

export default Article;
