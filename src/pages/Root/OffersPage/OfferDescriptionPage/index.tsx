import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOfferById } from '../../../../functions';
import { PagePath } from '../../../../enums';
import styles from './style.module.scss';
import Aside from './Aside';
import Article from './Article';

const OfferDescriptionPage = () => {
  const { offerId } = useParams();
  const [data] = useState(getOfferById(offerId));
  const navigate = useNavigate();
  useEffect(() => {
    if (!data) {
      navigate(PagePath.ErrorRedirect);
    }
  });
  return (
    <main className={styles.main}>
      <h2
        className={styles.header}
        style={{
          backgroundImage: `url(${(data ? data.mainImg : null)})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {data ? data.header : null}
      </h2>
      <Aside data={data} />
      <Article data={data} />
    </main>
  );
};

export default OfferDescriptionPage;
