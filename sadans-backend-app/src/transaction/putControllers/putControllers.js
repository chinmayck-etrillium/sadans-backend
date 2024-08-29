const pool = require("../../../db");
const queries = require("../queries");

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

const editTypeById = (req, res) => {
  const id = req.params.id;
  const { type } = req.body;

  pool.query(queries.editTypeById, [type, id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res
        .status(200)
        .json({ message: "Transaction updated successfully!" });
    }
  });
};

const editNotesById = (req, res) => {
  const id = req.params.id;
  const { notes } = req.body;

  pool.query(queries.editNotesById, [notes, id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res
        .status(200)
        .json({ message: "Transaction updated successfully!" });
    }
  });
};

const editCreatedAtById = (req, res) => {
  const id = req.params.id;
  const { created_at } = req.body;

  pool.query(queries.editCreatedAtById, [created_at, id], (error, results) => {
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
  editAmountById,
  editTypeById,
  editNotesById,
  editCreatedAtById,
};
