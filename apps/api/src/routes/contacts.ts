import { Router } from "express";

export const contactsRouter = Router();

contactsRouter.get("/", (_req, res) => {
  res.json({ items: [], message: "Contacts endpoint placeholder" });
});
