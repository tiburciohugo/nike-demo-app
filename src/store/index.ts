import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productsSlice } from "./productsSlice";
import { cartSlice } from "./cartSlice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
