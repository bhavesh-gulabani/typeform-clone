import React from 'react';

import { formText } from '../../constants/data';

import styles from './Success.module.css';

const Success = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formControl}>
        <label>
          <span className={styles.labelText}>{formText.success.labelText}</span>
        </label>
      </div>
    </div>
  );
};

export default Success;
