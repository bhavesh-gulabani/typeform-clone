import React from 'react';

import formElements from './constants/form-elements';
import './App.css';

import images from './constants/images';

import { useSelector } from 'react-redux';
import { FormWrapper } from './components';

import { motion } from 'framer-motion';

const App = () => {
  const progress = useSelector((state) => state.form.progress);
  let progressBarWidth = progress / (formElements.numberOfElements - 2);

  return (
    <>
      <header>
        <div
          className={'progress-bar'}
          style={{ width: `${progressBarWidth}% ` }}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={({ duration: 0.5 }, { opacity: { duration: 0.5 } })}
        >
          <img src={images.logoDark} alt="logo" className="main-logo" />
        </motion.div>
      </header>

      <main>
        <FormWrapper />
      </main>
    </>
  );
};

export default App;
