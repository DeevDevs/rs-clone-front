import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputItems, ValuesKey } from '../../../../types';
import TripMap from '../tripMap';
import style from './TripForm.module.scss';

const initialFormValues = {
  memoir: '',
  place: '',
  country: '',
  worldPart: '',
  sights: '',
};

const TripForm = () => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm<FormInputItems>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormInputItems> = ((data) => {
    console.log(data);
    reset();
  });

  const inputs = Object
    .keys(initialFormValues)
    .map((key: ValuesKey | string) => {
      const { name, ref, onBlur } = register(key as ValuesKey, {
        required: 'please, fill in the field',
      });

      return (
        <div key={key}>
          <label htmlFor={key}>
            {key}
            <input
              name={name}
              ref={ref}
              onBlur={onBlur}
            />
          </label>
          <div className={style['form-inputError']}>
            {errors[name] && <p>{errors[name]?.message || 'Error!'}</p>}
          </div>
        </div>
      );
    });

  const { name: nameArea, ref: refArea, onChange: onChangeArea } = register('description', {
    required: 'please, fill in the field',
    maxLength: {
      value: 500,
      message: 'description must be no more than 500 characters',
    },
    minLength: {
      value: 100,
      message: 'description must be at least 100 characters',
    },
  });

  const { name: nameDateFrom, ref: refDateFrom, onChange: onChangeDateFrom } = register('dateFrom', {
    required: 'please, fill in start date',
  });
  const { name: nameDateTo, ref: refDateTo, onChange: onChangeDateTo } = register('dateTo', {
    required: 'please, fill in end date',
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
              Trip Duration
            </span>
            <div>
              <input type="date" name={nameDateFrom} ref={refDateFrom} onChange={onChangeDateFrom} />
              <div className={style['form-inputError']}>
                {errors.dateFrom && <p>{errors.dateFrom?.message || 'Error!'}</p>}
              </div>
            </div>
            <div>
              <input type="date" name={nameDateTo} ref={refDateTo} onChange={onChangeDateTo} />
              <div className={style['form-inputError']}>
                {errors.dateTo && <p>{errors.dateTo?.message || 'Error!'}</p>}
              </div>
            </div>
          </div>
        </div>
        <input className={style['form-submit']} type="submit" value="Record this Memoir" />
      </div>
      <div className={style['form-rightSide']}>
        <h2 className={style['form-mapTitle']}>Describe your trip</h2>
        <textarea
          className={style['form-area']}
          form="tripForm"
          name={nameArea}
          ref={refArea}
          onChange={onChangeArea}
        />
        <div className={style['form-inputError']}>
          {errors.description && <p>{errors.description?.message || 'Error!'}</p>}
        </div>
      </div>
    </form>
  );
};

export default TripForm;
