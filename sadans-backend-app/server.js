const express = require("express");
const cors = require("cors");
const clientRoutes = require("./src/client/routes");
const transactionRoutes = require("./src/transaction/routes");
const exportRoutes = require("./src/exportTable/routes");
const app = express();
const Port = 3004;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Don't forget to add middleware!");
});

app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/export/csv", exportRoutes);

app.listen(Port, console.log(`Listening to port: ${Port}`));
