import React, { useState, useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MapComponent from '../../../../components/MapComponent';
import StatisticItem from '../../../../components/StatisticItem';
import { StatisticsItemsText, TripErrorMessages } from '../../../../enums';
import { getFile } from '../../../../functions';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { createNewMemoir } from '../../../../store/memoir/memoirThunks';
import { TNewMemoirReq } from '../../../../store/memoir/memoirTypes';
import {
  FileTransferObj, FormInputItems, MapProps, ValuesKey,
} from '../../../../types';
import Drag from '../DragZone';
import TripSelect from '../TripSelect/TripSelect';
import TripSitesBox from '../TripSitesBox';
import style from './TripForm.module.scss';

const initialFormValues = {
  memoir: '',
  destination: '',
  country: '',
  continent: '',
  sites: '',
};

const satisfaction = {
  maximum: 10,
  text: StatisticsItemsText.Satisfaction,
};

const initialSites: string[] = [];

const TripForm = () => {
  const initialPhotos: FileTransferObj[] = [];
  const [photos, setPhotos] = useState(initialPhotos);
  const [rateValue, setRateValue] = useState(5);
  const [sites, setSites] = useState(initialSites);

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm<FormInputItems>({ mode: 'all' });

  const dispatchApp = useAppDispatch();
  const { id } = useAppSelector((state) => state.userReducer);
  const {
    clickLong, clickLat, country, place,
  } = useAppSelector((state) => state.mapboxReducer);

  const tempNewMemoirData = {
    userID: id,
    tripName: 'Lonesome October',
    destinationName: 'Tashkent',
    longLat: [23.090029, 60.399203],
    countryName: 'Uzb',
    continentName: 'Asia',
    whereFromLongLat: [23.090029, 60.399203],
    distance: 239,
    description: 'Whatever is here',
    memoirPhotos: [],
    date: '2023-02-01T10:22:23.815Z',
    rateValue: 4,
    days: 7,
    sites: ['Palace', 'Market', 'Tower'],
  } as TNewMemoirReq;
  const callbackCreateMemoir = useCallback(async (memoirData: TNewMemoirReq) => {
    await dispatchApp(createNewMemoir(memoirData));
  }, []);

  const addFieldsFromForm = (formData:FormInputItems): void => {
    const dateTo = new Date(formData.dateTo);
    const dateFrom = new Date(formData.dateFrom);
    const diffHours = +new Date(+dateTo - +dateFrom) / 36e5;
    const duration = Math.floor(diffHours / 24);

    tempNewMemoirData.longLat = [clickLong, clickLat];
    tempNewMemoirData.tripName = formData.memoir;
    tempNewMemoirData.destinationName = formData.destination;
    tempNewMemoirData.countryName = formData.country;
    tempNewMemoirData.continentName = formData.continent;
    tempNewMemoirData.description = formData.description;
    tempNewMemoirData.date = formData.dateFrom;
    tempNewMemoirData.rateValue = rateValue;
    tempNewMemoirData.days = duration;
    tempNewMemoirData.sites = sites.length ? sites : getValues('sites').split(' ');
  };

  const onSubmit: SubmitHandler<FormInputItems> = (async (data) => {
    const filesFromDropZone = await Promise.allSettled(photos.map(getFile));
    const dt = new DataTransfer();
    filesFromDropZone.forEach((item) => {
      if (item.status === 'fulfilled') { dt.items.add(item.value); }
    });
    tempNewMemoirData.memoirPhotos = dt.files;
    addFieldsFromForm(data);
    callbackCreateMemoir(tempNewMemoirData);
    reset();
    setPhotos([]);
    setRateValue(5);
    setSites([]);
  });

  const handleSites = () => {
    const inputSite = getValues('sites');
    if (inputSite.trim() && !sites.includes(inputSite.trim())) {
      setSites([...sites, inputSite.trim()]);
    }
  };

  const inputs = Object
    .keys(initialFormValues)
    .map((key: ValuesKey | string) => {
      const {
        name, ref, onBlur, onChange,
      } = register(key as ValuesKey, {
        required: TripErrorMessages.Field,
      });

      return (
        <div key={key}>
          <label htmlFor={key}>
            {key}
            <input
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={`${key} name`}
            />
          </label>
          <div className={style.form_inputError}>
            {errors[name] && <span className={style.error}>{errors[name]?.message || 'Error!'}</span>}
          </div>
          {(key === 'sites') ? <button type="button" onClick={handleSites}>add</button> : ''}
        </div>
      );
    });

  const {
    name: nameArea, ref: refArea, onChange: onChangeArea, onBlur: onBlurArea,
  } = register('description', {
    required: TripErrorMessages.Field,
    maxLength: {
      value: 500,
      message: TripErrorMessages.FieldMaxLength,
    },
    minLength: {
      value: 50,
      message: TripErrorMessages.FieldMinLength,
    },
  });

  const { name: nameDateFrom, ref: refDateFrom, onChange: onChangeDateFrom } = register('dateFrom', {
    required: TripErrorMessages.StartDate,
  });
  const { name: nameDateTo, ref: refDateTo, onChange: onChangeDateTo } = register('dateTo', {
    required: TripErrorMessages.EndDate,
  });

  useEffect(() => {
    if (country) setValue('country', country);
    if (place) setValue('destination', place);
  }, []);

  const newMap: MapProps = {
    newLocation: [clickLong, clickLat],
    markerName: 'Trip here',
  };

  return (
    <form id="tripForm" className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form_leftSide}>
        {inputs}
        <TripSitesBox sites={sites} handleDelete={setSites} />
        <h2 className={style.form_mapTitle}>Show us where you arrived from</h2>
        <div className={style.map}>
          <MapComponent newMapInfo={newMap} />
        </div>
        <div className={style.form_date}>
          <div>
            <span>
              Trip duration
            </span>
            <div>
              <input type="date" name={nameDateFrom} ref={refDateFrom} onChange={onChangeDateFrom} />
              <div className={style.form_inputError}>
                {errors.dateFrom && <span className={style.error}>{errors.dateFrom?.message || 'Error!'}</span>}
              </div>
            </div>
            <div>
              <input type="date" name={nameDateTo} ref={refDateTo} onChange={onChangeDateTo} />
              <div className={style.form_inputError}>
                {errors.dateTo && <span className={style.error}>{errors.dateTo?.message || 'Error!'}</span>}
              </div>
            </div>
          </div>
        </div>
        <input className={style.form_submit} type="submit" value="Record this Memoir" />
      </div>
      <div className={style.form_rightSide}>
        <Drag photos={photos} setPhotos={setPhotos} />
        <div className={style.form_statistic}>
          <StatisticItem
            mark={rateValue}
            maximum={satisfaction.maximum}
            text={satisfaction.text}
          />
          <TripSelect
            values={[...new Array(10)].map((el, idx) => String(idx + 1))}
            handleChange={setRateValue}
            selectedVal={rateValue}
          />
        </div>
        <h2 className={style.form_mapTitle}>Describe your trip</h2>
        <textarea
          className={style.form_area}
          form="tripForm"
          name={nameArea}
          ref={refArea}
          onChange={onChangeArea}
          onBlur={onBlurArea}
        />
        <div className={style.form_inputError}>
          {errors.description && <span className={style.error}>{errors.description?.message || 'Error!'}</span>}
        </div>
      </div>
    </form>
  );
};

export default TripForm;
