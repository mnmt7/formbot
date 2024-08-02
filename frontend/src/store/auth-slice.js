import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuth, login, register, updatePassword } from "../api/auth";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginAsync = createAsyncThunk("auth/login", async (data) => {
  const response = await login(data);
  return response.data;
});

export const registerAsync = createAsyncThunk("auth/register", async (data) => {
  const response = await register(data);
  return response.data;
});

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return;
});

export const checkAuthAsync = createAsyncThunk("auth/check", async () => {
  const response = await checkAuth();
  return response.data;
});

export const updatePasswordAsync = createAsyncThunk(
  "auth/updatePassword",
  async (data) => {
    const response = await updatePassword(data);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.data;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(registerAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.data;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.data;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(updatePasswordAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.data;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const authActions = authSlice.actions;

export default authSlice;
