import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formText } from '../../../constants/data';
import images from '../../../constants/images';
import { formActions } from '../../../store/form-slice';
import Button from '../../UI/Button/Button';

import CheckBox from '../../UI/CheckBox/CheckBox';
import Error from '../../UI/Error/Error';

import styles from './Role.module.css';

import { motion } from 'framer-motion';

const Role = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.form.scrollDirection);
  const pointer = useSelector((state) => state.form.pointer);
  const progress = useSelector((state) => state.form.progress);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formValidity = useSelector((state) => state.form.formValidity);
  const formData = useSelector((state) => state.form.formData);

  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  let isValid = formValidity[pointer];

  const roleSelectionHandler = (value) => {
    dispatch(formActions.setElementValidity({ pointer, isValid: true }));
    dispatch(formActions.setFormData({ role: value }));
    if (progress < pointer * 100) {
      dispatch(formActions.incrementProgress());
    }
    dispatch(formActions.incrementPointer());
  };

  let footer = (
    <div className="button">
      <Button onClick={showNextElement} />
    </div>
  );

  if (isValid) {
    footer = (
      <div className="button">
        <Button onClick={showNextElement} />
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
      className={`container ${styles.roleContainer}`}
      tabIndex={1}
      ref={containerRef}
    >
      <div className="number">
        <span>{pointer}</span>
        <img src={images.rightArrow} alt="Right Arrow" />
      </div>

      <div className="formControl">
        <label>
          <span className="labelText">{formText.role.labelText}</span>
          <p className="subLabelText">
            <span>{formText.role.subLabelText}</span>
          </p>
        </label>

        <div className={styles.radioGroup}>
          {formText.role.roles.map((role) => (
            <CheckBox
              letter={role[0]}
              label={role[1]}
              onClick={roleSelectionHandler}
              key={role[0]}
              isChecked={formData.role === role[1]}
            />
          ))}
        </div>

        {footer}
      </div>
    </motion.div>
  );
};

Role.displayName = 'role';

export default Role;
