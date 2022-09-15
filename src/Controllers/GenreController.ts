import { Request, Response } from "express";
import { Genre } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";

const GenreCollection: string[] = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Hentai",
    "Horror",
    "Mahou Shoujo",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller"
  ];

export const genre = async (req: Request, res: Response) => {
    const genre: string = req.params.name as string
    if (!GenreCollection.includes(genre)) return res.render("404")

    let query: string = req.query.page as string
    if (!query) query = "1"

    const variables = {
        page: parseInt(query),
        genre: genre
    }

    try {
        const { data } = await AniFetch(Genre, variables);
        res.render("genre", {
            error: null,
            genre: genre,
            animes: data.Page.media
        });
    } catch (error) {
       res.render("genre", {
        error: "An Error Happened",
        genre: genre,
        animes: null
       }) 
    }
};