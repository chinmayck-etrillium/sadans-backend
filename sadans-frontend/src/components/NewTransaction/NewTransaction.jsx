import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GetClientNameContext } from "../../store/GetClientNameContext/GetClientNameContext";

export default function NewTransaction() {
  const [formData, setFormData] = useState({ type: "Credit" });
  const [clientName, setClientName] = useState();
  const { getClientNames } = useContext(GetClientNameContext);
  const [status, setStatus] = useState({ message: "", type: "" });
  const [searchInput, setSearchInput] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [flag, setFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
        const filtered = clientName?.filter((client) =>
          client.client_name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredClients(filtered || []);
      }
    }
  }, [searchInput, clientName, flag]);

  const handleNameChange = (event) => {
    setSearchInput(event.target.value);
    setFlag(true);
  };

  const handleClientClick = (client) => {
    setFormData((prev) => ({ ...prev, name: client.client_name }));
    setSearchInput(client.client_name);
    setFlag(false);
    setFilteredClients([]);
  };

  const handleOptionChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const url = `http://localhost:3004/api/v1/transactions/${formData.name}`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatus({
        message: "Transaction added successfully!",
        type: "success"
      });
      // Reset form
      setFormData({ type: "Credit", name: formData.name });
      e.target.reset();
    } catch (err) {
      console.log("Error :", err);
      setStatus({
        message: "Failed to add transaction. Please try again.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            New Transaction
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Add a new transaction record
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-body">
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
                onChange={handleNameChange}
                className="form-input"
                placeholder="Search clients..."
                autoComplete="off"
              />
              {filteredClients.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {filteredClients.map((client, index) => (
                    <li
                      key={index}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-50"
                      onClick={() => handleClientClick(client)}
                    >
                      <span className="block truncate">{client.client_name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Transaction Type */}
            <div>
              <label htmlFor="type" className="form-label">
                Transaction Type
              </label>
              <select
                id="type"
                name="type"
                onChange={handleOptionChange}
                className="form-input"
                defaultValue="Credit"
              >
                <option value="Credit">Credit</option>
                <option value="Repayment">Repayment</option>
                <option value="Personal">Personal</option>
                <option value="Salary">Salary</option>
                <option value="Misc.">Misc.</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={handleOptionChange}
                className="form-input"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                onChange={handleOptionChange}
                className="form-input"
                placeholder="Add any additional notes..."
              />
            </div>

            {status.message && (
              <div
                className={`p-4 rounded-md ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <p className="text-sm font-medium">{status.message}</p>
              </div>
            )}

            <div className="pt-4">
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
                    Processing...
                  </span>
                ) : (
                  "Add Transaction"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
