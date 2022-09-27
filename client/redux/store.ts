import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./user/auth.slice";
import tokenReducer from "./user/token.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
