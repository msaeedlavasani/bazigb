#!/usr/bin/env bash
# BaziGB — Server restart helper (port 3001)
# Usage: ./scripts/restart-server.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-3001}"
LOG="${LOG:-/tmp/bazigb_server_3001.log}"

echo "==> Stopping existing server on port ${PORT}..."
PID="$(lsof -ti tcp:${PORT} || true)"
if [ -n "${PID}" ]; then
  kill "${PID}" 2>/dev/null || true
  sleep 2
  # force if still alive
  if kill -0 "${PID}" 2>/dev/null; then
    kill -9 "${PID}" 2>/dev/null || true
  fi
  echo "    stopped PID ${PID}"
else
  echo "    nothing was running"
fi

echo "==> Starting server (ts-node) from ${ROOT}/apps/server..."
cd "${ROOT}/apps/server"
nohup npx ts-node src/main.ts > "${LOG}" 2>&1 &

# wait for it to come up
for i in $(seq 1 30); do
  if curl -s -o /dev/null --max-time 2 "http://localhost:${PORT}/auth/me"; then
    echo "==> Server is UP on http://localhost:${PORT}"
    echo "    Logs: ${LOG}"
    exit 0
  fi
  sleep 1
done

echo "!! Server did not respond in time — check logs: ${LOG}"
tail -20 "${LOG}"
exit 1
