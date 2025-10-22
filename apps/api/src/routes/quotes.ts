import { Router } from "express";

export const quotesRouter = Router();

quotesRouter.get("/", (_req, res) => {
  res.json({ items: [], message: "Quotes endpoint placeholder" });
});
