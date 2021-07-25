import { createSlice } from "@reduxjs/toolkit";

export const appReducer = createSlice({
     name: "app",
     initialState: {
          user: null,
          selectedImage: null,
     },
     reducers: {
          login: (state, action) => {
               state.user = action.payload;
          },
          logout: (state) => {
               state.user = null;
          },
          selectImage: (state, action) => {
               state.selectedImage = action.payload;
          },
          resetImage: (state) => {
               state.selectedImage = null;
          },
     },
});

export const { login, logout, selectImage, resetImage } = appReducer.actions;
export default appReducer.reducer;

export const selectUser = (state) => state.app.user;
export const selectSelectedImage = (state) => state.app.selectedImage;
