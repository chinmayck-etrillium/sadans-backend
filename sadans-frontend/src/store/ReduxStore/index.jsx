import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./Transaction";
import clientSlice from "./Clients";

const store = configureStore({
  reducer: {
    transaction: transactionSlice.reducer,
    clients: clientSlice.reducer,
  },
});

export default store;
