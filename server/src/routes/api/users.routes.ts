import { Router } from "express";
import usersController from "../../controllers/users.controller";
import { auth } from "../../middlewares/auth.middleware";

const route = Router();

route.post("/register", usersController.register);
route.post("/activation", usersController.activateEmail);
route.post("/login", usersController.login);
route.post("/refresh_token", usersController.getAccessToken);
route.post("/forgot", usersController.forgotPassword);
route.post("/reset", auth, usersController.resetPassword);

export default route;
