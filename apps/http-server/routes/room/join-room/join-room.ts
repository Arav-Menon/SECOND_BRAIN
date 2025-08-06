import express from "express";
import { middleware } from "../../../middleware";
import { prismaDb } from "@repo/db/prismaDb";

export const userJoinRoom = express();

userJoinRoom.post("/join/:roomId", middleware, async (req, res) => {
  const userId = req.id;
  const roomId = req.params.roomId;
  try {
    if (!roomId)
      return res.status(404).json({ message: "RoomId is required " });

    const findRoom = await prismaDb.room.findUnique({ where: { id: roomId } });

    if (!findRoom) return res.status(404).json({ message: "Room not found" });

    const alreadyJoinedRoom = await prismaDb.roomMembers.findFirst({
      where: { userId, roomId },
    });

    if (alreadyJoinedRoom)
      return res.status(404).json({ message: "Already joined room" });

    const addUser = await prismaDb.roomMembers.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        room: {
          connect: {
            id: roomId,
          },
        },
      },
    });

    res.status(200).json({
      message: `Room join to ${addUser.roomId}`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
