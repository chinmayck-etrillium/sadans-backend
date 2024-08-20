const getAllTransactions = "SELECT * FROM transaction";
const getTransactionsIdByName =
  "SELECT client_id FROM clients WHERE client_name = $1 ";
const getTransactionsByName =
  "SELECT type,amount,notes FROM transaction WHERE transaction.client_id =$1 ";
const totalRemainingCredit =
  "SELECT SUM(amount) FROM transaction WHERE transaction.client_id =$1 ";
const showLastNTransaction =
  " SELECT * FROM transaction WHERE client_id = $1 ORDER BY created_at DESC LIMIT $2";

module.exports = {
  getAllTransactions,
  getTransactionsIdByName,
  getTransactionsByName,
  totalRemainingCredit,
  showLastNTransaction,
};
