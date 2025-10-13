import { Router } from "express";

export const jobsRouter = Router();

jobsRouter.get("/", (_req, res) => {
  res.json({ items: [], message: "Jobs endpoint placeholder" });
});
