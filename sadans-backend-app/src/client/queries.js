const getAllClients = "SELECT * FROM clients";
const checkClientExists = "SELECT c FROM clients c WHERE client_name = $1";
const createClient =
  "INSERT INTO clients(client_name,client_address,created_at,phone_number) VALUES($1,$2,$3,$4)";

module.exports = {
  createClient,
  checkClientExists,
  getAllClients,
};
