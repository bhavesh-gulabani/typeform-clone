import React from 'react';

import { FormWrapper } from './components';

import styles from './App.module.css';
import images from './constants/images';

const App = () => {
  let progressBarWidth = 0;

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
