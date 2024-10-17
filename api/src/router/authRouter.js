import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUser } from "../models/userSchema.js";
import { config } from "../config/config.js";

const router = express.Router();

// Signup Api User
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const userData = await createUser({
      username,
      email,
      password: hashedpassword,
    });

    const respObj = {
      status: true,
      message: "User created successfully!",
    };

    res.status(200).send(respObj);
  } catch (err) {
    let errObj = {
      status: false,
      message: err.message || "Error Creating User",
    };

    res.status(500).send(errObj);
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email }, true);

  if (!user) {
    const errObj = {
      status: false,
      message: "Invalid email or password",
    };
    return res.status(401).send(errObj);
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    const errObj = {
      status: false,
      message: "Invalid email or password",
    };

    return res.status(400).json(errObj);
  } else {
    // login successful
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    const respObj = {
      status: true,
      message: "Login Successful",
      data: {
        token,
        username: user.username,
      },
    };

    res.status(200).send(respObj);
  }
});

export default router;
