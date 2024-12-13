import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./Transaction";

const store = configureStore({
  reducer: {
    transaction: transactionSlice.reducer,
  },
});

export default store;
