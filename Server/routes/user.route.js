import express from "express"
import { getOtherUsers, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
const userRouter = express.Router();

userRouter.route("/register").post(register);

userRouter.route("/login").post(login)

userRouter.route("/logout").get(logout)

userRouter.route("/").get(isAuthenticated ,getOtherUsers)

export default userRouter;