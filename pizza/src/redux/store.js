import {configureStore} from "@reduxjs/toolkit";
import filter from "./slises/filterSlise";

export const store = configureStore({
  reducer:{
    filter,
  },
});
