import React, { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { errorMessages } from '../../constants/data';
import { formActions } from '../../store/form-slice';

import formElements from '../../constants/form-elements';

import styles from './FormWrapper.module.css';

const FormWrapper = () => {
  const dispatch = useDispatch();
  const pointer = useSelector((state) => state.form.pointer);
  const formValidity = useSelector((state) => state.form.formValidity);

  const sectionRef = useRef();

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.focus();
    }
  }, []);

  let CurrentElement = formElements.componentArray[pointer];

  const showNextElement = () => {
    formValidity[pointer]
      ? dispatch(formActions.incrementPointer())
      : dispatch(
          formActions.setErrorMessage(errorMessages[CurrentElement.displayName])
        );
  };

  const scrollHandler = (event) => {
    console.log(pointer);
    if (event.deltaY > 0 && pointer + 1 < formElements.numberOfElements) {
      showNextElement();
    } else if (
      event.deltaY < 0 &&
      pointer !== formElements.numberOfElements - 1 &&
      pointer - 1 >= 0
    ) {
      dispatch(formActions.decrementPointer());
    }
  };

  const keyDownHandler = (event) => {
    if (event.code === 'Enter' && pointer + 1 < formElements.numberOfElements) {
      showNextElement();
    }
  };

  return (
    <section
      onWheel={scrollHandler}
      onKeyDown={keyDownHandler}
      tabIndex={0}
      ref={sectionRef}
    >
      <CurrentElement showNextElement={showNextElement} />
    </section>
  );
};

export default FormWrapper;
