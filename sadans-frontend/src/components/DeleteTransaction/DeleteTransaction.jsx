import { useContext, useState } from "react";
import { DeleteTransactionFromTransactionIdContext } from "../../store/DeleteTransactionFromTransactionIdContext/DeleteTransactionFromTransactionIdContext";

export default function DeleteTransaction() {
  const { deleteFromTransactionId } = useContext(
    DeleteTransactionFromTransactionIdContext
  );
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setTransactionId(e.target.value);
    setStatus({ message: "", type: "" });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!transactionId) {
      setStatus({
        message: "Please enter a transaction ID",
        type: "error"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await deleteFromTransactionId(transactionId);
      setStatus({
        message: "Transaction deleted successfully!",
        type: "success"
      });
      setTransactionId("");
    } catch (error) {
      setStatus({
        message: "Failed to delete transaction. Please try again.",
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Delete Transaction
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Enter the transaction ID to delete
          </p>
        </div>

        <form onSubmit={handleClick} className="card-body">
          <div className="space-y-4">
            <div>
              <label htmlFor="transactionId" className="form-label">
                Transaction ID
              </label>
              <input
                type="number"
                id="transactionId"
                value={transactionId}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter transaction ID"
                min="1"
                required
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
                "Delete Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
