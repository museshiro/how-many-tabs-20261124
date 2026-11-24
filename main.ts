// How Many Tabs Do You Have Open? — make.fun entry.
//
// The entry is one number, digits only: the honest count of open browser
// tabs. This program writes exactly that number to entry.txt — no trailing
// newline, no words, no punctuation — so the file is the number and
// nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TAB_COUNT = "83";

function validate(value: string): void {
  if (!/^\d{1,5}$/.test(value)) {
    throw new Error(
      `entry must be 1 to 5 digits, got ${JSON.stringify(value)}`,
    );
  }
  // A leading zero would read as padding, not as a count someone actually
  // has open. The only number allowed to start with 0 is 0 itself.
  if (value.length > 1 && value.startsWith("0")) {
    throw new Error(
      `entry must not have a leading zero, got ${JSON.stringify(value)}`,
    );
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
validate(TAB_COUNT);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TAB_COUNT, "utf8");
