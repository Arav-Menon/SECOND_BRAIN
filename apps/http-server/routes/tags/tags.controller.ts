import express from "express";
import { middleware } from "../../middleware";
import { tagValidation } from "@repo/lib/authValidation";
import { prismaDb } from "@repo/db/prismaDb";

export const userTagController = express();

userTagController.get("/getTag", middleware, async (req, res) => {
  const userId = req.id;

  try {
    const getTag = await prismaDb.tag.findMany({ where: { userId } });

    res.status(200).json({
      message: "All cards",
      getTag,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

userTagController.put("/updateTag/:tagId", middleware, async (req, res) => {
  const userId = req.id;
  const tagId = req.params.tagId;

  try {
    const body = req.body;
    const parsed = tagValidation.safeParse(body);

    if (!parsed.success)
      return res.status(409).json({ message: "Validation error" });

    const updateTag = await prismaDb.tag.update({
      where: { id: tagId },
      data: {
        title: body.title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({ message: "Tag updated", updateTag });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// userTagController.delete("/deleteTag/:tagId", middleware, async (req, res) => {
//   const tagId = req.params.cardId;
//   const userId = req.id;

//   try {
//     const tag = await prismaDb.user.findUnique({
//       where: { id: userId },
//     });

//     if (!tag) return res.status(404).json({ message: "Tag not found" });

//     if (tag?.id !== userId)
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to delete this card" });

//     const deleteCard = await prismaDb.tag.delete({
//       where: { id: tagId },
//     });
//     res.status(200).json({
//       message: "Card has been deleted",
//       deleteCard,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// });
