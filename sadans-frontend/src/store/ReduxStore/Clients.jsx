import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const clientInitialState = {
  totalClients: null,
};

const clientSlice = createSlice({
  name: "clientSlice",
  initialState: clientInitialState,
  reducers: {
    setTotalClients(state, action) {
      state.totalClients = action.payload;
    },
  },
});

export const getTotalClients = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3004/api/v1/client/total/clients",
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        dispatch(clientAction.setTotalClients(response.data[0]));
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
};

export const clientAction = clientSlice.actions;
export default clientSlice;
