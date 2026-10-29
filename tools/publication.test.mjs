import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
test('assessor materials are excluded from Git', async () => {
  const ignore = await readFile('.gitignore', 'utf8');
  assert.ok(ignore.split(/\r?\n/).includes('local-assessor/'));
});
test('public site contains only web assets', async () => {
  const entries = await readdir('site', { recursive: true });
  assert.ok(entries.includes('index.html'));
  assert.ok(entries.every((entry) => entry === 'assets' || /\.(html|css|js|jpg)$/.test(entry)));
  for (const entry of entries.filter((entry) => /\.(html|css|js)$/.test(entry))) {
    assert.doesNotMatch(await readFile(`site/${entry}`, 'utf8'), /assessor|rubric|seeded|defect catalogue|data-bug|scoring/i);
  }
});
test('cinema deployment uploads only the site folder', async () => {
  const workflow = await readFile('.github/workflows/pages.yml', 'utf8');
  const paths = [...workflow.matchAll(/^\s+path:\s*(.+)$/gm)].map((match) => match[1]);
  assert.deepEqual(paths, ['site']);
  assert.doesNotMatch(workflow, /local-assessor|playwright-report/);
});