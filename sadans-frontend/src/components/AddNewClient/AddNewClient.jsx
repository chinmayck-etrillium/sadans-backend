import axios from "axios";
import { useState } from "react";
import "./AddNewClient.css";

export default function AddNewClient() {
  const [formData, setFormData] = useState();
  const [dbUpdated, setDbUpdated] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDbUpdated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3004/api/v1/client";
    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, formData, { headers: header });
      if (response.data == "Client added to database") {
        setDbUpdated("New Client Record Added!");
      }
      if (response.data == "Client with same name already exits!") {
        setDbUpdated("Client with same name already exits!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="client-details-form">
      <h3>Client Details</h3>
      <hr />
      <label>Name:</label>
      <input type="text" name="client_name" onChange={handleChange} />

      <label>Address</label>
      <input type="text" name="client_address" onChange={handleChange} />

      <label>Phone Number</label>
      <input
        type="tel"
        name="phone_number"
        placeholder="9446297682"
        pattern="[0-9]{10}"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Add Client</button>
      <hr />
      <br />
      {dbUpdated && <p>{dbUpdated}</p>}
    </div>
  );
}
