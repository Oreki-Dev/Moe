import { Request, Response } from "express";
import { Genre } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";

interface StringArray {
  [index: string]: string;
}

const GenreCollection: StringArray = {
  "action": "action",
  "adventure": "adventure",
  "comedy": "comedy",
  "drama": "drama",
  "ecchi": "ecchi",
  "fantasy": "fantasy",
  "hentai": "hentai",
  "horror": "horror",
  "mahou-shoujo": "mahou shoujo",
  "mecha": "mecha",
  "music": "music",
  "mystery": "mystery",
  "psychological": "psychological",
  "romance": "romance",
  "sci-fi": "sci-fi",
  "slice-of-life": "slice of life",
  "sports": "sports",
  "supernatural": "supernatural",
  "thriller": "thriller",
}

export const genre = async (req: Request, res: Response) => {
  let genre: string = req.params.name as string;
  if (!GenreCollection.hasOwnProperty(genre.toLowerCase())) return res.render("404");

  let query: string = req.query.page as string;
  if (!query) query = "1";

  genre = GenreCollection[genre.toLowerCase()]

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
