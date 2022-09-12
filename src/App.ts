import express, { Request, Response } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";

import * as HomeController from "./Controllers/Home";
import * as AnimeController from "./Controllers/Home";

const App = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => res.render("rateLimited"),
});

App.set("view engine", "ejs");
App.use(compression());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.disable("x-powered-by");
App.use(express.static("public"));

App.use(limiter);

App.get("/", HomeController.index);
App.get("/anime/:name", AnimeController.search);
App.get("/chart", AnimeController.chart);
App.get("/schedule", AnimeController.schedule);

App.get("*", HomeController.error);
export default App;