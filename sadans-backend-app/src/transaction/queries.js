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
const totalCredit = "SELECT SUM(amount) FROM transaction";
const highestCreditors = `WITH TopClients AS (
    SELECT c.client_id, c.client_name, SUM(t.amount) AS total_transaction
    FROM clients c
    JOIN transaction t ON c.client_id = t.client_id
    GROUP BY c.client_id, c.client_name
    ORDER BY total_transaction DESC
    LIMIT 3
)
SELECT tc.client_id, 
       tc.client_name, 
       tc.total_transaction, 
       MAX(t.created_at) AS latest_transaction_date
FROM TopClients tc
JOIN transaction t ON tc.client_id = t.client_id
GROUP BY tc.client_id, tc.client_name, tc.total_transaction
ORDER BY tc.total_transaction DESC;`;
const getTransactionsDetailById = `SELECT 
      c.client_name,
      t.amount,
	    t.notes,
	    t.created_at
	
FROM 
    "transaction" t
JOIN 
    clients c ON t.client_id = c.client_id
WHERE 
    t.id = $1;`;

//[POST]
const addTransactionByName =
  " INSERT INTO transaction(type,amount,client_id,notes,created_at) VALUES($1, $2, $3, $4, (SELECT now()))";

//[PUT]
const editAmountById = "UPDATE transaction SET amount = $1 WHERE id = $2";
const editTypeById = "UPDATE transaction SET type = $1 WHERE id = $2";
const editNotesById = "UPDATE transaction SET notes = $1 WHERE id = $2";
const editCreatedAtById =
  "UPDATE transaction SET created_at = $1 WHERE id = $2";

//[DELETE]
const deleteTransactionById = "DELETE FROM transaction WHERE id = $1";

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
  deleteTransactionById,
  totalCredit,
  highestCreditors,
  getTransactionsDetailById,
};
