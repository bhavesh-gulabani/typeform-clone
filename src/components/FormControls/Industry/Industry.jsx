import React, { useEffect, useRef, useState } from 'react';
import { Button, Error } from '../../../components';
import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../../store/form-slice';

import images from '../../../constants/images';
import { formText, industries } from '../../../constants/data';

import styles from './Industry.module.css';

import { motion } from 'framer-motion';

const OPTIONS = industries.map((industry) => {
  return {
    value: industry,
    label: industry,
  };
});

const Industry = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.form.scrollDirection);
  const pointer = useSelector((state) => state.form.pointer);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formData = useSelector((state) => state.form.formData);
  const progress = useSelector((state) => state.form.progress);

  const [selectedOption, setSelectedOption] = useState(null);

  const inputRef = useRef();

  let industryIsValid = selectedOption ? selectedOption.value : false;

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
        isValid: Boolean(industryIsValid),
      })
    );

    if (industryIsValid) {
      dispatch(formActions.setErrorMessage(null));
      dispatch(formActions.setFormData({ industry: selectedOption.value }));
      showNextElement();
      if (progress < pointer * 100) {
        dispatch(formActions.incrementProgress());
      }
    } else if (!industryIsValid && progress >= (pointer - 1) * 100) {
      dispatch(formActions.decrementProgress());
    }
  }, [
    dispatch,
    industryIsValid,
    pointer,
    showNextElement,
    progress,
    selectedOption,
  ]);

  const navigationHandler = () => {
    showNextElement();
  };

  let footer = (
    <div className="button">
      <Button onClick={navigationHandler} />
    </div>
  );

  if (industryIsValid) {
    footer = (
      <div className="button">
        <Button onClick={navigationHandler} />
      </div>
    );
  }

  if (errorMessage && !industryIsValid) {
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

      <div className="formControl" onWheel={(e) => e.stopPropagation()}>
        <label>
          <span className="labelText">{formText.industry.labelText}</span>
          <p className="subLabelText">
            <span>{formText.industry.subLabelText}</span>
          </p>
        </label>

        <Select
          ref={inputRef}
          options={OPTIONS}
          placeholder="Type or select an option"
          onChange={setSelectedOption}
          value={
            formData.industry
              ? { label: formData.industry, value: formData.industry }
              : null
          }
          unstyled
          classNames={{
            container: (state) =>
              state.isFocused
                ? styles.selectContainerFocused
                : styles.selectContainer,
            placeholder: () => styles.placeholder,
            option: (state) =>
              state.isFocused
                ? `${styles.focused} ${styles.selectOption}`
                : styles.selectOption,
            menu: () => styles.selectMenu,
            input: () => styles.selectInput,
            menuList: () => styles.selectMenuList,
            noOptionsMessage: () => styles.selectNoOptions,
            singleValue: () => styles.singleVal,
          }}
          captureMenuScroll="false"
          noOptionsMessage={() => 'No suggestions found'}
        />

        {footer}
      </div>
    </motion.div>
  );
};

Industry.displayName = 'industry';

export default Industry;
