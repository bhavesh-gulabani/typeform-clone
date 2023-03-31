import React from 'react';
import images from '../../../constants/images';

import styles from './CheckBox.module.css';

const CheckBox = ({
  type,
  letter,
  label,
  onClick: clickHandler,
  isChecked,
  selectedOptions,
}) => {
  let containerClasses =
    type === 'goal'
      ? `${styles.container} ${styles.goal}`
      : `${styles.container}`;

  let disabledClasses = selectedOptions === 2 ? `${styles.disabled}` : '';
  if (type !== 'goal') {
    disabledClasses = selectedOptions === 1 ? `${styles.disabled}` : '';
  }

  return (
    <div
      className={
        isChecked
          ? `${containerClasses}`
          : `${containerClasses} ${disabledClasses}`
      }
      onClick={clickHandler.bind(null, label)}
      tabIndex={selectedOptions === 2 ? -1 : 5}
    >
      <div
        className={
          isChecked ? `${styles.letter} ${styles.checked}` : `${styles.letter}`
        }
      >
        <span>{letter}</span>
      </div>
      <div className={styles.text}>
        <span>{label}</span>
      </div>

      {isChecked && (
        <img className={styles.right} src={images.checkMark} alt="" />
      )}
    </div>
  );
};

export default CheckBox;
