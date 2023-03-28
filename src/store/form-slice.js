import { createSlice } from '@reduxjs/toolkit';

let formValidity = [true];

for (let i = 1; i < 9; i++) {
  formValidity.push(false);
}

let formData = {
  firstName: '',
  lastName: '',
};

const initialFormState = {
  pointer: 0,
  progress: 0,
  formValidity,
  errorMessage: null,
  formData,
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    incrementPointer(state) {
      state.pointer++;
    },
    decrementPointer(state) {
      state.pointer--;
    },
    incrementProgress(state) {
      state.progress += 100;
    },
    decrementProgress(state) {
      state.progress -= 100;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
