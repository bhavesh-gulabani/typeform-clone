import React from 'react';

import styles from './Error.module.css';

import images from '../../../constants/images';

const Error = ({ message }) => {
  return (
    <div>
      <div className={styles.container}>
        <img src={images.errorIcon} alt="error-icon" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Error;
