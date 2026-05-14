const { spawnSync } = require("node:child_process");

const nextBin = require.resolve("next/dist/bin/next");
const existingNodeOptions = process.env.NODE_OPTIONS?.trim();
const nodeOptions = [
  existingNodeOptions,
  "--max-old-space-size=4096",
].filter(Boolean);

const result = spawnSync(process.execPath, [nextBin, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions.join(" "),
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
