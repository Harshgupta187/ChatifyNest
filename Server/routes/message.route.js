import express from "express";
import { sendMessage , getMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";

const messageRouter = express.Router();

messageRouter.route("/send/:id").post(isAuthenticated, sendMessage)

messageRouter.route("/:id").get(isAuthenticated, getMessage);


export default messageRouter