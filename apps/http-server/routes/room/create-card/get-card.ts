import express from "express";
import { middleware } from "../../../middleware";
import { prismaDb } from "@repo/db/prismaDb";
import { connect } from "bun";

export const getUserRoomCard = express();

getUserRoomCard.get("/getMyCard/:roomId", middleware, async (req, res) => {
  const userId = req.id;
  const roomId = req.params.roomId;

  try {
    const findUserInRoom = await prismaDb.roomMembers.findFirst({
      where: {
        userId,
        roomId,
      },
    });

    if (!findUserInRoom)
      return res.status(404).json({ message: "User not in this room" });

    // ✅ Fetch all cards by this user in this room
    const fetchMyCard = await prismaDb.card.findMany({
      where: {
        userId,
        roomId,
      },
    });

    res.status(200).json({ message: "User cards", cards: fetchMyCard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

getUserRoomCard.get("/allCards/:roomId", middleware, async (req, res) => {
  const roomId = req.params.id;

  try {
    const fetchAllCard = await prismaDb.card.findMany({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    res.status(200).json({ message: "All cards", fetchAllCard });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});
