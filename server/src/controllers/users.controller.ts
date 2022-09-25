import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { validateEmail } from "../validations";
import {
  createAccessToken,
  createActivationToken,
  createRefreshToken,
} from "../services/jwt";
import sendMail from "../services/sendMail";

import Users from "../models/users.model";
import {
  ACTIVATION_TOKEN_SECRET,
  CLIENT_URL,
  REFRESH_TOKEN_SECRET,
} from "../config";
import { UserJwtPayload } from "../types/jwt.type";

const userController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "Verify your email address");
      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activateEmail: async (req: Request, res: Response) => {
    const { activation_token } = req.body;
    try {
      const user = <UserJwtPayload>(
        jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET)
      );
      const { name, email, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exists." });

      const newUser = new Users({
        name,
        email,
        password,
      });

      await newUser.save();

      res.json({ msg: "Account has been activated!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "The email/password you entered is incorrect." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "The email/password you entered is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/users/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
      jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
          return res.status(400).json({ msg: "Please login now!" });
        }
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: (<any>req).user.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Password successfully changed!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req: Request, res: Response) => {
    try {
      const user = await Users.findById((<any>req).user.id).select("-password");
      res.json(user);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default userController;
