import React, { useEffect, useRef, useState } from 'react';

import styles from './Select.module.css';

import Error from '../Error/Error';

import { filteredData as phoneData } from '../../../constants/phoneExtension';
import images from '../../../constants/images';

const Select = ({ onSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(
    phoneData.filter((obj) => obj.code === 'IN')[0]
  );
  const inputRef = useRef();

  useEffect(() => {
    if (isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const [visibleOptions, setvisibleOptions] = useState(phoneData);

  const clickHandler = () => {
    setvisibleOptions(phoneData);
    setIsActive(true);
  };

  const selectHandler = (option) => {
    setSelected(option);
    setIsActive(false);
    onSelect(option.extension);
  };

  const searchHandler = (event) => {
    let newOptions = phoneData.filter((data) =>
      data.country.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setvisibleOptions(newOptions);
  };

  return (
    <div className={styles.container}>
      {!isActive && (
        <button className={styles.flagButton} onClick={clickHandler}>
          <img src={selected.flag} alt="flag" />
          <img src={images.downArrow} alt="arrow" />
        </button>
      )}
      {isActive && (
        <div
          className={styles.modalContainer}
          onWheel={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            onChange={searchHandler}
            className={styles.searchInput}
            placeholder="Search countries"
            ref={inputRef}
          />
          <div className={styles.optionsContainer}>
            {visibleOptions.map((option) => (
              <div
                className={styles.option}
                onClick={selectHandler.bind(null, option)}
                key={option.code}
              >
                <img src={option.flag} alt="flag" />
                <span className={styles.firstOpt}>{option.country}</span>
                <span className={styles.secondOpt}>{option.extension}</span>
              </div>
            ))}
          </div>
          {visibleOptions.length === 0 && (
            <div className={styles.errorMessage}>
              <Error message="No suggestions found." />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
