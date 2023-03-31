import { createSlice } from '@reduxjs/toolkit';

let formValidity = [true];

for (let i = 1; i < 9; i++) {
  formValidity.push(false);
}

let formData = {
  firstName: '',
  lastName: '',
  industry: '',
  role: '',
  professionalGoal: [],
  emailAddress: '',
  phoneNumber: '',
  phoneExtension: '+91',
};

const initialFormState = {
  pointer: 0,
  progress: 0,
  formValidity,
  errorMessage: null,
  formData,
  scrollDirection: 1, // 1 ==> DOWN, -1 ==> UP
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    incrementPointer(state) {
      state.pointer++;
      state.scrollDirection = 1;
    },
    decrementPointer(state) {
      state.pointer--;
      state.scrollDirection = -1;
    },
    incrementProgress(state) {
      state.progress += 100;
    },
    decrementProgress(state) {
      state.progress -= 100;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    setElementValidity(state, action) {
      state.formValidity[action.payload.pointer] = action.payload.isValid;
    },
    setFormData(state, action) {
      console.log(action);
      if ('goal' in action.payload) {
        console.log('Goals handler');
        if (action.payload.operation === 'PUSH') {
          state.formData.professionalGoal.push(action.payload.goal);
        } else if (action.payload.operation === 'POP') {
          state.formData.professionalGoal =
            state.formData.professionalGoal.filter(
              (existingGoal) => existingGoal !== action.payload.goal
            );
        }
      } else {
        state.formData = { ...state.formData, ...action.payload };
      }
    },

    resetProgress(state) {
      state.progress = 0;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice.reducer;
