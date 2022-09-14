import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
    return res.render("search", {
        animes: null,
        characters: null,
        users: null
    })
};

export const portIndex = (req: Request, res: Response) => {
    console.log(req.body)
};