import {configureStore} from "@reduxjs/toolkit";
import filter from "./slises/filterSlise";
import cart from "./slises/cartSlice";

export const store = configureStore({
  reducer:{
    filter,
    cart
  },
});
