import { Request, Response } from "express";
import { Character } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";
import { ReplaceHtml } from "../Utils/Functions";

export const character = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const variables = {
    id: parseInt(id),
  };
  const { data } = await AniFetch(Character, variables);
  res.render("character", {
    replaceHtml: ReplaceHtml,
    character: data.Character,
  });
};