#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "==> Deploy root: $ROOT_DIR"
echo "==> Installing dependencies"
npm install

echo "==> Building Strapi"
npm run build:cms

echo "==> Building Next.js"
npm run build:web

echo "==> Restarting PM2 apps"
if pm2 describe wft-web >/dev/null 2>&1 && pm2 describe wft-cms >/dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi

echo "==> Saving PM2 process list"
pm2 save

echo "==> Current PM2 status"
pm2 status

echo "==> Listening ports"
ss -ltnp | grep -E '3000|1337' || true
