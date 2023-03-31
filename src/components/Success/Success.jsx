import React from 'react';

import { formText } from '../../constants/data';

import styles from './Success.module.css';

import { motion } from 'framer-motion';

const Success = () => {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={({ duration: 0.3 }, { opacity: { duration: 0.4 } })}
      className={styles.container}
    >
      <span className="labelText">{formText.success.labelText}</span>
    </motion.div>
  );
};

export default Success;
