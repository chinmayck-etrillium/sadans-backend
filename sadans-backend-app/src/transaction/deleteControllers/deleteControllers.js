const pool = require("../../../db");
const queries = require("../queries");

const deleteTransactionById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.deleteTransactionById, [id], (error, results) => {
    if (error) {
      return res.status(500).send("Internal server error!");
    } else {
      if (results.rowCount > 0) {
        return res.status(200).send("Transaction deleted successfully");
      } else {
        return res.status(404).send("Transaction not found!");
      }
    }
  });
};

module.exports = {
  deleteTransactionById,
};
