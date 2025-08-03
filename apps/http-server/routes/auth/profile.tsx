import express from "express";
import { authValidation } from "@repo/lib/authValidation";
import { prismaDb } from "@repo/db/prismaDb";
import { middleware } from "../../middleware";
import bcrypt from "bcrypt";

export const userProfile = express();

userProfile.get("/getProfileData", middleware, async (req, res) => {
  const userId = req.id;

  const findUser = await prismaDb.user.findUnique({
    where: { id: userId },
  });

  if (findUser) {
    return res.status(200).json({ message: "User data", findUser });
  } else {
    return res.status(404).json({ message: "User does not exist" });
  }
});

userProfile.put("/update", middleware, async (req, res) => {
  const body = req.body;
  const parsed = authValidation.safeParse(body);

  const userId = req.id;

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const updateUser = await prismaDb.user.update({
    where: { id: userId },
    data: {
      userName: body.userName,
      email: body.email,
      password: hashedPassword,
    },
  });

  res.status(200).json({
    message: "user updated",
    updateUser: {
      id: updateUser.id,
      email: updateUser.email,
    },
  });
});

userProfile.delete("/delete", middleware, async (req, res) => {
  const userId = req.id;

  const deleteUser = await prismaDb.user.delete({
    where: { id: userId },
  });
  res.status(200).json({
    message: "User deleted",
    deleteUser,
  });
});
