import React from 'react';
import styles from './ButtonLabel.module.css';

const ButtonLabel = ({ labelKey, className }) => {
  return (
    <span className={`${styles.label} ${className}`}>
      press <strong>{labelKey}</strong>
    </span>
  );
};

export default ButtonLabel;
