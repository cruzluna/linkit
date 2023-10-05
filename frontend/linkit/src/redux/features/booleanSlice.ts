// import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  booleanValue: false,
};

// Create a slice
const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    // Action to toggle the boolean value
    toggleBoolean: (state) => {
      state.booleanValue = !state.booleanValue;
    },
    // Action to set the boolean value to a specific value
    setBoolean: (state, action) => {
      state.booleanValue = action.payload;
    },
  },
});

// Export actions
export const { toggleBoolean, setBoolean } = booleanSlice.actions;

// Export the reducer
export default booleanSlice.reducer;
