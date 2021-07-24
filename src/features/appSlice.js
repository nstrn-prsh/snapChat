import { createSlice } from "@reduxjs/toolkit";

export const appReducer = createSlice({
     name: "app",
     initialState: {value:0},
     reducers: {
          incrementByAmount: (state, action) => {
               state.value += action.payload;
          },
     },
});

export const { incrementByAmount } = appReducer.actions;
export default appReducer.reducer;

export const selectApp = (state) => state.app.value;
