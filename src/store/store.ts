import { configureStore, createReducer } from "@reduxjs/toolkit";
import cardReducer from "./reducers/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
