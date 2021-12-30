const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
/*--------------------------------*/
const connectDB = require("./db/connect");

async function startDBandServer() {
  await connectDB(process.env.MONGODB_URI, connectServer);
}
startDBandServer();

function connectServer() {
  app.listen(port, () => {
    console.log(`Server conectado en http://localhost:${port}`);
  });
}
/*--------ROUTES---------------*/
const usersAPI = require("./routes/usersAuthAPI");
app.use("/api/users/auth", usersAPI);

const verifyToken = require("./middleware/authJWT");
app.use(verifyToken);

const tareasAPI = require("./routes/tareasAPI");

app.use("/api/tareas", tareasAPI);
