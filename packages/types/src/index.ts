import { z } from "zod";

export const idSchema = z.string().cuid();

export const contactSchema = z.object({
  id: idSchema.optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  address: z.string().min(1),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  source: z.enum(["Web", "Thumbtack", "Meta", "Referral", "Other"]).default("Web"),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([])
});

export const jobStatusSchema = z.enum([
  "LEAD",
  "QUOTE",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "INVOICED",
  "PAID"
]);

export const jobSchema = z.object({
  id: idSchema.optional(),
  contactId: idSchema,
  title: z.string().min(1),
  description: z.string().optional(),
  status: jobStatusSchema,
  serviceWindow: z.string().datetime().optional(),
  startTime: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  address: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional()
});

export const quoteLineItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive().default(1),
  unitPrice: z.number().nonnegative(),
  surcharge: z.number().nonnegative().default(0),
  taxRateId: z.string().optional()
});

export const quoteSchema = z.object({
  id: idSchema.optional(),
  contactId: idSchema,
  number: z.string().min(1),
  status: z.enum(["DRAFT", "SENT", "APPROVED", "DECLINED"]),
  subtotal: z.number().nonnegative(),
  taxTotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  depositRequired: z.number().nonnegative().default(0),
  notes: z.string().optional(),
  lineItems: z.array(quoteLineItemSchema).default([])
});

export const invoiceSchema = z.object({
  id: idSchema.optional(),
  contactId: idSchema,
  number: z.string().min(1),
  status: z.enum(["DRAFT", "SENT", "PARTIAL", "PAID", "VOID"]),
  subtotal: z.number().nonnegative(),
  taxTotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  balance: z.number().nonnegative(),
  currency: z.string().default("USD"),
  lineItems: z.array(quoteLineItemSchema).default([])
});

export type ContactInput = z.infer<typeof contactSchema>;
export type JobInput = z.infer<typeof jobSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
