import express from "express";
import { middleware } from "../../middleware";
import { tagValidation } from "@repo/lib/authValidation";
import { prismaDb } from "@repo/db/prismaDb";

export const userTags = express();

userTags.post("/create", middleware, async (req, res) => {
  const userId = req.id;
  try {
    const body = req.body;
    const parsed = tagValidation.safeParse(body);

    if (!parsed.success)
      return res.status(409).json({ messge: "Validation confict" });

    const { title } = parsed.data;

    const addTag = await prismaDb.tag.create({
      data: {
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(200).json({
        message : "tag created",
        addTag
    })

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
