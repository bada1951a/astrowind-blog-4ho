import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { normalizeBoldWhitespace, normalizeFaqArtifacts, validateFaqStructure } from '../generation-markdown.mjs';

import {
  createCheckpointKey,
  createLegacyCheckpointKey,
  createTopicFileSlug,
  decidePublishLocales,
} from '../generation-identity.mjs';

test('a prompt update invalidates cached drafts but the same version can resume', () => {
  const topics = ['Assigned topic', 'Next topic'];
  const v1 = createCheckpointKey(topics, 'prompt-v1');
  const resumed = createCheckpointKey(topics, 'prompt-v1');
  const v2 = createCheckpointKey(topics, 'prompt-v2');

  assert.equal(resumed, v1);
  assert.notEqual(v2, v1);
});

test('the topic slug is stable when later queue rows change', () => {
  const slug = createTopicFileSlug('Assigned topic');

  assert.equal(createTopicFileSlug('Assigned topic'), slug);
  assert.equal(createTopicFileSlug('Assigned topic').startsWith('post-'), true);
  assert.notEqual(createTopicFileSlug('Different topic'), slug);
});

test('checkpoint identity follows the current topic and prompt version, not later queue rows', () => {
  const topics = ['Assigned topic', 'Next topic'];
  const key = createCheckpointKey(topics, 'prompt-v1');

  assert.equal(createCheckpointKey(['Assigned topic', 'Edited next topic'], 'prompt-v1'), key);
  assert.equal(createCheckpointKey(['Assigned topic', 'Next topic', 'Added topic'], 'prompt-v1'), key);
  assert.notEqual(createCheckpointKey(['Different topic', 'Next topic'], 'prompt-v1'), key);
  assert.notEqual(createCheckpointKey(topics, 'prompt-v2'), key);
});

test('legacy checkpoint key preserves the full topic queue identity for safe migration', () => {
  const topics = ['Assigned topic', 'Next topic'];
  const key = createLegacyCheckpointKey(topics, 'prompt-v1');

  assert.equal(createLegacyCheckpointKey([...topics], 'prompt-v1'), key);
  assert.notEqual(createLegacyCheckpointKey(['Assigned topic', 'Edited next topic'], 'prompt-v1'), key);
});

test('generator migrates an exact-queue legacy cache before removing other keys', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');

  assert.match(source, /const legacyCheckpointDir = path\.join\(checkpointRoot, legacyCheckpointKey\)/);
  assert.match(
    source,
    /fs\.existsSync\(legacyCheckpointDir\)[\s\S]*?fs\.renameSync\(legacyCheckpointDir, checkpointDir\)/
  );
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
  assert.ok(source.includes('Write concise headings in the target language that fit ${currentTopic}'));
  assert.ok(source.includes('Do not use generic boilerplate, promise guaranteed resolution times or outcomes'));
  assert.ok(source.includes('never copy their brackets or placeholder text'));
  assert.ok(source.includes('roughly 30% engaging narration and transitions'));
  assert.ok(source.includes('70% accurate explanations'));
});

test('generator prompt keeps recognizable scenarios generic and source-grounded', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');
  assert.ok(source.includes('Open at a concrete, topic-specific symptom, decision, or question'));
  assert.ok(source.includes('A short illustrative example is optional'));
  assert.ok(source.includes('without a canned hypothetical-scene disclaimer'));
  assert.ok(source.includes('Never present an invented example as the narrator’s or a customer’s real experience'));
  assert.ok(source.includes('do not invent named people, places, companies, quotations, or outcomes'));
  assert.ok(source.includes('instead of flattening the article into neutral exposition'));
  assert.ok(source.includes('allow generic roles without identifying details'));
  const localeStart = source.indexOf('const TARGET_LANGS = [');
  const localeEnd = source.indexOf('const delay =', localeStart);
  const localeContexts = source
    .slice(localeStart, localeEnd)
    .split('\n')
    .filter((line) => line.includes('localeContext:'))
    .join('\n')
    .toLowerCase();
  for (const place of [
    'seoul',
    'pangyo',
    'silicon valley',
    'new york',
    'tokyo',
    'marunouchi',
    'shibuya',
    'paris la défense',
    'madrid',
    'barcelona',
    'milano',
    'avenida paulista',
    'são paulo',
    'zuidas',
    'amsterdam',
    'warszawa',
    'sudirman central business district',
    'jakarta',
    'quận 1',
    'hồ chí minh',
  ]) {
    assert.equal(
      localeContexts.includes(place),
      false,
      'locale context must not seed a city or office scene: ' + place
    );
  }
  assert.equal(localeContexts.match(/localecontext:/g)?.length, 12);
  assert.ok(source.includes("GENERATION_PROMPT_VERSION = '2026-10-30-neutral-narrator-v3'"));
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

test('locale personas avoid unsupported credentials or experience claims', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');
  const personas = [...source.matchAll(/persona:\s*(['"])(.*?)\1/g)].map((match) => match[2].toLowerCase());
  assert.equal(personas.length, 12);
  const unsupportedClaim =
    /(experienced|senior|expert|engineer|technician|specialist|professional|consultant|architect|現役|経験|専門家|エンジニア|기술자|전문가|경력|수리 기사|실무 경험|técnico|experto|especialista|technicien|ingénieur|esperto|experiente|techniker|ingenieur|serwisant|inżynier|chuyên gia|kỹ sư|teknisi senior)/i;
  for (const persona of personas) {
    assert.equal(
      unsupportedClaim.test(persona),
      false,
      'Persona must not imply credentials or personal experience: ' + persona
    );
    assert.ok(persona.length > 0);
  }
});

test('FAQ cleanup is bounded by section headings, preserves fenced examples, then validates', () => {
  const source = readFileSync(new URL('../generate-all.mjs', import.meta.url), 'utf8');
  assert.ok(source.includes('normalizeFaqArtifacts(healed)'));
  const malformedFaq = [
    '## 4. Notes',
    '**',
    'A note with **bold** text.',
    '## 5. Frequently Asked Questions (FAQ)',
    '',
    '**',
    '**Q1.** Question one?**',
    '**',
    '**A1.** Answer one.**',
    '',
    '**Q2.** Question two?**',
    '**',
    '**A2.** Answer two.**',
    '',
    '**Q3.** Question three?**',
    '**',
    '**A3.** Answer three.**',
    '```markdown',
    '**',
    '**Literal example**',
    '```',
    '## Sources',
    '**',
    'A source note with **bold** text.',
  ].join('\n');

  const normalized = normalizeFaqArtifacts(malformedFaq);
  assert.ok(normalized.includes('## 4. Notes\n**\nA note with **bold** text.'));
  assert.ok(normalized.includes('```markdown\n**\n**Literal example**\n```'));
  assert.ok(normalized.includes('## Sources\n**\nA source note with **bold** text.'));
  assert.equal(normalized.includes('## 5. Frequently Asked Questions (FAQ)\n\n**\n'), false);
  assert.match(normalized, /\*\*Q1\.\*\* Question one\?\n\n\*\*A1\.\*\* Answer one\./);
  assert.match(normalized, /\*\*Q2\.\*\* Question two\?\n\n\*\*A2\.\*\* Answer two\./);
  assert.match(normalized, /\*\*Q3\.\*\* Question three\?\n\n\*\*A3\.\*\* Answer three\./);
  assert.ok(normalized.includes('**A3.** Answer three.\n```markdown'));
});
