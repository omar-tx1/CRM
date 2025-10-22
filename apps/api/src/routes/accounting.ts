import { Router } from "express";

export const accountingRouter = Router();

accountingRouter.get("/chart-of-accounts", (_req, res) => {
  res.json({ items: [], message: "Chart of accounts placeholder" });
});

accountingRouter.get("/reports/trial-balance", (_req, res) => {
  res.json({ rows: [], message: "Trial balance placeholder" });
});
