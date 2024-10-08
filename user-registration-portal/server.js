const express = require("express");
const app = express();
const connect_db = require("./db");
const userRoutes = require("./routes/user.route");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3005;
connect_db.connect_db();
app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Port ${PORT} activated!`);
});
