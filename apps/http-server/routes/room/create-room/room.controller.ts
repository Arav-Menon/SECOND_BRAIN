import express from "express";
import { middleware } from "../../../middleware";
import { prismaDb } from "@repo/db/prismaDb";
import { roomValidation } from "@repo/lib/authValidation";

export const userRoomController = express();

userRoomController.get("/getRoom", middleware, async (req, res) => {
  const userId = req.id;

  try {
    const myRoom = await prismaDb.room.findMany({ where: { userId } });

    res.status(200).json({
      message: "Your room",
      myRoom,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

userRoomController.put("/updateRoom/:roomId", middleware, async (req, res) => {
  const userId = req.id;
  const roomId = req.params.roomId;

  try {
    const body = req.body;
    const parsed = roomValidation.safeParse(body);

    if (!parsed.success)
      return res.status(409).json({ message: "Validation error" });

    const { name } = parsed.data;

    const updateRoom = await prismaDb.room.update({
      where: { id: roomId },
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
      message: "room updated",
      updateRoom,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

userRoomController.delete("/delete/:roomId", middleware, async (req, res) => {
  const userId = req.id;
  const roomId = req.params.id;

  try {
    const findRoom = await prismaDb.room.findUnique({ where: { id: roomId } });

    if (!findRoom) return res.status(404).json({ messge: "Room not found" });

    if (findRoom.userId !== userId)
      return res
        .status(403)
        .json({ message: "Only room creator can delete this room" });

    const deleteRoom = await prismaDb.room.delete({
      where: { id: roomId },
    });

    return res.status(200).json({
      message: "room deleted",
      deleteRoom,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
});
