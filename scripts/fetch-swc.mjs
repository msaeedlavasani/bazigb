// Downloads @next/swc-linux-x64-gnu into node_modules when npm could not
// install it (the committed lockfile only pins the macOS binary, and the VPS
// npm registry is flaky). Used by the Dockerfile.web deps stage.
import { mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const url =
  'https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-14.2.33.tgz';
const dest = 'node_modules/@next/swc-linux-x64-gnu';

for (let i = 1; i <= 5; i++) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(120000), redirect: 'follow' });
    if (!r.ok) throw new Error('http ' + r.status);
    mkdirSync(dest, { recursive: true });
    writeFileSync('/tmp/swc.tgz', Buffer.from(await r.arrayBuffer()));
    execSync(`tar xzf /tmp/swc.tgz -C ${dest} --strip-components=1`);
    console.log('swc downloaded OK');
    process.exit(0);
  } catch (e) {
    console.error('swc download attempt ' + i + ' failed: ' + e.message);
    if (i < 5) await new Promise((res) => setTimeout(res, 5000));
  }
}
process.exit(1);
