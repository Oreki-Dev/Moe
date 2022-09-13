import { Request, Response } from "express";
import { Anime } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";
import { ReplaceHtml } from "../Utils/Functions";

export const anime = async (req: Request, res: Response) => {
  const id: number = req.params.id as number;
  const variables = {
    id: id,
    type: "ANIME"
  };
  const { data } = await AniFetch(Anime, variables);
  res.render("anime", {
    replaceHtml: ReplaceHtml,
    animes: data.Media,
  });
};