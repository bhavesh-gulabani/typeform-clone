import React, { useEffect, useRef } from 'react';
import { Button, ButtonLabel, Error, Select } from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../../store/form-slice';

import images from '../../../constants/images';
import { errorMessages, formText } from '../../../constants/data';

import styles from './PhoneNumber.module.css';

import { motion } from 'framer-motion';

const validatePhone = (value) => {
  if (value === '') {
    return 'EMPTY';
  } else if (!/^\d+$/.test(value)) {
    return 'LETTER';
  } else if (value.length > 16) {
    return 'MAX LENGTH';
  } else if (value.length !== 10) {
    return 'INVALID LENGTH';
  } else {
    return 'VALID';
  }
};

const PhoneNumber = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.form.scrollDirection);
  const pointer = useSelector((state) => state.form.pointer);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formData = useSelector((state) => state.form.formData);
  const progress = useSelector((state) => state.form.progress);

  const inputRef = useRef();

  const phoneNumber = formData.phoneNumber;
  let phoneNumberIsValid = validatePhone(phoneNumber.trim());

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  }, []);

  useEffect(() => {
    dispatch(
      formActions.setElementValidity({
        pointer,
        isValid: phoneNumberIsValid === 'VALID',
      })
    );

    setTimeout(() => dispatch(formActions.setErrorMessage(null)), 5000);

    if (phoneNumberIsValid === 'VALID') {
      dispatch(formActions.setErrorMessage(null));
    }

    if (phoneNumberIsValid === 'VALID' && progress < pointer * 100)
      dispatch(formActions.incrementProgress());
    else if (
      !(phoneNumberIsValid === 'VALID') &&
      progress !== (pointer - 1) * 100
    )
      dispatch(formActions.decrementProgress());
  }, [dispatch, phoneNumberIsValid, pointer, progress]);

  const phoneChangeHandler = (event) => {
    if (phoneNumberIsValid === 'LETTER') {
      dispatch(formActions.setErrorMessage(errorMessages.phoneNumberErrors[0]));
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());

      let value = event.target.value
        .split('')
        .filter((letter) => letter >= '0' && letter <= '9')
        .join('');

      dispatch(formActions.setFormData({ phoneNumber: value }));
    } else if (phoneNumberIsValid === 'MAX LENGTH') {
      dispatch(formActions.setErrorMessage(errorMessages.phoneNumberErrors[3]));
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());

      let value = event.target.value.slice(0, 16);

      dispatch(formActions.setFormData({ phoneNumber: value }));
    } else {
      dispatch(formActions.setFormData({ phoneNumber: event.target.value }));
    }
  };

  let phoneExtension;

  const extensionHandler = (extension) => {
    phoneExtension = extension;
    dispatch(formActions.setFormData({ phoneExtension }));
  };

  const navigationHandler = () => {
    if (phoneNumberIsValid === 'LETTER') {
      dispatch(formActions.setErrorMessage(errorMessages.phoneNumberErrors[0]));
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (phoneNumberIsValid === 'EMPTY') {
      dispatch(formActions.setErrorMessage(errorMessages.phoneNumberErrors[1]));
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (phoneNumberIsValid === 'INVALID LENGTH') {
      dispatch(formActions.setErrorMessage(errorMessages.phoneNumberErrors[2]));
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (phoneNumberIsValid === 'VALID') {
      dispatch(formActions.setElementValidity({ pointer, isValid: true }));
      dispatch(formActions.setErrorMessage(null));
      if (progress < pointer * 100) dispatch(formActions.incrementProgress());

      showNextElement();
    }
  };

  let footer = (
    <div className={`button ${styles.finalButton}`}>
      <Button type="last" onClick={navigationHandler} />
      <ButtonLabel
        className={styles.finalButtonLabel}
        labelKey="Ctrl + Enter ↵"
      />
    </div>
  );

  if (phoneNumberIsValid === 'VALID') {
    footer = (
      <div id="finalButton" className={`button ${styles.finalButton}`}>
        <Button type="last" onClick={navigationHandler} />
        <ButtonLabel
          className={styles.finalButtonLabel}
          labelKey="Ctrl + Enter ↵"
        />
      </div>
    );
  }

  if (errorMessage && !(phoneNumberIsValid === 'VALID')) {
    footer = <Error message={errorMessage} />;
  }

  return (
    <motion.div
      initial={{ y: scrollDirection > 0 ? 300 : -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={({ duration: 0.3 }, { opacity: { duration: 0.4 } })}
      className="container"
    >
      <div className="number">
        <span>{pointer}</span>
        <img src={images.rightArrow} alt="Right Arrow" />
      </div>

      <div className="formControl">
        <label>
          <span className="labelText">{formText.phoneNumber.labelText}</span>
          <p className={`subLabelText ${styles.phoneSubLabel}`}>
            <span>{formText.phoneNumber.subLabelText}</span>
          </p>
        </label>

        <div className={styles.input}>
          <Select onSelect={extensionHandler} />

          <input
            className={styles.phone}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="081234 56789"
            ref={inputRef}
            onChange={phoneChangeHandler}
            value={phoneNumber}
          />
        </div>

        {footer}
      </div>
    </motion.div>
  );
};

PhoneNumber.displayName = 'phoneNumber';

export default PhoneNumber;
