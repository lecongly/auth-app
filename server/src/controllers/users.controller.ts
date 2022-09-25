import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { validateEmail } from "../validations";
import { createActivationToken } from "../services/jwt";
import sendMail from "../services/sendMail";

import Users from "../models/users.model";
import { CLIENT_URL } from "../config";

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
};
export default userController;
