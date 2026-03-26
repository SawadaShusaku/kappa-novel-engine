import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { scriptLinesTable, charactersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/chapters/:chapter/lines", async (req, res) => {
  const chapter = parseInt(req.params.chapter, 10);
  if (isNaN(chapter)) {
    res.status(400).json({ error: "Invalid chapter number" });
    return;
  }

  const lines = await db
    .select({
      id: scriptLinesTable.id,
      chapter: scriptLinesTable.chapter,
      sequence: scriptLinesTable.sequence,
      speakerId: scriptLinesTable.speakerId,
      speakerName: charactersTable.name,
      bodyText: scriptLinesTable.bodyText,
      bgKey: scriptLinesTable.bgKey,
      effectCommand: scriptLinesTable.effectCommand,
      bgmKey: scriptLinesTable.bgmKey,
      charId: scriptLinesTable.charId,
      expression: scriptLinesTable.expression,
    })
    .from(scriptLinesTable)
    .leftJoin(
      charactersTable,
      eq(scriptLinesTable.speakerId, charactersTable.id),
    )
    .where(eq(scriptLinesTable.chapter, chapter))
    .orderBy(scriptLinesTable.sequence);

  res.json(lines);
});

router.get("/lines/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const results = await db
    .select({
      id: scriptLinesTable.id,
      chapter: scriptLinesTable.chapter,
      sequence: scriptLinesTable.sequence,
      speakerId: scriptLinesTable.speakerId,
      speakerName: charactersTable.name,
      bodyText: scriptLinesTable.bodyText,
      bgKey: scriptLinesTable.bgKey,
      effectCommand: scriptLinesTable.effectCommand,
      bgmKey: scriptLinesTable.bgmKey,
      charId: scriptLinesTable.charId,
      expression: scriptLinesTable.expression,
    })
    .from(scriptLinesTable)
    .leftJoin(
      charactersTable,
      eq(scriptLinesTable.speakerId, charactersTable.id),
    )
    .where(eq(scriptLinesTable.id, id));

  if (results.length === 0) {
    res.status(404).json({ error: "Script line not found" });
    return;
  }

  res.json(results[0]);
});

export default router;
