import { Router } from "express";
import usersController from "../../controllers/users.controller";

const route = Router();
route.post("/register", usersController.register);
route.post("/activation", usersController.activateEmail);
route.post("/login", usersController.login);

export default route;
