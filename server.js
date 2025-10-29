import 'dotenv/config'
import express from "express"
import path from "path"
import bodyParser from "body-parser"
import http from "http"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import robloxRoutes from "./src/modules/roblox/routes/index.routes.js"
import tecbooksRoutes from "./src/modules/tecbooks/routes/index.routes.js"

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

const app = express()
const server = http.createServer(app)
const uri = process.env.MONGO_URI

// Conectar a MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a la base de datos de MongoDB"))
  .catch((error) => console.error("Error al conectar con la base de datos:", error))

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/roblox", robloxRoutes)
app.use("/tecbooks", tecbooksRoutes)

server.listen(3000, () => {
  console.log("Servidor WebSocket corriendo en http://localhost:3000")
})
