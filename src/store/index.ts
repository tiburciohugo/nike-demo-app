import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productsSlice } from "./productsSlice";
import { cartSlice } from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
