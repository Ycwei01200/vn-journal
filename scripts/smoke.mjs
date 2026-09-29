import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

function readRoute(route) {
  const file = path.join(dist, route, 'index.html');
  assert.ok(existsSync(file), `Expected built route: ${route || '/'}`);
  return readFileSync(file, 'utf8');
}

const home = readRoute('');
const reviews = readRoute('reviews');
const playLog = readRoute('play-log');
const about = readRoute('about');
const reviewTemplate = readRoute('reviews/review-template');
const playLogTemplate = readRoute('play-log/play-log-template');

assert.match(home, /<html[^>]+lang="zh-Hant"/);
assert.match(home, /<h1>TWILIGHT ARCHIVE<\/h1>/, 'Homepage title should use the requested English wordmark');
assert.match(home, /<title>TWILIGHT ARCHIVE｜Visual Novel Journal<\/title>/, 'Homepage document title should match its wordmark');
assert.match(home, /property="og:title" content="TWILIGHT ARCHIVE｜Visual Novel Journal"/, 'Homepage social title should match its wordmark');
assert.ok(home.includes('鳥於天空 魚於海洋 你於彼方'), 'Homepage caption should use the requested exact copy');
for (const label of ['START', 'RECORD', 'ABOUT']) {
  assert.match(home, new RegExp(`>${label}<`), `Title menu is missing ${label}`);
}
for (const href of ['/vn-journal/reviews/', '/vn-journal/play-log/', '/vn-journal/about/']) {
  assert.ok(home.includes(href), `Title menu is missing the GitHub Pages base path ${href}`);
}
assert.match(home, /aria-label="(?:Title|標題).{0,20}(?:menu|選單)"/i);

assert.match(reviews, /遊戲評論|評論索引/);
assert.match(reviews, /<title>遊戲評論｜TWILIGHT ARCHIVE<\/title>/, 'Interior page document title should use the updated site brand');
assert.match(reviews, /尚未刊出/);
assert.ok(!reviews.includes('此處填入含劇情的文字'), 'Review index leaked the spoiler template text');
assert.ok(!reviews.includes('review-template'), 'Review index exposed the unlisted template route');
assert.match(playLog, /遊玩記錄|遊玩日誌/);
assert.match(playLog, /尚未刊出/);
assert.ok(!playLog.includes('請填入你實際遊玩的記錄'), 'Play log index exposed its template');

assert.match(reviewTemplate, /範本預覽/);
const detailStart = reviewTemplate.indexOf('<details');
const detailEnd = reviewTemplate.indexOf('</details>', detailStart);
assert.ok(detailStart >= 0 && detailEnd > detailStart, 'Review spoiler copy must be inside a native details disclosure');
assert.ok(!/\<details\b[^>]*\bopen(?:[ =]|>)/i.test(reviewTemplate), 'Spoiler disclosure must start closed');
assert.ok(reviewTemplate.indexOf('此處填入含劇情的文字') < detailEnd, 'Spoiler copy must stay inside the disclosure');
assert.match(reviewTemplate, /story-frame|故事畫格/);
assert.match(reviewTemplate, /writing-mode:\s*vertical-rl|class="[^"]*vertical-rail/);
assert.match(about, /評論版型預覽/);
assert.match(about, /遊玩記錄版型預覽/);
assert.match(playLogTemplate, /範本預覽/);

console.log('Smoke checks passed: routes, base paths, menu, templates, and closed spoiler disclosure.');
