const pool = require("../../db");
const queries = require("./queries");
const moment = require("moment-timezone");

//Check if client exists and create if not
const createClient = (req, res) => {
  const { client_name, client_address, phone_number } = req.body;
  pool.query(queries.checkClientExists, [client_name], (error, results) => {
    if (results.rows.length) {
      res.send("Client with same name already exits!");
    } else {
      const localTimeZone = "Asia/Kolkata";
      const now = moment.tz(localTimeZone);
      const utcDate = now.utc();
      const created_at = utcDate.toISOString();
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

//Get all clients from DB
const getAllClients = (req, res) => {
  pool.query(queries.getAllClients, (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
};

//Get client ID from name
const getClientIdByName = (req, res) => {
  const name = req.params.name;
  pool.query(queries.getClientIdByName, [name], (error, results) => {
    if (error) {
      return res.status(500).send("Internal server error!");
    } else if (results.rows.length <= 0) {
      return res.status(404).send("Client not found!");
    } else {
      return res.status(200).send(results.rows);
    }
  });
};

//Update client name

const updateClientName = (req, res) => {
  const { client_name } = req.body;
  const updated_name = req.params.name;
  pool.query(queries.getClientIdByName, [client_name], (error, results) => {
    if (error) {
      console.error("Error: ", error);
    } else {
      const id = parseInt(results.rows[0].client_id);
      pool.query(
        queries.updateClientName,
        [updated_name, id],
        (error, results) => {
          if (error) {
            console.error("Error: ", error);
          } else {
            return res
              .status(200)
              .send(
                `Client name updated from ${client_name} to ${updated_name}!`
              );
          }
        }
      );
    }
  });
};

//Delete client from db

const deleteClient = (req, res) => {
  const { client_name } = req.body;
  pool.query(queries.getClientIdByName, [client_name], (error, results) => {
    if (error) {
      return console.error("Error: ", error);
    } else {
      const id = parseInt(results.rows[0].client_id);
      pool.query(queries.deleteClient, [id], (error, results) => {
        if (error) {
          return console.error("Error: ", error);
        } else {
          return res
            .status(200)
            .send(`Client ${client_name} deleted successfully!`);
        }
      });
    }
  });
};

const totalClients = (req, res) => {
  try {
    pool.query(queries.totalClients, (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Internal server error!" });
      } else if (results.rowCount < 1) {
        return res.status(404).json({ message: "Not found!" });
      } else {
        return res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const getCompleteClientDetails = (req, res) => {
  const name = req.params.name;
  if (name) {
    try {
      pool.query(queries.getCompleteClientDetails, [name], (error, results) => {
        if (error) {
          console.log(error)
          return res.status(500).json({ message: "Internal server error!" });
        } else if (results.rowCount < 1) {
          return res.status(404).json({ message: "Not Found!" });
        } else {
          return res.status(200).json(results.rows);
        }
      });
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({ message: "Internal server error!" });
    }
  } else {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  getAllClients,
  getClientIdByName,
  createClient,
  updateClientName,
  deleteClient,
  totalClients,
  getCompleteClientDetails,
};
