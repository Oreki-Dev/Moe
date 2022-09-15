import { Request, Response } from "express";
import { AiringUpcoming } from "../Utils/Queries";
import { AniFetch, Season, NextSeason } from "../Utils/Anilist";

export const chart = async (req: Request, res: Response) => {
    const season: string = req.query.type as string;
    if (!season) return res.redirect("/chart?season=airing")
    if (season.toLowerCase() === "airing") {
        const variables = {
            page: 1,
            seasonYear: Season().seasonYear,
            season: Season().season,
            sort: "POPULARITY_DESC",
        };
        const { data } = await AniFetch(AiringUpcoming, variables);
        res.render("chart", {
          animes: data.Page.media,
        });
    } else if (season.toLowerCase() === "upcoming") {
        const variables = {
            page: 1,
            seasonYear: NextSeason().seasonYear,
            season: NextSeason().season,
            sort: "POPULARITY_DESC",
          };
          const { data } = await AniFetch(AiringUpcoming, variables);
          await res.render("chart", {
            animes: data.Page.media,
          });
    } else {
        return res.redirect("/chart?season=airing")
    }
  };