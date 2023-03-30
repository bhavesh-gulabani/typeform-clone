import React from 'react';
import images from '../../../constants/images';

import styles from './CheckBox.module.css';

const CheckBox = ({
  type,
  letter,
  label,
  onClick: clickHandler,
  isChecked,
}) => {
  let containerClasses =
    type === 'goal'
      ? `${styles.container} ${styles.goal}`
      : `${styles.container}`;

  return (
    <div className={containerClasses} onClick={clickHandler.bind(null, label)}>
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
