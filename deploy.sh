#!/usr/bin/env bash
# =============================================================================
# BaziGB — one-command production deploy (Docker Compose stack)
#
#   ./deploy.sh               # use existing .env
#   ./deploy.sh --logs        # deploy and tail logs
#   ./deploy.sh --rebuild     # force full rebuild (no cache)
#   ./deploy.sh down          # stop the stack
#   ./deploy.sh status        # container status
#
# Requirements on the VPS: Docker + Docker Compose plugin (see DEPLOY.md).
# =============================================================================
set -euo pipefail

cd "$(dirname "$0")"

CMD="${1:-up}"

if [[ "$CMD" == "down" ]]; then
  docker compose down
  exit 0
fi

if [[ "$CMD" == "status" ]]; then
  docker compose ps
  exit 0
fi

# --- .env bootstrap ----------------------------------------------------------
if [[ ! -f .env ]]; then
  echo "→ .env not found. Creating from .env.example — EDIT IT before continuing!"
  cp .env.example .env
  echo "✋  Edit .env now (POSTGRES_PASSWORD, JWT_SECRET, DOMAIN), then re-run ./deploy.sh"
  exit 1
fi

# --- build & start -----------------------------------------------------------
EXTRA=()
if [[ "$CMD" == "--rebuild" ]]; then
  EXTRA+=(--no-cache)
elif [[ "$CMD" == "--logs" ]]; then
  EXTRA+=(--build)
fi

echo "→ Building images (first run takes a few minutes)..."
docker compose build "${EXTRA[@]}"

echo "→ Starting stack: db + server + web + caddy"
docker compose up -d

echo "→ Waiting for services to become healthy..."
sleep 5
docker compose ps

echo ""
echo "✅ Done. Stack is running."
if [[ "$CMD" == "--logs" ]]; then
  docker compose logs -f --tail=50
else
  echo "   Logs:  docker compose logs -f"
  echo "   Stop:  ./deploy.sh down"
fi
