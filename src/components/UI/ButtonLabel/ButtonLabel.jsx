import React from 'react';
import styles from './ButtonLabel.module.css';

const ButtonLabel = ({ labelKey }) => {
  return (
    <span className={styles.label}>
      press <strong>{labelKey}</strong>
    </span>
  );
};

export default ButtonLabel;
