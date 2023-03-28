import React from 'react';

import images from '../../../constants/images';

import styles from './Button.module.css';

const Button = ({ type, onClick: clickHandler }) => {
  let buttonText = 'OK';

  if (type === 'first') {
    buttonText = 'I agree';
  } else if (type === 'last') {
    buttonText = 'Submit';
  }

  return (
    <button onClick={clickHandler}>
      {buttonText}
      <span>
        {buttonText === 'OK' ? (
          <img
            className={styles.checkMark}
            src={images.checkMark}
            alt="Check Mark Icon"
          />
        ) : (
          ''
        )}
      </span>
    </button>
  );
};

export default Button;
