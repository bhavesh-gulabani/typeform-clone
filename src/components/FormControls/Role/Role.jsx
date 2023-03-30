import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formText } from '../../../constants/data';
import images from '../../../constants/images';
import { formActions } from '../../../store/form-slice';
import Button from '../../UI/Button/Button';
import ButtonLabel from '../../UI/ButtonLabel/ButtonLabel';

import CheckBox from '../../UI/CheckBox/CheckBox';
import Error from '../../UI/Error/Error';

import styles from './Role.module.css';

const Role = ({ showNextElement }) => {
  const dispatch = useDispatch();
  const pointer = useSelector((state) => state.form.pointer);
  const progress = useSelector((state) => state.form.progress);
  let errorMessage = useSelector((state) => state.form.errorMessage);
  const formValidity = useSelector((state) => state.form.formValidity);
  const formData = useSelector((state) => state.form.formData);

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
    <div className={styles.button}>
      <Button onClick={showNextElement} />
      <ButtonLabel labelKey="Enter ↵" />
    </div>
  );

  if (isValid) {
    footer = (
      <div className={styles.button}>
        <Button onClick={showNextElement} />
        <ButtonLabel labelKey="Enter ↵" />
      </div>
    );
  }

  if (errorMessage && !isValid) {
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
          <span className={styles.labelText}>{formText.role.labelText}</span>
          <p className={styles.subLabelText}>
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
    </div>
  );
};

Role.displayName = 'role';

export default Role;
