import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const checks = [
  {
    source: "src/lib/web3/pool.ts",
    abi: "src/lib/contracts/abi/PredictionPool.json",
  },
  {
    source: "src/lib/web3/factory.ts",
    abi: "src/lib/contracts/abi/PredictionFactory.json",
  },
  {
    source: "src/app/(app)/try-contracts/factory/page.tsx",
    abi: "src/lib/contracts/abi/PredictionFactory.json",
  },
];

let failed = false;

for (const { source, abi } of checks) {
  const abiEntries = JSON.parse(readFileSync(resolve(root, abi), "utf8"));
  const abiFunctions = new Set(
    abiEntries.filter((entry) => entry.type === "function").map((entry) => entry.name)
  );
  const sourceText = readFileSync(resolve(root, source), "utf8");
  const usedFunctions = new Set(
    [...sourceText.matchAll(/functionName:\s*["']([^"']+)["']/g)].map(
      (match) => match[1]
    )
  );

  for (const functionName of usedFunctions) {
    if (!abiFunctions.has(functionName)) {
      console.error(
        `${source}: "${functionName}" is missing from ${abi}`
      );
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(`ABI check passed for ${checks.length} source files.`);
