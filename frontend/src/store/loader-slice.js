import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoaderVisible: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader(state) {
      state.isLoaderVisible = true;
    },
    hideLoader(state) {
      state.isLoaderVisible = false;
    },
  },
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice;

export const selectIsLoaderVisible = (state) => state.loader.isLoaderVisible;
