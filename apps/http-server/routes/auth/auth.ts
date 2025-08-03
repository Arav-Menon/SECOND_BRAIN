import express from "express";
import { authValidation } from "@repo/lib/authValidation";
import jwt from "jsonwebtoken";
import { prismaDb } from "@repo/db/prismaDb";
import bcrypt from "bcrypt";

export const userRouter = express();

userRouter.post("/auth", async (req, res) => {
  try {
    const body = req.body;
    const parsed = authValidation.safeParse(body);

    if (!parsed.success) {
      return res.status(409).json({ Error: "Invalid input" });
    }

    const { userName, email, password } = parsed.data;

    const existUser = await prismaDb.user.findUnique({
      where: { email },
    });

    if (existUser) {
      const compareHashPassword = await bcrypt.compare(
        password,
        existUser.password
      );
      if (!compareHashPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        {
          id: existUser.id,
        },
        "AUTH_TOKEN"
      );

      return res.status(200).json({
        message: "Login succesful",
        user: {
          id: existUser.id,
          email: existUser.email,
          password: existUser.password,
        },
        token,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await prismaDb.user.create({
      data: {
        userName: userName ?? "",
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      {
        id: newUser.id,
      },
      "AUTH_TOKEN"
    );

    res.status(200).json({
      newUser: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
