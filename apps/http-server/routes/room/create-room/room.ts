import express from "express";
import { middleware } from "../../../middleware";
import { roomValidation } from "@repo/lib/authValidation";
import { prismaDb } from "@repo/db/prismaDb";

const userRoomRouter = express();

userRoomRouter.post("/create/", middleware, async (req, res) => {
  const userId = req.id;
  try {
    const body = req.body;
    const parsed = roomValidation.safeParse(body);

    if (!parsed.success)
      return res.status(409).json({ message: "Validation error" });

    const { name } = parsed.data;

    const newRoom = await prismaDb.room.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({
      message: "room created",
      newRoom: { roomId: newRoom.id, roomName: newRoom.name },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});
