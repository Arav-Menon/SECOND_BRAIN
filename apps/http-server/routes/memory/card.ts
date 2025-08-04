import express from "express";
import { middleware } from "../../middleware";
import { cardInputValidation } from "@repo/lib/authValidation";
import { prismaDb } from "@repo/db/prismaDb";

export const userCard = express();

userCard.post("/memory", middleware, async (req, res) => {
  const body = req.body;
  const parsed = cardInputValidation.safeParse(body);

  if (!parsed.success) {
    return res.status(409).json({
      message: "validation error",
    });
  }

  const userId = req.id;

  const { title, description } = parsed.data;

  const addCard = await prismaDb.card.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(200).json({
    message : "Card has been created",
    addCard : {
        title : addCard.title,
        description : addCard.description
    }
  })

});
