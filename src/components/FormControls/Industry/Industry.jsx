import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonLabel, Error } from '../../../components';
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

  // Validation condition...
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
    <div className={styles.button}>
      <Button onClick={navigationHandler} />
      <ButtonLabel labelKey="Enter ↵" />
    </div>
  );

  if (industryIsValid) {
    footer = (
      <div className={styles.button}>
        <Button onClick={navigationHandler} />
        <ButtonLabel labelKey="Enter ↵" />
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
    >
      <div className={styles.container}>
        <div className={styles.number}>
          <span>{pointer}</span>
          <img src={images.rightArrow} alt="Right Arrow" />
        </div>

        <div className={styles.formControl}>
          <label>
            <span className={styles.labelText}>
              {formText.industry.labelText}
            </span>
            <p className={styles.subLabelText}>
              <span>{formText.industry.subLabelText}</span>
            </p>
          </label>

          <Select
            ref={inputRef}
            options={OPTIONS}
            placeholder="Type or select an option"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            value={formData.industry}
            unstyled
            classNames={{
              container: (state) =>
                state.isFocused
                  ? styles.selectContainerFocused
                  : styles.selectContainer,
              placeholder: () => styles.placeholder,
              option: (state) =>
                state.isSelected ? styles.test : styles.selectOption,
              menu: () => styles.selectMenu,
              input: () => styles.selectInput,
              menuList: () => styles.selectMenuList,
              noOptionsMessage: () => styles.selectNoOptions,
            }}
          />

          {footer}
        </div>
      </div>
    </motion.div>
  );
};

Industry.displayName = 'industry';

export default Industry;
