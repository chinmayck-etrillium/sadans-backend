import { useState, useContext, useEffect } from "react";
import "./NewTransaction.css";
import axios from "axios";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";

export default function NewTransaction() {
  const [formData, setFormData] = useState({ type: "Credit" });
  const [clientName, setClientName] = useState();
  const { getClientNames } = useContext(GetClientNameContext);
  const [dbUpdated, setDbUpdated] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [flag, setFlag] = useState(true);


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

  useEffect(() => {
    if (flag) {
      if (searchInput.trim() === "") {
        setFilteredClients([]);
      } else {
        const filtered = clientName.filter((client) =>
          client.client_name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredClients(filtered);
      }
    }
  }, [searchInput, clientName]);

  const handleNameChange = (event) => {
    setSearchInput(event.target.value);
    setFlag(true);
  };

   const handleClientClick = (e,client) => {
    setFormData((prev) => ({ ...prev, ['name']: client.client_name }));
    setSearchInput(client.client_name);
    console.log(filteredClients)
    setFlag(false);
    setFilteredClients([]);
  };


  const handleOptionChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDbUpdated(false);
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
      setDbUpdated(true);
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
        <div className="search-client">
          <input
            type="text"
            value={searchInput}
            onChange={handleNameChange}
            placeholder="Search clients..."
          />
          {filteredClients.length > 0 && (
            <ul className="filtered-clients-ul">
              {filteredClients.map((client, index) => (
          
                <li className="filtered-clients-list"
                  key={index}
                  onClick={(e) => handleClientClick(e,client)}
                  style={{ cursor: "pointer" }}
                >
                  {client.client_name}
                </li>
              ))}
            </ul>
          )}
        </div>
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
      <br />
      {dbUpdated && (
        <p className="transaction-status">New Transaction Record Added!</p>
      )}
    </div>
  );
}
