const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Monorepo root (repo-root/apps/web -> ../..). Keeps the standalone trace
  // (node_modules + app files) consistent in local and Docker builds.
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../..'),
  },
};

module.exports = nextConfig;
