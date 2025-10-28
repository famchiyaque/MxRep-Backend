require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");

const robloxRoutes = require("./presentation/routes/roblox.routes");
const tecbooksRoutes = require("./presentation/routes/tecbooks.routes");

const server = http.createServer(app);

// Conectar a MongoDB

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/roblox", robloxRoutes);
// ✅ Enganchas todos tus sockets centralizados
// Después de crear io

app.use("/tecbooks", tecbooksRoutes);

server.listen(3000, () => {
  console.log("Servidor WebSocket corriendo en http://localhost:3000");
});
