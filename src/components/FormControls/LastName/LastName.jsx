import React, { useEffect, useRef } from 'react';
import { Button, ButtonLabel, Error } from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../../store/form-slice';

import images from '../../../constants/images';
import { formText } from '../../../constants/data';

import styles from './LastName.module.css';

const LastName = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const pointer = useSelector((state) => state.form.pointer);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formData = useSelector((state) => state.form.formData);
  const progress = useSelector((state) => state.form.progress);

  const inputRef = useRef();

  console.log(formData);

  const lastName = formData.lastName;
  let nameIsValid = lastName.trim() !== '';

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  }, []);

  useEffect(() => {
    dispatch(formActions.setElementValidity({ pointer, isValid: nameIsValid }));

    if (nameIsValid) {
      dispatch(formActions.setErrorMessage(null));
    }
  }, [dispatch, nameIsValid, pointer]);

  const nameChangeHandler = (event) => {
    dispatch(formActions.setFormData({ lastName: event.target.value }));
  };

  const navigationHandler = () => {
    showNextElement();
  };

  if (nameIsValid && progress < pointer * 100)
    dispatch(formActions.incrementProgress());
  else if (!nameIsValid && progress !== (pointer - 1) * 100)
    dispatch(formActions.decrementProgress());

  let footer = (
    <div className={styles.button}>
      <Button onClick={navigationHandler} />
      <ButtonLabel labelKey="Enter ↵" />
    </div>
  );

  if (nameIsValid) {
    footer = (
      <div className={styles.button}>
        <Button onClick={navigationHandler} />
        <ButtonLabel labelKey="Enter ↵" />
      </div>
    );
  }

  if (errorMessage && !nameIsValid) {
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
            {formText.lastName.labelTextOne}
            {formData.firstName}
            {formText.lastName.labelTextTwo}
          </span>
        </label>

        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Type your answer here..."
          ref={inputRef}
          value={lastName}
          onChange={nameChangeHandler}
        />

        {footer}
      </div>
    </div>
  );
};

LastName.displayName = 'lastName';

export default LastName;
