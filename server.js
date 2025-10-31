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
import { connectDB } from "./src/utils/db/db.js"

connectDB();

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
