import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import formbotSlice from "./formbot-slice";
import folderSlice from "./folder-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    formbot: formbotSlice.reducer,
    folder: folderSlice.reducer,
  },
});

export default store;
