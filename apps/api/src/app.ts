import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { registerRoutes } from "./routes";

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(morgan("combined"));

  registerRoutes(app);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return app;
};
