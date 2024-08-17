const getAllClients = "SELECT * FROM clients";
const checkClientExists = "SELECT c FROM clients c WHERE client_name = $1";
const createClient =
  "INSERT INTO clients(client_name,client_address,created_at,phone_number) VALUES($1,$2,$3,$4)";

const getClientIdByName =
  "SELECT client_id FROM clients WHERE client_name = $1";
const updateClientName =
  "UPDATE clients SET client_name = $1 WHERE client_id = $2";

const deleteClient = "DELETE FROM clients WHERE client_id = $1";
module.exports = {
  createClient,
  checkClientExists,
  getAllClients,
  getClientIdByName,
  updateClientName,
  deleteClient,
};
