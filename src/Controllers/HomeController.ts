import { Request, Response } from "express";
import { Trending } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";

export const index = async (req: Request, res: Response) => {
  const variables = {
    page: 1,
  };
  const { data } = await AniFetch(Trending, variables);
  res.render("home", {
    animes: data.Page.media,
  });
};

export const error = (req: Request, res: Response) => {
  res.render("404");
};