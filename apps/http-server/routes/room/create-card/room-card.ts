import express from "express";
import { middleware } from "../../../middleware";
import { prismaDb } from "@repo/db/prismaDb";
import { connect } from "bun";
import { cardInputValidation } from "@repo/lib/authValidation";

export const userRoomCard = express();

userRoomCard.post("/createRoomCard/:roomId", middleware, async (req, res) => {
  const userId = req.id;
  const roomId = req.params.roomId;

  try {
    const body = req.body;
    const parsed = cardInputValidation.safeParse(body);

    if (!parsed.success)
      return res.status(403).json({ message: "Card input validation error" });

    const { title, description }: any = parsed.data;

    const addCardInGroup = await prismaDb.card.create({
      data: {
        title,
        description,
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
      message: `Card has been created in room`,
      addCardInGroup,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
});
