import { Router } from "express";

import { entriesRouter } from "./entries.js";

export const routes = Router();

routes.use("/entries", entriesRouter);
