import { useState, useContext, useEffect } from "react";
import "./NewTransaction.css";
import axios from "axios";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";

export default function NewTransaction() {
  const [formData, setFormData] = useState({ type: "Credit" });
  const [clientName, setClientName] = useState();
  const { getClientNames } = useContext(GetClientNameContext);

  useEffect(() => {
    const getNamesFromContext = async () => {
      const clientNamess = await getClientNames();
      setClientName(clientNamess.data);
      setFormData((prev) => ({
        ...prev,
        name: clientNamess.data[0].client_name,
      }));
    };
    getNamesFromContext();
  }, []);

  const handleOptionChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3004/api/v1/transactions/${formData.name}`;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log("Error :", err);
    }
  };

  console.log(formData);
  return (
    <div className="transaction-form">
      <form onSubmit={handleSubmit}>
        <h3>New Transaction</h3>
        <hr />
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
        <label>Type of transaction</label>
        <select name="type" onChange={handleOptionChange}>
          <option value="Credit">Credit</option>
          <option value="Repayment">Repayment</option>\
          <option value="Personal">Personal</option>
          <option value="Salary">Salary</option>
          <option value="Misc.">Misc.</option>
          <option value="Other">Other</option>
        </select>
        <label>Amount </label>
        <input type="number" name="amount" onChange={handleOptionChange} />
        <label>Notes </label>
        <input type="text" name="notes" onChange={handleOptionChange} />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}
