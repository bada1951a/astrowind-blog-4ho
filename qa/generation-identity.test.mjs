import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { normalizeBoldWhitespace, validateFaqStructure } from '../generation-markdown.mjs';

import { createCheckpointKey, createLegacyCheckpointKey, createTopicFileSlug, decidePublishLocales } from '../generation-identity.mjs';

test('checkpoint identity follows the current topic and prompt version, not later queue rows', () => {
  const topics = ['Assigned topic', 'Next topic'];
  const v1 = createCheckpointKey(topics, 'prompt-v1');
  const resumed = createCheckpointKey(topics, 'prompt-v1');
  const changedTail = createCheckpointKey(['Assigned topic', 'Edited next topic'], 'prompt-v1');
  const addedTail = createCheckpointKey(['Assigned topic', 'Next topic', 'Another topic'], 'prompt-v1');
  const changedCurrentTopic = createCheckpointKey(['Different topic', 'Next topic'], 'prompt-v1');
  const v2 = createCheckpointKey(topics, 'prompt-v2');

  assert.equal(resumed, v1);
  assert.equal(changedTail, v1);
  assert.equal(addedTail, v1);
  assert.notEqual(changedCurrentTopic, v1);
  assert.notEqual(v2, v1);
});

test('the topic slug is stable when later queue rows change', () => {
  const slug = createTopicFileSlug('Assigned topic');

  assert.equal(createTopicFileSlug('Assigned topic'), slug);
  assert.equal(createTopicFileSlug('Assigned topic').startsWith('post-'), true);
  assert.notEqual(createTopicFileSlug('Different topic'), slug);
});

test('legacy full-queue checkpoints remain identifiable only for an unchanged queue', () => {
  const topics = ['Assigned topic', 'Next topic'];
  const legacy = createLegacyCheckpointKey(topics, 'prompt-v1');

  assert.equal(createLegacyCheckpointKey([...topics], 'prompt-v1'), legacy);
  assert.notEqual(createLegacyCheckpointKey(['Assigned topic', 'Edited next topic'], 'prompt-v1'), legacy);
  assert.notEqual(createLegacyCheckpointKey(['Different topic', 'Next topic'], 'prompt-v1'), legacy);
});

test('generator migrates an exact-queue legacy cache before removing other keys', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');

  assert.match(source, /const legacyCheckpointDir = path\.join\(checkpointRoot, legacyCheckpointKey\)/);
  assert.match(source, /fs\.existsSync\(legacyCheckpointDir\)[\s\S]*?fs\.renameSync\(legacyCheckpointDir, checkpointDir\)/);
});

const publicationTargets = ['ko', 'en', 'ja', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'id', 'vi'].map((code) => ({
  code,
}));

test('publication gate allows exactly passing locales at 9/12, 10/12, and 12/12', () => {
  const nine = decidePublishLocales(
    publicationTargets,
    publicationTargets.slice(0, 9).map(({ code }) => code)
  );
  assert.equal(nine.canPublish, false);
  assert.deepEqual(
    nine.passingCodes,
    publicationTargets.slice(0, 9).map(({ code }) => code)
  );
  assert.deepEqual(
    nine.failedCodes,
    publicationTargets.slice(9).map(({ code }) => code)
  );

  const ten = decidePublishLocales(
    publicationTargets,
    publicationTargets.slice(0, 10).map(({ code }) => code)
  );
  assert.equal(ten.canPublish, true);
  assert.deepEqual(ten.passingLocales, publicationTargets.slice(0, 10));
  assert.deepEqual(
    ten.failedCodes,
    publicationTargets.slice(10).map(({ code }) => code)
  );

  const twelve = decidePublishLocales(
    publicationTargets,
    publicationTargets.map(({ code }) => code)
  );
  assert.equal(twelve.canPublish, true);
  assert.deepEqual(twelve.passingLocales, publicationTargets);
  assert.deepEqual(twelve.failedCodes, []);
});

test('generator uses the tested publication plan to gate and select written locales', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');
  assert.match(source, /decidePublishLocales\(TARGET_LANGS, \[\.\.\.generatedPostContents\.keys\(\)\], 10\)/);
  assert.match(source, /if \(!publication\.canPublish\)/);
  assert.match(source, /for \(const lang of publication\.passingLocales\)/);
});

test('generator prompt specifies a topic-fit first-person narrative and practical balance', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');
  assert.ok(source.includes('roughly 30% narrator reasoning'));
  assert.ok(source.includes('70% practical explanations'));
});

test('FAQ cleanup preserves separate Q/A lines, blank lines, and rejects collapsed pairs', () => {
  const validFaq = [
    '**Q1.** What does the prompt change?',
    '',
    '**A1.** It changes the instruction context.',
    '',
    '**Q2.** Should I use one prompt for every task?',
    '',
    '**A2.** No. Match the instruction to the task.',
    '',
    '**Q3.** How can I check the result?',
    '',
    '**A3.** Compare the output against the requested format.',
  ].join('\n');
  const normalized = normalizeBoldWhitespace(validFaq);

  assert.equal(validateFaqStructure(normalized).length, 0);
  assert.match(normalized, /\*\*Q1\.\*\* What does the prompt change\?\n\n\*\*A1\.\*\*/);
  assert.match(normalized, /\*\*Q2\.\*\* Should I use one prompt for every task\?\n\n\*\*A2\.\*\*/);
  assert.match(normalized, /\*\*Q3\.\*\* How can I check the result\?\n\n\*\*A3\.\*\*/);

  const collapsedFaq = [
    '**Q1.** What does the prompt change? **A1.** It changes the instruction context.',
    '**Q2.** Should I use one prompt for every task? **A2.** No. Match the instruction to the task.',
    '**Q3.** How can I check the result? **A3.** Compare the output against the requested format.',
  ].join('\n');
  const errors = validateFaqStructure(normalizeBoldWhitespace(collapsedFaq));

  assert.ok(errors.some((error) => error.includes('별도 줄')));
  assert.ok(errors.some((error) => error.includes('한 줄에 함께')));

  const missingBlankLineFaq = validFaq.replace(/\n\n\*\*A1\./, '\n**A1.');
  assert.ok(validateFaqStructure(missingBlankLineFaq).some((error) => error.includes('빈 줄')));
});
