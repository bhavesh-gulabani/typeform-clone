import React from 'react';

import formElements from './constants/form-elements';
import styles from './App.module.css';

import images from './constants/images';

import { useSelector } from 'react-redux';
import { FormWrapper } from './components';

const App = () => {
  const progress = useSelector((state) => state.form.progress);
  let progressBarWidth = progress / (formElements.numberOfElements - 2);

  return (
    <>
      <header>
        <div
          className={styles['progress-bar']}
          style={{ width: `${progressBarWidth}% ` }}
        />
        <img src={images.logoDark} alt="logo" className={styles.logo} />
      </header>

      <main>
        <FormWrapper />
      </main>
    </>
  );
};

export default App;
