import { Request, Response } from "express";
import { AiringUpcoming, Schedule } from "../Utils/Queries";
import { AniFetch, Season, NextSeason } from "../Utils/Anilist";
import moment from "moment";

export const chart = async (req: Request, res: Response) => {
    const season: string = req.query.season as string;
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
          airing: true,
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
            airing: false,
            animes: data.Page.media,
          });
    } else {
        return res.redirect("/chart?season=airing")
    }
  };

  export const schedule = async (req: Request, res: Response) => {
    const variables = {
      page: 1,
      start: moment().startOf("day").unix(),
      end: moment().endOf("day").unix(),
    };
    const { data } = await AniFetch(Schedule, variables);
    await res.render("schedule", {
      moment: moment,
      animes: data.Page.airingSchedules,
    })
  }