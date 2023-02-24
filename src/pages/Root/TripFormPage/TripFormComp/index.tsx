import React, { useState, useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../../../../components/MapComponent';
import StatisticItem from '../../../../components/StatisticItem';
import { TripErrorMessages } from '../../../../enums';
import {
  getFile, getDate, getGradeText, getTripDist,
} from '../../../../functions';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { mapboxActions } from '../../../../store/mapbox';
import { createNewMemoir, getMemoirPreviews } from '../../../../store/memoir/memoirThunks';
import { TMemoir, TNewMemoirReq } from '../../../../store/memoir/memoirTypes';
import { getStats } from '../../../../store/stats/statsThunks';
import {
  FileTransferObj, FormInputItems, MapProps, ValuesKey,
} from '../../../../types';
import Drag from '../DragZone';
import TripSelect from '../TripSelect/TripSelect';
import TripSitesBox from '../TripSitesBox';
import style from './TripForm.module.scss';

const initialFormValues = {
  memoir: 'tripName',
  destination: 'destinationName',
  country: 'countryName',
  continent: 'continentName',
  sites: 'sites',
};

const satisfaction = {
  maximum: 10,
  text: getGradeText(5),
};

const initialSites: string[] = [];

const TripForm = () => {
  const navigate = useNavigate();
  const initialPhotos: FileTransferObj[] = [];
  const [photos, setPhotos] = useState(initialPhotos);
  const [rateValue, setRateValue] = useState(5);
  const [sites, setSites] = useState(initialSites);
  const [clickLocation, setClickLocation] = useState([0, 0]);

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
  const { id, statsID } = useAppSelector((state) => state.userReducer);
  const { id: memoirId } = useAppSelector((state) => state.memoirReducer);
  const memoirObj = useAppSelector((state) => state.memoirReducer);
  const { clickTarget } = useAppSelector((state) => state.mapboxReducer);

  const {
    clickLong, clickLat, country, place, callPage,
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
  const callbackGetMemoirPreviews = useCallback(async () => {
    await dispatchApp(getMemoirPreviews());
  }, []);
  const callbackGetStats = useCallback(async (userStatsID: string) => {
    await dispatchApp(getStats(userStatsID));
  }, []);

  const cbCleanUpMapboxState = (): void => {
    dispatchApp(mapboxActions.cleanUpState());
  };

  const addFieldsFromForm = (formData:FormInputItems): void => {
    const dateTo = new Date(formData.dateTo);
    const dateFrom = new Date(formData.dateFrom);
    const diffHours = +new Date(+dateTo - +dateFrom) / 36e5;
    const duration = Math.floor(diffHours / 24);

    tempNewMemoirData.whereFromLongLat = clickLocation;
    tempNewMemoirData.distance = getTripDist(clickLocation, [clickLong, clickLat]);
    tempNewMemoirData.longLat = [clickLong, clickLat];
    tempNewMemoirData.tripName = formData.tripName;
    tempNewMemoirData.destinationName = formData.destinationName;
    tempNewMemoirData.countryName = formData.countryName;
    tempNewMemoirData.continentName = formData.continentName;
    tempNewMemoirData.description = formData.description;
    tempNewMemoirData.date = formData.dateFrom;
    tempNewMemoirData.rateValue = rateValue;
    tempNewMemoirData.days = duration;
    tempNewMemoirData.sites = sites.length ? sites : getValues('sites').split(' ');
  };

  const onSubmit: SubmitHandler<FormInputItems> = (async (data) => {
    const filesFromDropZone = await Promise.allSettled(photos.map(getFile));
    console.log(`ON SUBMIT longLat=${tempNewMemoirData.longLat} where=${tempNewMemoirData.whereFromLongLat}`);
    const dt = new DataTransfer();
    filesFromDropZone.forEach((item) => {
      if (item.status === 'fulfilled') { dt.items.add(item.value); }
    });
    tempNewMemoirData.memoirPhotos = dt.files;
    addFieldsFromForm(data);
    cbCleanUpMapboxState();
    await callbackCreateMemoir(tempNewMemoirData);
    await callbackGetStats(statsID);
    await callbackGetMemoirPreviews();
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
    .entries(initialFormValues)
    .map((el: [string, ValuesKey | string]) => {
      const [key, val] = el;
      const {
        name, ref, onBlur, onChange,
      } = register(val as ValuesKey, {
        required: TripErrorMessages.Field,
      });

      return (
        <div key={key}>
          <label htmlFor={val}>
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

  const newMap: MapProps = {
    pointTo: {
      baseLocation: callPage === 'main' ? [clickLong, clickLat] : [memoirObj.longLat[0], memoirObj.longLat[1]],
      popupName: `Go to ${callPage === 'main' ? place : memoirObj.destinationName}`,
    },
    pointFrom: {
      baseLocation: [memoirObj.whereFromLongLat[0], memoirObj.whereFromLongLat[1]],
      popupName: 'Journey started here',
    },
  };

  useEffect(() => {
    if (callPage === 'main') {
      setValue('countryName', country);
      setValue('destinationName', place);
    } else {
      setRateValue(memoirObj.rateValue);
      setValue('dateFrom', memoirObj.date.slice(0, 10));
      setValue('dateTo', getDate(memoirObj.date.slice(0, 10), memoirObj.days));
      Object
        .entries(initialFormValues)
        .forEach((el: [string, ValuesKey | string]) => {
          const [, val] = el;
          if (typeof val === 'string' && val !== 'sites') { setValue(val as ValuesKey, memoirObj[val as keyof TMemoir] as string); }
          if (typeof val === 'string' && val === 'sites') {
            setSites(memoirObj.sites);
            setValue(val as ValuesKey, memoirObj.sites[0]);
          }
        });
      setValue('countryName', memoirObj.countryName);
      setValue('destinationName', memoirObj.destinationName);
      setValue('description', memoirObj.description);
    }
  }, []);

  useEffect(() => {
    if (clickTarget === 'memoir' || clickTarget === '') {
      navigate(`${memoirId}`);
    }
  }, [memoirId]);

  return (
    <form id="tripForm" className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form_leftSide}>
        {inputs}
        <TripSitesBox sites={sites} handleDelete={setSites} />
        <h2 className={style.form_mapTitle}>Show us where you arrived from</h2>
        <div className={style.map}>
          <MapComponent
            pointTo={newMap.pointTo}
            pointFrom={callPage === 'main' ? undefined : newMap.pointFrom}
            onChangeLocation={setClickLocation}
          />
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
            text={getGradeText(rateValue)}
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
