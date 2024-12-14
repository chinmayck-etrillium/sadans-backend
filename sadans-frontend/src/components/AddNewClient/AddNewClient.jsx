import axios from "axios";
import { useState } from "react";

export default function AddNewClient() {
  const [formData, setFormData] = useState({
    client_name: "",
    client_address: "",
    phone_number: "",
  });
  const [dbUpdated, setDbUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setDbUpdated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const url = "http://localhost:3004/api/v1/client";
    const header = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, formData, {
        headers: header,
        withCredentials: true,
      });
      if (response.data === "Client added to database") {
        setDbUpdated("New Client Record Added!");
        setFormData({ client_name: "", client_address: "", phone_number: "" });
      }
      if (response.data === "Client with same name already exits!") {
        setDbUpdated("Client with same name already exists!");
      }
    } catch (error) {
      console.log("Error: ", error);
      setDbUpdated("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Add New Client
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Enter the client's details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-body space-y-6">
          <div>
            <label htmlFor="client_name" className="form-label">
              Client Name
            </label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="client_address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="client_address"
              name="client_address"
              value={formData.client_address}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="9446297682"
              pattern="[0-9]{10}"
              className="form-input"
              required
            />
          </div>

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
                "Add Client"
              )}
            </button>
          </div>

          {dbUpdated && (
            <div
              className={`mt-4 p-4 rounded-md ${
                dbUpdated.includes("error")
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              <p className="text-sm font-medium">{dbUpdated}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
