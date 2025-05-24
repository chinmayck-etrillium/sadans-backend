import axios from "axios";
import { useState } from "react";

export default function DeleteModal({ transactionId }) {
  const [details, setDetails] = useState({});
  const [checked, setChecked] = useState(false);
  const getTransactionDetails = async () => {
    const response = await axios.get(
      `http://localhost:3004/api/v1/transactions/detail/${transactionId}`,
      { withCredentials: true }
    );
    setChecked(true);
    if (response.data.length > 0) {
      setDetails(response.data[0]);
    }
  };
  if (transactionId > 0 && checked === false) {
    getTransactionDetails();
  }
  return (
    <>
      {Object.keys(details).length > 0 && (
        <div>
          <p>Are you sure you want to delete?</p>
          <br />
          <span>Name: {details.client_name}</span>
          <br />
          <span>Amount: {details.amount}</span>
          <br />
          <span>Notes: {details.notes || "NA"}</span>
        </div>
      )}
      {Object.keys(details).length < 1 && (
        <p>No data available for the selected transaction id!</p>
      )}
    </>
  );
}
