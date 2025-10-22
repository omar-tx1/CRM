import { Router } from "express";

export const paymentsRouter = Router();

paymentsRouter.get("/", (_req, res) => {
  res.json({ items: [], message: "Payments endpoint placeholder" });
});
