import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TripErrorMessages } from '../../../../enums';
import { FileTransferObj, FormInputItems, ValuesKey } from '../../../../types';
import Drag from '../DragZone';
import TripMap from '../TripMap';
import style from './TripForm.module.scss';

const initialFormValues = {
  memoir: '',
  destination: '',
  country: '',
  continent: '',
  sites: '',
};

const TripForm = () => {
  const initialPhotos: FileTransferObj[] = [];
  const [photos, setPhotos] = useState(initialPhotos);

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm<FormInputItems>({ mode: 'all' });

  const onSubmit: SubmitHandler<FormInputItems> = ((data) => {
    console.log('FORM DATA', data);
    console.log('photosList', photos);
    reset();
  });

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
          <div className={style['form-inputError']}>
            {errors[name] && <span className={style.error}>{errors[name]?.message || 'Error!'}</span>}
          </div>
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

  return (
    <form id="tripForm" className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style['form-leftSide']}>
        {inputs}
        <div className={style['form-sightBox']} />
        <h2 className={style['form-mapTitle']}>Show us where you arrived from</h2>
        <div className={style.map}>
          <TripMap />
        </div>
        <div className={style['form-date']}>
          <div>
            <span>
              Trip duration
            </span>
            <div>
              <input type="date" name={nameDateFrom} ref={refDateFrom} onChange={onChangeDateFrom} />
              <div className={style['form-inputError']}>
                {errors.dateFrom && <span className={style.error}>{errors.dateFrom?.message || 'Error!'}</span>}
              </div>
            </div>
            <div>
              <input type="date" name={nameDateTo} ref={refDateTo} onChange={onChangeDateTo} />
              <div className={style['form-inputError']}>
                {errors.dateTo && <span className={style.error}>{errors.dateTo?.message || 'Error!'}</span>}
              </div>
            </div>
          </div>
        </div>
        <input className={style['form-submit']} type="submit" value="Record this Memoir" />
      </div>
      <div className={style['form-rightSide']}>
        <Drag photos={photos} setPhotos={setPhotos} />
        <h2 className={style['form-mapTitle']}>Describe your trip</h2>
        <textarea
          className={style['form-area']}
          form="tripForm"
          name={nameArea}
          ref={refArea}
          onChange={onChangeArea}
          onBlur={onBlurArea}
        />
        <div className={style['form-inputError']}>
          {errors.description && <span className={style.error}>{errors.description?.message || 'Error!'}</span>}
        </div>
      </div>
    </form>
  );
};

export default TripForm;
