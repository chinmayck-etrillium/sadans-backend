import { useState } from "react";
import "./NewTransaction.css";
import axios from "axios";

export default function NewTransaction() {
  const [formData, setFormData] = useState({ type: "Credit" });

  const handleOptionChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3004/api/v1/transactions/${formData.name}`;
      const header = { "Content-Type": "application/json" };
      const response = await axios.post(
        url,
        formData, // Sending formData directly
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );
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
        <label>Name </label>
        <input type="text" name="name" onChange={handleOptionChange} />
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
