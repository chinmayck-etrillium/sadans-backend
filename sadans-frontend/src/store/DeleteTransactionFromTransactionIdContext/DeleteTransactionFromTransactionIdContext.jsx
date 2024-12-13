import axios from "axios";
import { createContext } from "react";

export const DeleteTransactionFromTransactionIdContext = createContext({
  deleteFromTransactionId: () => {},
});

export default function DeleteTransactionFromTransactionIdContextProvider({
  children,
}) {
  const deleteFromTransactionId = async (id) => {
    const url = `http://localhost:3004/api/v1/transactions/${id}`;
    try {
      const response = await axios.delete(url, { withCredentials: true });
      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <DeleteTransactionFromTransactionIdContext.Provider
      value={{ deleteFromTransactionId }}
    >
      {children}
    </DeleteTransactionFromTransactionIdContext.Provider>
  );
}
