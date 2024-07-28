import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import formbotSlice from "./formbot-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    formbot: formbotSlice.reducer,
  },
});

export default store;
