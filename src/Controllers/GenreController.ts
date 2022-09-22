import { Request, Response } from "express";
import { Genre } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";

const GenreCollection: string[] = [
  "action",
  "adventure",
  "comedy",
  "drama",
  "ecchi",
  "fantasy",
  "hentai",
  "horror",
  "mahou-shoujo",
  "mecha",
  "music",
  "mystery",
  "psychological",
  "romance",
  "sci-fi",
  "slice-of-life",
  "sports",
  "supernatural",
  "shriller",
];

export const genre = async (req: Request, res: Response) => {
  let genre: string = req.params.name as string;
  if (!GenreCollection.includes(genre.toLowerCase())) return res.render("404");

  let query: string = req.query.page as string;
  if (!query) query = "1";

  if (genre.toLowerCase().startsWith("sci")) {
    genre = genre;
  } else {
    genre = genre.replace("-", " ").replace("-", " ");
  }

  const variables = {
    page: parseInt(query),
    genre: genre,
  };

  try {
    const { data } = await AniFetch(Genre, variables);
    res.render("genre", {
      error: null,
      genre: genre,
      animes: data.Page.media,
    });
  } catch (error) {
    res.render("genre", {
      error: "An Error Happened",
      genre: null,
      animes: null,
    });
  }
};
