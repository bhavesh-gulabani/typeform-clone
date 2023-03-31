import React from 'react';

import styles from './Error.module.css';

import images from '../../../constants/images';

import { motion } from 'framer-motion';

const Error = ({ message }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={({ duration: 0.3 }, { opacity: { duration: 0.4 } })}
    >
      <div className={styles.container}>
        <img src={images.errorIcon} alt="error-icon" />
        <span>{message}</span>
      </div>
    </motion.div>
  );
};

export default Error;
