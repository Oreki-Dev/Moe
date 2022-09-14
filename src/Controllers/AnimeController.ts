import { Request, Response } from "express";
import { Anime } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";
import { ReplaceHtml } from "../Utils/Functions";

export const anime = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const variables = {
    id: parseInt(id),
    type: "ANIME",
  };
  const { data } = await AniFetch(Anime, variables);
  res.render("anime", {
    replaceHtml: ReplaceHtml,
    anime: data.Media,
  });
};
