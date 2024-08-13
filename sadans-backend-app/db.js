const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  database: "sadans",
  user: "postgres",
  password: "mypostgres",
  port: 5432,
});

module.exports = pool;
