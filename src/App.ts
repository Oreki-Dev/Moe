import express, { Request, Response } from "express";
import compression from "compression";
import bodyParser from "body-parser";

import * as HomeController from "./Controllers/HomeController";
import * as AnimeController from "./Controllers/AnimeController";
import * as CharacterController from "./Controllers/CharacterController";
import * as UserController from "./Controllers/UserController";
import * as StudioController from "./Controllers/StudioController";
import * as SearchController from "./Controllers/SearchController";
import * as ChartController from "./Controllers/ChartController";
import * as GenreController from "./Controllers/GenreController";
import * as BirthdayController from "./Controllers/BirthdayController";

const App = express();

App.set("view engine", "ejs");
App.use(compression());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.disable("x-powered-by");
App.use(express.static("public"));

App.get("/", HomeController.index);
App.get("/anime/:id", AnimeController.anime);
App.get("/character/:id", CharacterController.character);
App.get("/user/:id", UserController.user);
App.get("/studio/:id", StudioController.studio);
App.get("/search", SearchController.index);
App.get("/chart", ChartController.chart);
App.get("/schedule", ChartController.schedule);
App.get("/genre/:name", GenreController.genre);
App.get("/birthdays", BirthdayController.birthday);

App.post("/search", SearchController.postIndex);

App.get("*", HomeController.error);
export default App;
