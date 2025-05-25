import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";
import { formatCredit, formatDate } from "../../util/util";

export default function GetCompleteClientDetails() {
  const { getClientNames } = useContext(GetClientNameContext);
  const [clientName, setClientName] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const focusRef = useRef(null);
  const [netAmount, setNetAmount] = useState(0);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClientNames();
        setClientName(response.data);
      } catch (error) {
        setError("Failed to fetch clients");
      }
    };
    fetchClients();
  }, [getClientNames]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredClients([]);
    } else if (!clicked) {
      const filtered = clientName.filter((client) =>
        client.client_name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredClients(filtered);
    }
    setClicked(false);
  }, [searchInput, clientName]);

  useEffect(() => {
    const getClientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/api/v1/client/details/${selectedClient}`,
          { withCredentials: true }
        );
        const responseData = response.data;
        setClientDetails(responseData.reverse());
      } catch (error) {
        setError("Failed to fetch client details");
      } finally {
        setIsLoading(false);
      }
    };

    if (clicked) {
      getClientDetails();
    }
  }, [clicked]);

  useEffect(() => {
    const getNetAmount = () => {
      if (clientDetails.length > 0) {
        let amt = 0;
        for (let i = 0; i < clientDetails.length; i++) {
          amt += parseInt(clientDetails[i].amount);
        }
        setNetAmount(amt);
      }
    };
    if (clientDetails) {
      getNetAmount();
    }
  }, [clientDetails]);

  const handleClientClick = async (client) => {
    setSelectedClient(client.client_name);
    setSearchInput(client.client_name);
    setFilteredClients([]);
    setClicked(true);
    setIsLoading(true);
    setError("");
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="card-header">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Client Details
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            View complete details for a specific client
          </p>
        </div>

        <div className="card-body">
          <div className="space-y-6">
            {/* Client Search */}
            <div className="relative">
              <label htmlFor="client_search" className="form-label">
                Client Name
              </label>
              <input
                type="text"
                id="client_search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-input"
                placeholder="Search clients..."
                autoComplete="off"
                ref={focusRef}
              />
              {filteredClients.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {filteredClients.map((client, index) => (
                    <li
                      key={index}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-50"
                      onClick={() => handleClientClick(client)}
                    >
                      <span className="block truncate">
                        {client.client_name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-center items-center py-4">
                <svg
                  className="animate-spin h-8 w-8 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}

            {/* Client Details and Transactions Table */}
            {clientDetails && (
              <div className="mt-8">
                {/* Client Info Card */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Client Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">
                        {clientDetails[0].client_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Client ID</p>
                      <p className="font-medium">
                        {clientDetails[0].client_id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">
                        {clientDetails[0].client_address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Mobile</p>
                      <p className="font-medium">
                        {clientDetails[0].phone_number}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Transaction History
                    </h4>
                  </div>
                  <div className="overflow-x-auto">
                    <div
                      className="table-container"
                      style={{ maxHeight: "500px", overflowY: "auto" }}
                    >
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Notes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {clientDetails.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatCredit(transaction.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.notes || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(transaction.created_at)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Net Amount Display */}
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
                  {netAmount > 0 && (
                    <h4 className="text-lg font-bold text-gray-800">
                      Total Receivable:&nbsp;
                      <span className="font-bold text-green-600">
                        {formatCredit(netAmount)}
                      </span>
                    </h4>
                  )}
                  {netAmount < 0 && (
                    <h4 className="text-lg font-bold text-gray-800">
                      Total Payable:&nbsp;
                      <span className="font-bold text-red-600">
                        {formatCredit(netAmount)}
                      </span>
                    </h4>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
