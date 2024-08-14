const express = require("express");
const clientRoutes = require("./src/client/routes");
const app = express();
const Port = 3004;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Don't forget to add middleware!");
});

app.use("/api/v1/client", clientRoutes);

app.listen(Port, console.log(`Listening to port: ${Port}`));
