import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";

const messageRouter = express.Router();

messageRouter.route("/send").post(isAuthenticated, sendMessage)


export default messageRouter