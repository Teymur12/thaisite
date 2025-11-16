import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: 'az', // Default dil
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
    // localStorage-dən dili yükləyirik
    initLanguage: (state) => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('language');
        if (saved) {
          state.current = saved;
        }
      }
    },
  },
});

export const { setLanguage, initLanguage } = languageSlice.actions;
export default languageSlice.reducer;