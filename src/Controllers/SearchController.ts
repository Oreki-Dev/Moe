import { Request, Response } from "express";
import { SearchAnime, SearchCharacter, SearchUser } from "../Utils/Queries";
import { AniFetch } from "../Utils/Anilist";
import App from "../App";

export const index = (req: Request, res: Response) => {
  return res.render("search", {
    error: null,
    animes: null,
    characters: null,
    users: null,
  });
};

export const postIndex = async (req: Request, res: Response) => {
  const search: string = req.body.name as string;
  // const option: string = req.body.option as string;

  const variables = {
    page: 1,
    search: search,
  };

  const AnimeResults = await AniFetch(SearchAnime, variables);
  const CharacterResults = await AniFetch(SearchCharacter, variables);
  const UserResults = await AniFetch(SearchUser, variables);

  App.render("searchResults", {
    error: null,
    animes: AnimeResults.data.Page.media.length < 0 ? null : AnimeResults.data.Page.media,
    characters: CharacterResults.data.Page.characters.length < 0 ? null : CharacterResults.data.Page.characters,
    users: UserResults.data.Page.users.length < 0 ? null : UserResults.data.Page.users,
  }, function (err: any, html: any) {
    return html
  })
  
  /*if (option === "anime") {
    const { data } = await AniFetch(SearchAnime, variables);
    return res.render("search", {
      error: null,
      animes: data.Page.media,
      characters: null,
      users: null,
    });
  } else if (option === "character") {
    const { data } = await AniFetch(SearchCharacter, variables);
    return res.render("search", {
      error: null,
      animes: null,
      characters: data.Page.characters,
      users: null,
    });
  } else if (option === "user") {
    const { data } = await AniFetch(SearchUser, variables);
    return res.render("search", {
      error: null,
      animes: null,
      characters: null,
      users: data.Page.users,
    });
  } else {
    return res.render("search", {
      error: "Something Went Wrong",
      animes: null,
      characters: null,
      users: null,
    });
<<<<<<< HEAD
  }
  
=======
  }*/
>>>>>>> ee64553df30e39ac814144ab72c6162f6dba547b
};
