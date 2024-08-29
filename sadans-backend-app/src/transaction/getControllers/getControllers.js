const pool = require("../../../db");
const queries = require("../queries");

const getAllTransactions = (req, res) => {
  pool.query(queries.getAllTransactions, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (results.rows.length === 0) {
      return res.status(404).json({ message: "Transaction not found!" });
    } else {
      return res.status(200).json(results.rows);
    }
  });
};

const getTransactionsByName = (req, res) => {
  const name = req.params.name;
  pool.query(queries.getTransactionsIdByName, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (results.rows.length === 0) {
      return res.status(404).json({ message: "Transactions not found!" });
    } else {
      const id = results.rows[0].client_id;
      pool.query(queries.getTransactionsByName, [id], (error, results) => {
        if (error) {
          console.error("Error: ", error);
          return res.status(500).json({ message: "Internal server error" });
        } else {
          return res.status(200).json(results.rows);
        }
      });
    }
  });
};

const totalRemainingCredit = (req, res) => {
  const name = req.params.name;
  pool.query(queries.getTransactionsIdByName, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (results.rows.length === 0) {
      return res.status(404).json({ message: "Transactions not found!" });
    } else {
      const id = results.rows[0].client_id;
      pool.query(queries.totalRemainingCredit, [id], (error, results) => {
        if (error) {
          console.error("Error: ", error);
        } else {
          return res.status(200).send(results.rows[0].sum);
        }
      });
    }
  });
};

const showLastNTransaction = (req, res) => {
  const id = parseInt(req.params.id);
  const limit = req.params.limit;
  pool.query(queries.showLastNTransaction, [id, limit], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (results.rows.length === 0) {
      return res.status(404).json({ message: "Transactions not found!" });
    } else {
      return res.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getAllTransactions,
  getTransactionsByName,
  totalRemainingCredit,
  showLastNTransaction,
};
