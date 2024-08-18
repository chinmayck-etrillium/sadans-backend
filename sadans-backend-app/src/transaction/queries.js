const getAllTransactions = "SELECT * FROM transaction";
const getTransactionsIdByName =
  "SELECT client_id FROM clients WHERE client_name = $1 ";
const getTransactionsByName =
  "SELECT type,amount,notes FROM transaction WHERE transaction.client_id =$1 ";
const totalRemainingCredit =
  "SELECT SUM(amount) FROM transaction WHERE transaction.client_id =$1 ";

module.exports = {
  getAllTransactions,
  getTransactionsIdByName,
  getTransactionsByName,
  totalRemainingCredit,
};
