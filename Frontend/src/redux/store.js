// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import contactReducer from "./slices/contactSlice";
import devisReducer from "./slices/devisSlice"



export const store = configureStore({
  reducer: {
    admin: adminReducer,
    contact: contactReducer,
    devis: devisReducer,
  },
});
