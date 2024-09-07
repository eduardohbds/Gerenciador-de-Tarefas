import { Router } from "express";
import { register,login } from "../middlewares/User.controller";

const userRouter = Router();

userRouter.post("/login",login);
userRouter.post("/register",register);

export default userRouter;