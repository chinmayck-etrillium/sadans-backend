import axios from "axios";
import { createContext } from "react";

export const GetClientIdFromNameContext = createContext({
  getClientIdFromName: () => {},
});

export default function GetClientIdFromNameContextProvider({ children }) {
  const getClientIdFromName = async (clientName) => {
    console.log("SF");
    const url = `http://localhost:3004/api/v1/client/${clientName}`;
    try {
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <GetClientIdFromNameContext.Provider value={{ getClientIdFromName }}>
      {children}
    </GetClientIdFromNameContext.Provider>
  );
}
