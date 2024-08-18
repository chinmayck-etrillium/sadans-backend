const pool = require("../../db");
const queries = require("./queries");

const getAllTransactions = (req, res) => {
  pool.query(queries.getAllTransactions, (error, results) => {
    if (error) {
      console.error("Error: ", error);
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getTransactionsByName = (req, res) => {
  const name = req.params.name;
  pool.query(queries.getTransactionsIdByName, [name], (error, results) => {
    if (error) {
      console.error("Error: ", error);
    } else {
      const id = results.rows[0].client_id;
      pool.query(queries.getTransactionsByName, [id], (error, results) => {
        if (error) {
          console.error("Error: ", error);
        } else {
          res.status(200).json(results.rows);
        }
      });
    }
  });
};

const totalRemainingCredit = (req, res) => {
  const name = req.params.name;
  pool.query(queries.getTransactionsIdByName, [name], (error, results) => {
    if (error) {
      console.error("Error: ", error);
    } else {
      const id = results.rows[0].client_id;
      pool.query(queries.totalRemainingCredit, [id], (error, results) => {
        if (error) {
          console.error("Error: ", error);
        } else {
          res.status(200).send(results.rows[0].sum);
        }
      });
    }
  });
};

module.exports = {
  getAllTransactions,
  getTransactionsByName,
  totalRemainingCredit,
};
