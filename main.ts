// Worst Fix Ever: Funniest Commit Message — make.fun entry.
// The program below emits exactly one commit message: the line a tired
// engineer would type after a "fix" that made the outage invisible.
// It is assembled from parts so the wording stays in one place, checked
// against the 100-character cap, then written out verbatim.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// Fragments of the commit subject, in order. Joining with single spaces
// keeps the line exactly one line with no trailing whitespace. The em dash
// is part of the joke's rhythm: setup, beat, punchline.
const fragments: string[] = [
  "fix: silence the 3am pager",
  "by deleting the alert",
  "— slept great, learned of the outage on Twitter",
];

// Every fragment must carry words; an empty one would hide a double space.
for (const part of fragments) {
  if (part.trim().length === 0) {
    fail("a fragment is empty");
  }
}

const message = fragments.join(" ");

const MAX_CHARS = 100;

function fail(reason: string): never {
  console.error(`entry rejected: ${reason}`);
  process.exit(1);
}

if (message.length === 0 || message.trim() !== message) {
  fail("message must be a non-empty line with no surrounding whitespace");
}
if (message.includes("\n") || message.includes("\r")) {
  fail("message must be a single line");
}
if (message.length > MAX_CHARS) {
  fail(`message is ${message.length} characters, over the ${MAX_CHARS} cap`);
}

mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
writeFileSync(OUTPUT_FILE, message, { encoding: "utf8" });

console.log(`wrote ${message.length} characters to ${OUTPUT_FILE}`);
