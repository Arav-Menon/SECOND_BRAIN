import express from "express";
import { middleware } from "../../middleware";
import { prismaDb } from "@repo/db/prismaDb";
import { cardInputValidation } from "@repo/lib/authValidation";

export const cardController = express();

cardController.get("/myCard", middleware, async (req, res) => {
  const userId = req.id;

  const myAllCard = await prismaDb.card.findMany({ where: { userId } });

  res.status(200).json({
    message: "All cards",
    myAllCard,
  });
});

cardController.put("/updateCard/:cardId", middleware, async (req, res) => {
  const userId = req.id;
  console.log(userId)
  const cardId = req.params.cardId;
  console.log(cardId)
  const body = req.body;
  const parsed = cardInputValidation.safeParse(body);

  if (!parsed.success) {
    return res.status(409).json({ message: "Validation error" });
  }
//   if (!cardId) return res.status(404).json({ message: "Card not found" });

  const updateCard = await prismaDb.card.update({
    where: { id: cardId },
    data: {
      title: body.title,
      description: body.description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(200).json({
    message: "Card has been updated",
    updateCard,
  });
});

cardController.delete("/delete/:cardId", middleware, async (req, res) => {
  const cardId = req.params.cardId;

  const deleteCard = await prismaDb.card.delete({
    where: { id: cardId },
  });
  res.status(200).json({
    message: "Card has been deleted",
    deleteCard,
  });
});
