import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GetClientNameContext = createContext({
  getClientNames: () => {},
});

export default function GetClientNameContextProvider({ children }) {
  const getClientNames = async () => {
    try {
      const url = "http://localhost:3004/api/v1/client";
      const response = await axios.get(url);
      return response;
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <>
      <GetClientNameContext.Provider value={{ getClientNames }}>
        {children}
      </GetClientNameContext.Provider>
    </>
  );
}
