const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const clientRoutes = require("./src/client/routes");
const transactionRoutes = require("./src/transaction/routes");
const authRoutes = require("./src/auth/routes");
const exportRoutes = require("./src/exportTable/routes");
const auth = require("./src/middlewares/authUser");

dotenv.config();

const app = express();

const Port = 3004;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sadans Api Library",
      version: "1.0.0",
      description: "Sadan's Credi-Ledger Api's",
    },
    servers: [
      {
        url: "http://localhost:3004",
      },
    ],
  },
  apis: ["./src/transaction/routes.js"],
};

const specs = swaggerJsDoc(options);

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Don't forget to add middleware!");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1/auth", authRoutes);
app.use(auth.authUser);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/export/csv", exportRoutes);

app.options('*', cors({
  origin: "http://localhost:5173", 
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.listen(Port, console.log(`Listening to port: ${Port}`));
