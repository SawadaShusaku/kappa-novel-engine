import { pgTable, serial, varchar, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const assetsTable = pgTable("assets", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }),
  key: varchar("key", { length: 50 }).unique(),
  filePath: text("file_path"),
});

export const charactersTable = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }),
  spriteKey: varchar("sprite_key", { length: 50 }).references(
    () => assetsTable.key,
  ),
});

export const scriptLinesTable = pgTable("script_lines", {
  id: serial("id").primaryKey(),
  chapter: integer("chapter"),
  sequence: integer("sequence"),
  speakerId: integer("speaker_id").references(() => charactersTable.id),
  bodyText: text("body_text"),
  bgKey: varchar("bg_key", { length: 50 }).references(() => assetsTable.key),
  effectCommand: varchar("effect_command", { length: 50 }),
  bgmKey: varchar("bgm_key", { length: 50 }).references(() => assetsTable.key),
  charId: varchar("char_id", { length: 50 }),
  expression: varchar("expression", { length: 50 }),
});

export const insertScriptLineSchema = createInsertSchema(scriptLinesTable).omit(
  { id: true },
);
export type InsertScriptLine = z.infer<typeof insertScriptLineSchema>;
export type ScriptLine = typeof scriptLinesTable.$inferSelect;
