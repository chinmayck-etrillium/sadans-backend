const fs = require("fs");
const fastcsv = require("fast-csv");
const os = require("os");
const pool = require("../../db");
const queries = require("./queries");
const username = os.userInfo().username;

const selectClientsTable = async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const drive = "C:/Users/";
    const downloads = "/Downloads/";
    const locationString = drive + username + downloads + `${tableName}.csv`;
    const filePath = `${locationString}`;
    const ws = fs.createWriteStream(filePath);

    pool.query(queries.selectClientsTable, (error, results) => {
      if (error) {
        console.error("Error: ", error);
      } else {
        fastcsv
          .write(results.rows, { headers: true })
          .on("finish", () => {
            console.log(`Successfully exported ${tableName}`);
          })
          .pipe(ws);
        res.status(200).send("Success");
      }
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

const selectTransactionsTable = async (req, res) => {
  try {
    const tableName = "transaction";
    const drive = "C:/Users/";
    const downloads = "/Downloads/";
    const locationString = drive + username + downloads + `${tableName}.csv`;
    const filePath = `${locationString}`;
    const ws = fs.createWriteStream(filePath);

    pool.query(queries.selectTransactionsTable, (error, results) => {
      if (error) {
        console.error("Error: ", error);
      } else {
        fastcsv
          .write(results.rows, { headers: true })
          .on("finish", () => {
            console.log(`Successfully exported ${tableName}`);
          })
          .pipe(ws);
        res.status(200).send("Success");
      }
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = {
  selectClientsTable,
  selectTransactionsTable,
};
