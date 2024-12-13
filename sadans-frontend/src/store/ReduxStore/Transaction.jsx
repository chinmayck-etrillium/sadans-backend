import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const transactionInitialState = {
  sum: 0,
};

const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState: transactionInitialState,
  reducers: {
    setTotalCredit(state, action) {
      state.sum = action.payload;
    },
  },
});

export const getTotalCredit = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3004/api/v1/transactions/total/credit", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(transactionActions.setTotalCredit(response.data[0].sum));
      })
      .catch((error) => {
        console.error("Error fetching total credit:", error);
      });
  };
};

export const transactionActions = transactionSlice.actions;
export default transactionSlice;
