import axios from "axios";
import { useState, useRef, useContext, useEffect } from "react";
import "./GetTransactionDetails.css";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";

export default function GetTransactionDetails() {
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [name, setName] = useState();
  const [clientName, setClientName] = useState();
  const { getClientNames } = useContext(GetClientNameContext);

  useEffect(() => {
    const getNamesFromContext = async () => {
      const clientNamess = await getClientNames();
      setClientName(clientNamess.data);
      setName(clientNamess.data[0].client_name);
    };
    getNamesFromContext();
  }, []);

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
      <label>Client Name:</label>
      {clientName && (
        <select onChange={handleChange}>
          {clientName.map((name, index) => (
            <option value={name.client_name} key={index}>
              {name.client_name}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleClick}>Search!</button>
      <br />
      <br />
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
