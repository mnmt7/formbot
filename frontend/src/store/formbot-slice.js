import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFormbot } from "../api/formbot";

export const fetchFormbotAsync = createAsyncThunk(
  "formbot/fetch",
  async (id) => {
    const response = await fetchFormbot(id);
    return response.data;
  }
);

const initialState = {
  formbot: null,
  status: "idle",
  error: null,
};

const formbotSlice = createSlice({
  name: "formbot",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchFormbotAsync.fulfilled, (state, action) => {
      state.formbot = action.payload.data;
    });
  },
});

export const formbotActions = formbotSlice.actions;

export const selectFormbot = (state) => state.formbot.formbot;

export default formbotSlice;
