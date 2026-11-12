
import { Router } from "express";
import { globalSearch } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get("/", globalSearch);

export default searchRouter;
