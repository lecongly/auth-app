import { Router } from "express";
import usersController from "../../controllers/users.controller";

const route = Router();
route.post("/register", usersController.register);

export default route;
