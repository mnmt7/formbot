import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import formbotSlice from "./formbot-slice";
import folderSlice from "./folder-slice";
import loaderSlice from "./loader-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    formbot: formbotSlice.reducer,
    folder: folderSlice.reducer,
    loader: loaderSlice.reducer,
  },
});

export default store;
