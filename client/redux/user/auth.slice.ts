import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user.model";
import { RootState } from "../store";

export interface IAuthState {
  user: any;
  loggedIn: boolean;
  isAdmin: boolean;
}

const initialState: IAuthState = {
  user: null,
  loggedIn: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
    userInfoByRefToken: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loggedIn = true;
      state.isAdmin = action.payload.role === 1 ? true : false;
    },
  },
});

export const { loginUser, logoutUser, userInfoByRefToken } = authSlice.actions;

export const loggedIn = (state: RootState) => state.auth.loggedIn;
export const enteranceUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
