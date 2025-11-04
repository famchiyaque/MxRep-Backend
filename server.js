import 'dotenv/config'
import cors from 'cors'
import express from "express"
import path from "path"
import { fileURLToPath } from 'url'
import bodyParser from "body-parser"
import http from "http"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import robloxRoutes from "./src/modules/roblox/routes/index.routes.js"
import tecbooksRoutes from "./src/modules/tecbooks/routes/index.routes.js"
import { connectDB } from "./src/utils/db/db.js"
// import { seedSuperAdmin } from "./src/utils/seeds/superadmin.seed.js"
import { seedSuperAdmin } from '#src/utils/seeds/superadmin.seed.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = http.createServer(app)


connectDB();

// app.use(cors())
app.use(cors({
  // origin: 'http://localhost:8322',  // ← MUST match EXACTLY
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use("/roblox", robloxRoutes)
app.use("/tecbooks", tecbooksRoutes)

server.listen(3000, () => {
  console.log("Servidor WebSocket corriendo en http://localhost:3000")
})
