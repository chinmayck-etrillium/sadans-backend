import axios from "axios";
import { useState, useRef } from "react";
import "./GetTransactionDetails.css";

export default function GetTransactionDetails() {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [name, setName] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3004/api/v1/transactions/${name}`
      );
      console.log(response.data);
      setTransactionDetails(response.data);
    } catch (err) {
      setTransactionDetails(null);
      console.error(err);
    }
  };
  return (
    <div className="get-transaction-details">
      <label >Name:</label>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Search!</button>
      <hr />
      {transactionDetails && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Notes</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {transactionDetails.map((row, index) => (
                <tr key={index}>
                  <td>{row.type}</td>
                  <td>{row.amount}</td>
                  <td>{row.notes}</td>
                  <td>
                    {new Date(row.created_at).toLocaleString("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
