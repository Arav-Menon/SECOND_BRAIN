import expres from "express";
import { middleware } from "../../../middleware";
import { prismaDb } from "@repo/db/prismaDb";

const userExitRoom = expres();

userExitRoom.delete("/exitRoom/:roomId", middleware, async (req, res) => {
  const userId = req.id;
  const roomId = req.id;

  try {
    const exitRoom = prismaDb.room.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
