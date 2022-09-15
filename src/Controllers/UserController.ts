import { Request, Response } from "express";
import { User } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";
import { ReplaceHtml } from "../Utils/Functions";

export const user = async (req: Request, res: Response) => {
  const id: string = req.params.id as string;
  const variables = {
    id: parseInt(id),
  };
  const { data } = await AniFetch(User, variables);
  res.render("user", {
    replaceHtml: ReplaceHtml,
    user: data.User,
  });
};
