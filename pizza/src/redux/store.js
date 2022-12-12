import {configureStore} from "@reduxjs/toolkit";
import filter from "./slises/filterSlise";
import cart from "./slises/cartSlice";
import pizza from './slises/pizzaSlice'

export const store = configureStore({
  reducer:{
    filter,
    cart,
    pizza,
  },
});
