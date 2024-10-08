import React, { useContext, useEffect, useState } from "react";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";

function Test() {
  const [clientName, setClientName] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const { getClientNames } = useContext(GetClientNameContext);

  // Fetch clients from backend on component mount
  useEffect(() => {
    const getNamesFromContext = async () => {
      const clientNamess = await getClientNames();
      console.log(clientNamess)
      setClientName(clientNamess.data);
    };
    getNamesFromContext();
  }, []);

  // Update filtered clients when search input changes
  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredClients([]);
    } else {
      const filtered = clientName.filter((client) =>
        client.client_name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }, [searchInput, clientName]);


  return (
    <>
      {clientName && (
        <div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search clients..."
          />
          <ul>
            {filteredClients.map((client, index) => (
              <li key={index}>{client.client_name}</li>
            ))}
          </ul>
        </div>
      )}
     
    </>
  );
}

export default Test;
