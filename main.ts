#!/usr/bin/env node
/**
 * The Funniest Office Joke, Judged Head to Head — make.fun entry.
 *
 * Writes one original one-line joke about office life to
 * /output/entry.txt.
 *
 * The joke turns on something anyone who has worked in an office
 * recognises — the Wi-Fi password that changes without warning — and
 * lands its punchline in the last words: with the network down, the
 * only thing still connecting the team is the resentment they share.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "The office Wi-Fi password changed again, and now the only thing connecting this team is shared resentment.";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

function validLine(text: string): boolean {
  if (text.length === 0 || text.length > 200) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  if (text.trim().length === 0) return false;
  return true;
}

function main(): number {
  const text = LINE.trim();
  if (!validLine(text)) {
    console.error(`invalid entry line: ${text.length} chars`);
    return 1;
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text + "\n", "utf-8");

  // Read it back and confirm exactly the entry line plus one newline,
  // and that what landed on disk still passes the gate on its own.
  const written = readFileSync(OUTPUT_PATH, "utf-8");
  const writtenLine = written.replace(/\n$/, "");
  if (written !== text + "\n" || !validLine(writtenLine)) {
    console.error("written entry failed validation");
    return 1;
  }

  console.log(`wrote ${text.length} chars to ${OUTPUT_PATH}`);
  console.log(`entry: ${text}`);
  return 0;
}

process.exit(main());
