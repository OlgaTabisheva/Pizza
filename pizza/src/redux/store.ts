import {configureStore} from "@reduxjs/toolkit";
import filter from "./slises/filterSlise";
import cart from "./slises/cartSlice";
import pizza from './slises/pizzaSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer:{
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
