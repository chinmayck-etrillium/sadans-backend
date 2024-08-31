import { useContext, useState } from "react";
import { DeleteTransactionFromTransactionIdContext } from "../../store/DeleteTransactionFromTransactionIdContext/DeleteTransactionFromTransactionIdContext";
import "./DeleteTransaction.css";

export default function DeleteTransaction() {
  const { deleteFromTransactionId } = useContext(
    DeleteTransactionFromTransactionIdContext
  );
  const [transactionId, setTransactionId] = useState();
  const [data, setData] = useState();

  const handleChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await deleteFromTransactionId(transactionId);
      setData(response.data);
    } catch (error) {}
  };
  return (
    <div className="delete-transaction-main-container">
      <div className="label-container">
        <label>Enter transaction id:</label>
        <input type="number" onChange={handleChange} />
      </div>

      <button onClick={handleClick}>Delete!</button>
      {data && (
        <p className="transaction-deleted-message">Transaction deleted!</p>
      )}
    </div>
  );
}
