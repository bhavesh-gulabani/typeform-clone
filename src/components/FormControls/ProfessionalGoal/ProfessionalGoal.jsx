import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessages, formText } from '../../../constants/data';
import images from '../../../constants/images';
import { formActions } from '../../../store/form-slice';
import Button from '../../UI/Button/Button';
import CheckBox from '../../UI/CheckBox/CheckBox';
import Error from '../../UI/Error/Error';

import styles from './ProfessionalGoal.module.css';

import { motion } from 'framer-motion';

const ProfessionalGoal = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.form.scrollDirection);
  const pointer = useSelector((state) => state.form.pointer);
  const progress = useSelector((state) => state.form.progress);
  const formData = useSelector((state) => state.form.formData);
  const formValidity = useSelector((state) => state.form.formValidity);
  let errorMessage = useSelector((state) => state.form.errorMessage);

  let goals = formData.professionalGoal;

  const [selectedOptions, setSelectedOptions] = useState(goals.length);

  let isValid = formValidity[pointer];

  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (selectedOptions === 0) {
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (selectedOptions === 1) {
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (selectedOptions === 2) {
      dispatch(formActions.setElementValidity({ pointer, isValid: true }));
      dispatch(formActions.setErrorMessage(null));
      if (progress < pointer * 100) dispatch(formActions.incrementProgress());
    }
  }, [selectedOptions, dispatch, pointer, progress]);

  const goalSelectHandler = (goal) => {
    // Reset footer
    dispatch(formActions.setErrorMessage(null));

    // Reset element validity
    dispatch(formActions.setElementValidity({ pointer, isValid: false }));

    // Unselect current option if it exists in goals
    if (goals.includes(goal)) {
      setSelectedOptions((prev) => prev - 1);

      dispatch(
        formActions.setFormData({
          operation: 'POP',
          goal,
        })
      );
    } else {
      // Add selected option to goals only if there are less than two goals
      if (selectedOptions < 2) {
        setSelectedOptions((prev) => prev + 1);

        dispatch(formActions.setFormData({ operation: 'PUSH', goal }));
      } else if (selectedOptions === 2) {
        dispatch(formActions.setElementValidity({ pointer, isValid: true }));
      }
    }
  };

  const submitHandler = () => {
    if (selectedOptions === 0) {
      dispatch(
        formActions.setErrorMessage(errorMessages.professionalGoalErrors[0])
      );
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (selectedOptions === 1) {
      dispatch(
        formActions.setErrorMessage(errorMessages.professionalGoalErrors[1])
      );
      if (progress !== (pointer - 1) * 100)
        dispatch(formActions.decrementProgress());
    } else if (selectedOptions === 2) {
      dispatch(formActions.setElementValidity({ pointer, isValid: true }));
      dispatch(formActions.setErrorMessage(null));
      if (progress < pointer * 100) dispatch(formActions.incrementProgress());

      showNextElement();
    }
  };

  let checkBoxes = formText.professionalGoal.goals.others.map((goal) => (
    <CheckBox
      type="goal"
      letter={goal[0]}
      label={goal[1]}
      onClick={goalSelectHandler}
      key={goal[0]}
      isChecked={formData.professionalGoal.includes(goal[1])}
      selectedOptions={selectedOptions}
    />
  ));

  if (formData.role.includes('Founder')) {
    checkBoxes = formText.professionalGoal.goals.founder.map((goal) => (
      <CheckBox
        type="goal"
        letter={goal[0]}
        label={goal[1]}
        onClick={goalSelectHandler}
        key={goal[0]}
        isChecked={formData.professionalGoal.includes(goal[1])}
        selectedOptions={selectedOptions}
      />
    ));
  }

  let helperText = <span>Choose 2</span>;

  if (selectedOptions === 1) {
    helperText = <span>Choose 1 more</span>;
  } else if (selectedOptions === 2) {
    helperText = <span></span>;
  }

  let footer = (
    <div className="button">
      <Button onClick={submitHandler} />
    </div>
  );

  if (isValid) {
    footer = (
      <div className="button">
        <Button onClick={submitHandler} />
      </div>
    );
  }

  if (errorMessage && !isValid) {
    footer = <Error message={errorMessage} />;
  }

  return (
    <motion.div
      initial={{ y: scrollDirection > 0 ? 300 : -300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={({ duration: 0.3 }, { opacity: { duration: 0.4 } })}
      className={`container ${styles.goalContainer}`}
      tabIndex={1}
      ref={containerRef}
    >
      <div className="number">
        <span>{pointer}</span>
        <img src={images.rightArrow} alt="Right Arrow" />
      </div>

      <div className="formControl">
        <label>
          <span className="labelText">
            {formData.firstName}
            {formText.professionalGoal.labelText}
          </span>
        </label>

        <div className={styles.radioGroup}>
          <div className={styles.helperText}>{helperText}</div>
          {checkBoxes}
        </div>

        {footer}
      </div>
    </motion.div>
  );
};

ProfessionalGoal.displayName = 'professionalGoal';

export default ProfessionalGoal;
