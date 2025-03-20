import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Conversion job schema
export const conversionJobs = pgTable("conversion_jobs", {
  id: serial("id").primaryKey(),
  originalFileName: text("original_file_name").notNull(),
  originalFilePath: text("original_file_path").notNull(),
  outputFilePath: text("output_file_path"),
  status: text("status").notNull().default("queued"),
  progress: integer("progress").notNull().default(0),
  error: text("error"),
  fileSize: integer("file_size").notNull(),
  outputFileSize: integer("output_file_size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertConversionJobSchema = createInsertSchema(conversionJobs).omit({
  id: true,
  outputFilePath: true,
  status: true,
  progress: true,
  error: true,
  outputFileSize: true, 
  createdAt: true,
  updatedAt: true,
});

export type InsertConversionJob = z.infer<typeof insertConversionJobSchema>;
export type ConversionJob = typeof conversionJobs.$inferSelect;

// User schema is kept the same
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
