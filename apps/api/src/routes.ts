import type { Express } from "express";

import { contactsRouter } from "./routes/contacts";
import { jobsRouter } from "./routes/jobs";
import { quotesRouter } from "./routes/quotes";
import { invoicesRouter } from "./routes/invoices";
import { paymentsRouter } from "./routes/payments";
import { accountingRouter } from "./routes/accounting";

export const registerRoutes = (app: Express) => {
  app.use("/contacts", contactsRouter);
  app.use("/jobs", jobsRouter);
  app.use("/quotes", quotesRouter);
  app.use("/invoices", invoicesRouter);
  app.use("/payments", paymentsRouter);
  app.use("/accounting", accountingRouter);
};
