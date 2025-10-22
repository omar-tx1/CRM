import { Router } from "express";

export const invoicesRouter = Router();

invoicesRouter.get("/", (_req, res) => {
  res.json({ items: [], message: "Invoices endpoint placeholder" });
});
