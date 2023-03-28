import React from 'react';
import { useDispatch } from 'react-redux';

import { Button, ButtonLabel } from '../../components';
import { formActions } from '../../store/form-slice';
import styles from './Home.module.css';

import { homeText } from '../../constants/data';

const Home = () => {
  const dispatch = useDispatch();

  const navigationHandler = () => {
    dispatch(formActions.incrementPointer());
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <span className={styles.heading}>{homeText.header}</span>

        <br />

        <p className={styles.content}>
          <span>{homeText.lineOne}</span>

          <br />
          <br />
          <span>
            <span>{homeText.lineTwo}</span>
            <span>
              <br />
              {homeText.bulletPoints.one}
            </span>
            <span>
              <br />
              {homeText.bulletPoints.two}
            </span>
          </span>
        </p>
      </div>
      <div className={styles.button}>
        <Button type="first" onClick={navigationHandler} />
        <ButtonLabel labelKey="Enter ↵" />
      </div>
    </div>
  );
};

export default Home;
