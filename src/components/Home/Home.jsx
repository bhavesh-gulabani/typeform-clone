import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ButtonLabel } from '../../components';
import { formActions } from '../../store/form-slice';
import styles from './Home.module.css';

import { homeText } from '../../constants/data';

import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const scrollDirection = useSelector((state) => state.form.scrollDirection);

  const navigationHandler = () => {
    dispatch(formActions.incrementPointer());
  };

  return (
    <motion.div
      initial={scrollDirection < 0 ? { y: -300, opacity: 0 } : { opacity: 0 }}
      animate={scrollDirection < 0 ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={
        scrollDirection < 0
          ? ({ duration: 0.3 }, { opacity: { duration: 0.4 } })
          : ({ duration: 1.5 }, { opacity: { duration: 1.5 } })
      }
    >
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
    </motion.div>
  );
};

export default Home;
