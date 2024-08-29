//[GET]
const getAllTransactions = "SELECT * FROM transaction";
const getTransactionsIdByName =
  "SELECT client_id FROM clients WHERE client_name = $1 ";
const getTransactionsByName =
  "SELECT type,amount,notes,created_at FROM transaction WHERE transaction.client_id =$1 ";
const totalRemainingCredit =
  "SELECT SUM(amount) FROM transaction WHERE transaction.client_id =$1 ";
const showLastNTransaction =
  "SELECT * FROM transaction WHERE client_id = $1 ORDER BY created_at DESC LIMIT $2";

//[POST]
const addTransactionByName =
  " INSERT INTO transaction(type,amount,client_id,notes,created_at) VALUES($1, $2, $3, $4, (SELECT now()))";

//[PUT]
const editAmountById = "UPDATE transaction SET amount = $1 WHERE id = $2";
const editTypeById = "UPDATE transaction SET type = $1 WHERE id = $2";
const editNotesById = "UPDATE transaction SET notes = $1 WHERE id = $2";
const editCreatedAtById =
  "UPDATE transaction SET created_at = $1 WHERE id = $2";

module.exports = {
  getAllTransactions,
  getTransactionsIdByName,
  getTransactionsByName,
  totalRemainingCredit,
  showLastNTransaction,
  addTransactionByName,
  editAmountById,
  editCreatedAtById,
  editNotesById,
  editTypeById,
};
