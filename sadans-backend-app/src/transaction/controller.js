const pool = require("../../db");
const queries = require("./queries");

const addTransactionByName = (req, res) => {
  const name = req.params.name;
  pool.query(queries.getTransactionsIdByName, [name], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else if (results.rows.length === 0) {
      return res.status(404).json({ message: "Transactions not found!" });
    } else {
      const id = results.rows[0].client_id;
      const { type, amount, notes } = req.body;
      pool.query(
        queries.addTransactionByName,
        [type, amount, id, notes],
        (error, results) => {
          if (error) {
            return res.status(500).json({ message: "Internal server error" });
          } else {
            return res
              .status(201)
              .json({ message: "Added transaction to DB!" });
          }
        }
      );
    }
  });
};

const editAmountById = (req, res) => {
  const id = req.params.id;
  const { amount } = req.body;

  pool.query(queries.editAmountById, [amount, id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res
        .status(200)
        .json({ message: "Transaction updated successfully!" });
    }
  });
};

module.exports = {
 
  addTransactionByName,
  editAmountById,
};
