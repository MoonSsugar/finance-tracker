import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/apiTypes";

interface AuthState {
  user: Omit<User, "password" | "name" | "transactions"> | null,
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
    setCredentials: (
      state, 
      { 
        payload: { user, token },
      }: PayloadAction<{ user: Omit<User, "password" | "name" | "transactions">, token: string }>
    ) => {
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;