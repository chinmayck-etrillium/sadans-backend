const userExists = "SELECT * FROM auth WHERE username = $1";
const createUser = "INSERT INTO auth(username,password) VALUES($1,$2)";

module.exports = {
  userExists,
  createUser,
};
