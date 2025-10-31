import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import { getInboxRequests } from "../controllers/admin-panel.controller.js";

const router = express.Router();

router.get("/get-institution-inbox-requests", verifyJWT, getInboxRequests);
