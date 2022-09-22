import { Request, Response } from "express";
import { Birthdays } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";

export const birthday = async (req: Request, res: Response) => {
  const variables = {
    page: 1
  };
  const { data } = await AniFetch(Birthdays, variables);
  res.render("birthday", {
    characters: data.Page.characters
  });
};