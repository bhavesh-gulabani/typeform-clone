import React, { useEffect, useRef } from 'react';
import { Button, ButtonLabel, Error } from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../../store/form-slice';

import images from '../../../constants/images';
import { formText } from '../../../constants/data';

import { motion } from 'framer-motion';

const FirstName = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.form.scrollDirection);
  const pointer = useSelector((state) => state.form.pointer);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formData = useSelector((state) => state.form.formData);
  const progress = useSelector((state) => state.form.progress);

  const inputRef = useRef();

  const firstName = formData.firstName;
  let nameIsValid = firstName.trim() !== '';

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
    dispatch(formActions.setFormData({ firstName: event.target.value }));
  };

  const navigationHandler = () => {
    showNextElement();
  };

  if (nameIsValid && progress < pointer * 100)
    dispatch(formActions.incrementProgress());
  else if (!nameIsValid && progress !== (pointer - 1) * 100)
    dispatch(formActions.decrementProgress());

  let footer = (
    <div className="button">
      <Button onClick={navigationHandler} />
      <ButtonLabel labelKey="Enter ↵" />
    </div>
  );

  if (nameIsValid) {
    footer = (
      <div className="button">
        <Button onClick={navigationHandler} />
        <ButtonLabel labelKey="Enter ↵" />
      </div>
    );
  }

  if (errorMessage && !nameIsValid) {
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
          <span className="labelText">{formText.firstName.labelText}</span>
        </label>

        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Type your answer here..."
          ref={inputRef}
          onChange={nameChangeHandler}
          value={firstName}
        />

        {footer}
      </div>
    </motion.div>
  );
};

FirstName.displayName = 'firstName';

export default FirstName;
