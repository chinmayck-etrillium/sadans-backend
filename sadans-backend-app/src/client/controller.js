const pool = require("../../db");
const queries = require("./queries");

const createClient = (req, res) => {
  const { client_name, client_address, phone_number } = req.body;
  pool.query(queries.checkClientExists, [client_name], (error, results) => {
    if (results.rows.length) {
      res.send("Client with same name already exits!");
    } else {
      const now = new Date();
      const created_at = now.toISOString();
      pool.query(
        queries.createClient,
        [client_name, client_address, created_at, phone_number],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.send(error.detail);
          } else {
            res.status(201).send("Client added to database");
          }
        }
      );
    }
  });
};

const getAllClients = (req, res) => {
  pool.query(queries.getAllClients, (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};

module.exports = {
  getAllClients,
  createClient,
};
