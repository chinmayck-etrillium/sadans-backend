import axios from "axios";
import { createContext } from "react";

export const GetLastNTransactionContext = createContext({
  getLastNTransaction: () => {},
});

export default function GetLastNTransactionContextProvider({ children }) {
  const getLastNTransaction = async (id, limit) => {
    console.log(id, limit);
    const url = `http://localhost:3004/api/v1/transactions/${id}/limit/${limit}`;
    try {
      const response = await axios.get(url,{ withCredentials: true });
      return response;
    } catch (error) {}
  };

  return (
    <GetLastNTransactionContext.Provider value={{ getLastNTransaction }}>
      {children}
    </GetLastNTransactionContext.Provider>
  );
}
