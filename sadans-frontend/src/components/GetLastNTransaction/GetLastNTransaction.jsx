import { useContext, useEffect, useState } from "react";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";
import { GetClientIdFromNameContext } from "../../store/GetClientIdFromNameContext/GetClientIdFromNameContext";
import { GetLastNTransactionContext } from "../../store/GetLastNTransactionContext/GetLastNTransactionContext";
import "./GetLastNTransaction.css";

export default function GetLastNTransaction() {
  const { getClientNames } = useContext(GetClientNameContext);
  const { getClientIdFromName } = useContext(GetClientIdFromNameContext);
  const { getLastNTransaction } = useContext(GetLastNTransactionContext);
  const [clientName, setClientName] = useState();
  const [numberOfTransaction, setNumberOfTransaction] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const getClient = async () => {
      try {
        const response = await getClientNames();
        setClientName(response.data);
        setSelectedOption(response.data[0].client_name);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getClient();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChange = (e) => {
    setNumberOfTransaction(e.target.value);
  };

  const handleClick = async (e) => {
    if (!numberOfTransaction) {
      setErrorMessage(true);
    } else [setErrorMessage(false)];
    try {
      const response = await getClientIdFromName(selectedOption);
      const id = response.data[0].client_id;
      const nTransactionResponse = await getLastNTransaction(
        id,
        numberOfTransaction
      );
      setData(nTransactionResponse.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="get-transaction-details">
      <label>Client Name:</label>
      {clientName && (
        <select name="name" onChange={handleOptionChange}>
          {clientName.map((name, index) => (
            <option value={name.client_name} key={index}>
              {name.client_name}
            </option>
          ))}
        </select>
      )}
      <label>Number of Transactions to Retrieve</label>
      <input
        className="transaction-number"
        type="number"
        name="number"
        onChange={handleChange}
      />
      {errorMessage && (
        <p className="enter-transaction-number">
          Please enter the number of transaction you want to retrieve
        </p>
      )}
      <button className="transaction-search-btn" onClick={handleClick}>
        Search!
      </button>
      <br />
      <br />
      <hr />
      {data && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
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
      )}
    </div>
  );
}
