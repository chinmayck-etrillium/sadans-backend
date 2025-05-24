import { useContext, useEffect, useRef, useState } from "react";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";
import { GetClientIdFromNameContext } from "../../store/GetClientIdFromNameContext/GetClientIdFromNameContext";
import { GetLastNTransactionContext } from "../../store/GetLastNTransactionContext/GetLastNTransactionContext";

export default function GetTransactionDetails() {
  const { getClientNames } = useContext(GetClientNameContext);
  const { getClientIdFromName } = useContext(GetClientIdFromNameContext);
  const { getLastNTransaction } = useContext(GetLastNTransactionContext);

  const [clientName, setClientName] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [numberOfTransactions, setNumberOfTransactions] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const focusRef = useRef(null);
  let amount = 0;

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
    console.log("Search Input:", clicked);
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

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setSearchInput(client.client_name);
    setFilteredClients([]);
    setClicked(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedClient) {
      setError("Please select a client and enter number of transactions");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await getClientIdFromName(selectedClient.client_name);
      const id = response.data[0].client_id;

      const transactionsResponse = await getLastNTransaction(
        id,
        numberOfTransactions || 100
      );
      setTransactions(transactionsResponse.data);
    } catch (error) {
      setError("Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };
  if (transactions.length > 0) {
    for (let i = 0; i < transactions.length; i++) {
      amount = amount + parseFloat(transactions[i].amount);
    }
    console.log("Amount: ", amount);
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Transaction History
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            View transaction details for a specific client
          </p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

              {/* Number of Transactions */}
              <div>
                <label htmlFor="num_transactions" className="form-label">
                  Number of Transactions
                </label>
                <input
                  type="number"
                  id="num_transactions"
                  value={numberOfTransactions}
                  onChange={(e) => setNumberOfTransactions(e.target.value)}
                  className="form-input"
                  placeholder="Enter number"
                  min="1"
                />
              </div>
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

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`btn-primary w-full ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Searching...
                  </span>
                ) : (
                  "Search Transactions"
                )}
              </button>
            </div>
          </form>

          {/* Transactions Table */}
          {transactions.length > 0 && (
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <div className="table-container">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Notes
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {transaction.id}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span
                                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                    transaction.type.toLowerCase() === "credit"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {transaction.type}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                ₹{transaction.amount}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {transaction.notes}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {new Date(
                                  transaction.created_at
                                ).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Total Amount Display */}
          {amount !== 0 && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
              {amount > 0 && (
                <h4 className="text-lg font-bold text-gray-800">
                  Total Receivable:&nbsp;
                  <span className="font-bold text-green-600">₹{amount}</span>
                </h4>
              )}
              {amount < 0 && (
                <h4 className="text-lg font-bold text-gray-800">
                  Total Payable:&nbsp;
                  <span className="font-bold text-red-600">₹{amount}</span>
                </h4>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
