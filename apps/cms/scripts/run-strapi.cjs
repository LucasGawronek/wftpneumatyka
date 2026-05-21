const { spawnSync } = require("node:child_process");
const path = require("node:path");

const strapiPackageJson = require.resolve("@strapi/strapi/package.json");
const strapiBin = path.join(path.dirname(strapiPackageJson), "bin", "strapi.js");
const existingNodeOptions = process.env.NODE_OPTIONS?.trim();
const maxOldSpaceSize = process.env.WFT_STRAPI_MAX_OLD_SPACE_SIZE?.trim() || "8192";
const nodeOptions = [
  existingNodeOptions,
  `--max-old-space-size=${maxOldSpaceSize}`,
].filter(Boolean);

const result = spawnSync(process.execPath, [strapiBin, ...process.argv.slice(2)], {
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
