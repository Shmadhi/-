import { createInsertSchema } from "drizzle-zod";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const consultationsTable = pgTable("consultations", {
  id: text("id").primaryKey(),
  shareToken: text("share_token").notNull().unique(),
  patientName: text("patient_name").notNull(),
  patientAge: text("patient_age").notNull(),
  appointmentDate: text("appointment_date").notNull(),
  symptoms: text("symptoms").notNull(),
  onsetDate: text("onset_date").notNull(),
  symptomNotes: text("symptom_notes").notNull(),
  medications: jsonb("medications").notNull().$type<Array<{ name: string; dose: string; schedule: string }>>(),
  conditions: jsonb("conditions").notNull().$type<string[]>(),
  attachments: jsonb("attachments").notNull().$type<Array<{ name: string; type: string; size: string }>>(),
  voiceNote: text("voice_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertConsultationSchema = createInsertSchema(consultationsTable).omit({
  id: true,
  shareToken: true,
  createdAt: true,
});

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultationsTable.$inferSelect;
