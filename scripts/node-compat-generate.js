'use strict';

/**
 * Node.js 14+ compatibility fix for Hexo 3.7.1 `hexo generate`.
 *
 * Root cause: Hexo 3.7.1's built-in `CacheStream` overrides `.destroy()` to clear
 * `this._cache.length = 0`. Starting in Node.js 14, `stream.Transform` enables
 * `autoDestroy: true` by default, calling `.destroy()` on stream end BEFORE
 * `cacheStream.getCache()` is written to disk — silently outputting 0-byte files.
 *
 * This script overrides the `generate` console command to buffer each Hexo route
 * stream safely before writing to `public/`.
 */

const fs = require('fs');
const pathFn = require('path');

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

hexo.extend.console.register('generate', 'Generate static files (Node 14+ safe).', {
  options: [
    { name: '-d, --deploy', desc: 'Deploy after generated' },
    { name: '-f, --force', desc: 'Force regenerate' }
  ]
}, async function (args) {
  const start = Date.now();
  await this.load();

  const route = this.route;
  const publicDir = this.public_dir;
  const routes = route.list();

  fs.mkdirSync(publicDir, { recursive: true });

  let count = 0;
  for (const routePath of routes) {
    const stream = route.get(routePath);
    const data = await streamToBuffer(stream);
    const dest = pathFn.join(publicDir, routePath);
    fs.mkdirSync(pathFn.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, data);
    count++;
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  this.log.info('%d files generated in %ss (Node 14+ compat generator)', count, elapsed);

  if (args.d || args.deploy) {
    return this.call('deploy', args);
  }
});
