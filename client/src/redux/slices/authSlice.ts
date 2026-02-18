import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/apiTypes";

interface AuthState {
  user: User | null,
  token: string | null,
  isAuthenticated: boolean
}

const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  token: token,
  isAuthenticated: !!token
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    }
  }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;