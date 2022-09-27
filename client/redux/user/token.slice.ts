import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToken } from "../../models/token.model";
import { RootState } from "../store";

export interface ITokenState {
  token: any;
}
const initialState: ITokenState = {
  token: "",
};

export const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
  },
});
export const { getToken, removeToken } = authSlice.actions;
export const myToken = (state: RootState) => state.token.token;
export default authSlice.reducer;
