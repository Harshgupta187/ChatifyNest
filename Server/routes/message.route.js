import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";

const messageRouter = express.Router();

messageRouter.route("/send/:id").post(isAuthenticated, sendMessage)

router.route("/:id").get(isAuthenticated, getMessage);


export default messageRouter