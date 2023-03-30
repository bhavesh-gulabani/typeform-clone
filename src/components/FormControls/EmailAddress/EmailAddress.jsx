import React, { useEffect, useRef } from 'react';
import { Button, ButtonLabel, Error } from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../../store/form-slice';

import images from '../../../constants/images';
import { formText } from '../../../constants/data';

import styles from './EmailAddress.module.css';

import { errorMessages } from '../../../constants/data';

const validateEmail = (value) => {
  if (value === '') {
    return 'EMPTY';
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return 'INVALID';
  } else {
    return 'VALID';
  }
};

const EmailAddress = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const pointer = useSelector((state) => state.form.pointer);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formData = useSelector((state) => state.form.formData);
  const progress = useSelector((state) => state.form.progress);

  const inputRef = useRef();

  const emailAddress = formData.emailAddress;
  let emailIsValid = validateEmail(emailAddress.trim());

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
        isValid: emailIsValid === 'VALID',
      })
    );

    if (emailIsValid === 'VALID') {
      dispatch(formActions.setErrorMessage(null));
      dispatch(
        formActions.setElementValidity({
          pointer,
          isValid: true,
        })
      );
    }
  }, [dispatch, emailIsValid, pointer]);

  const emailChangeHandler = (event) => {
    dispatch(formActions.setErrorMessage(null));
    dispatch(formActions.setFormData({ emailAddress: event.target.value }));
  };

  const navigationHandler = () => {
    if (emailIsValid === 'EMPTY') {
      dispatch(
        formActions.setErrorMessage(errorMessages.emailAddressErrors[0])
      );
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (emailIsValid === 'INVALID') {
      dispatch(
        formActions.setErrorMessage(errorMessages.emailAddressErrors[1])
      );
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (emailIsValid === 'VALID') {
      dispatch(formActions.setElementValidity({ pointer, isValid: true }));
      dispatch(formActions.setErrorMessage(null));
      if (progress < pointer * 100) dispatch(formActions.incrementProgress());

      showNextElement();
    }
  };

  if (emailIsValid === 'VALID' && progress < pointer * 100)
    dispatch(formActions.incrementProgress());
  else if (emailIsValid !== 'VALID' && progress !== (pointer - 1) * 100)
    dispatch(formActions.decrementProgress());

  let footer = (
    <div className={styles.button}>
      <Button onClick={navigationHandler} />
      <ButtonLabel labelKey="Enter ↵" />
    </div>
  );

  if (emailIsValid === 'VALID') {
    footer = (
      <div className={styles.button}>
        <Button onClick={navigationHandler} />
        <ButtonLabel labelKey="Enter ↵" />
      </div>
    );
  }

  if (errorMessage && emailIsValid !== 'VALID') {
    footer = <Error message={errorMessage} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.number}>
        <span>{pointer}</span>
        <img src={images.rightArrow} alt="Right Arrow" />
      </div>

      <div className={styles.formControl}>
        <label>
          <span className={styles.labelText}>
            {formText.emailAddress.labelText}
          </span>
          <p className={styles.subLabelText}>
            <span>{formText.emailAddress.subLabelText}</span>
          </p>
        </label>

        <input
          type="text"
          id="emailName"
          name="emailName"
          placeholder="name@example.com"
          ref={inputRef}
          onChange={emailChangeHandler}
          value={emailAddress}
        />

        {footer}
      </div>
    </div>
  );
};

EmailAddress.displayName = 'emailAddress';

export default EmailAddress;
