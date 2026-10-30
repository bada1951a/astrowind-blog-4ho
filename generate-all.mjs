// =========================================================================
// 📌 [고정 식별자] 이 파일은 '4호기' 전용 스크립트입니다.
// ⚠️ [혼동 방지 경고]
// 1. 이 파일은 '4호기 (Prompt Engineering)'입니다. 2-1호기나 다른 호기와 절대 혼동하지 말 것!
// 2. 카테고리는 대표님의 지시 전까지 'Prompt Engineering'으로 영구 고정한다. (임의 변경 절대 금지)
// 3. 이미지 경로는 main의 Picsum 시드 선택 로직을 유지한다.
// 4. 대표님과의 모든 설명, 질문, 대화 및 주석은 반드시 100% 한국어로만 진행한다.
// =========================================================================

import fs from 'fs';
import path from 'path';
import { createHash, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { normalizeBoldWhitespace, validateFaqStructure } from './generation-markdown.mjs';
import { createCheckpointKey, createTopicFileSlug, decidePublishLocales } from './generation-identity.mjs';

const GENERATION_PROMPT_VERSION = '2026-10-30-generic-grounded-scenarios-v1';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}
const POSTS_BASE_DIR = path.resolve('src/data/post');
const TOPICS_FILE = path.resolve('topics.txt');

// =========================================================================
// [4호기 전용] 100% 무에러 영구 고정 Picsum 실사 CDN 매핑
// =========================================================================
function getPostImages(topic, index) {
  const seedBase = Date.now().toString(36);
  const coverSeed = `prompt-${seedBase}-${index}-c`;
  const bodySeed = `prompt-${seedBase}-${index}-b`;

  return {
    coverUrl: `https://picsum.photos/seed/${coverSeed}/1200/675.jpg`,
    bodyUrl: `https://picsum.photos/seed/${bodySeed}/1000/550.jpg`,
  };
}

// =========================================================================
// 한국 시간(KST) 기준 안전한 당일 발행 날짜 생성 함수
// =========================================================================
function getKstPublishDateIso() {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = kst.getUTCFullYear();
  const month = kst.getUTCMonth() + 1;
  const day = kst.getUTCDate();
  return new Date(Date.UTC(year, month - 1, day, 10, 30, 0)).toISOString();
}

function refreshPublishDate(text, publishDate) {
  const frontmatterMatch = text.match(/^---\r?\n[\s\S]*?\r?\n---(?=\r?\n)/);
  if (!frontmatterMatch) throw new Error('Checkpoint has no frontmatter.');
  const dateLines = frontmatterMatch[0].match(/^publishDate:\s*.*$/gm) || [];
  if (dateLines.length !== 1) throw new Error('Checkpoint must have exactly one publishDate field.');
  const updatedFrontmatter = frontmatterMatch[0].replace(/^publishDate:\s*.*$/m, 'publishDate: ' + publishDate);
  return updatedFrontmatter + text.slice(frontmatterMatch[0].length);
}

const CURRENT_PUBLISH_DATE = getKstPublishDateIso();

// =========================================================================
// [4호기 전용] 12개국 100% 현지어 섹션 제목 및 치환 딕셔너리 (영구 고정)
// =========================================================================
const I18N_SECTIONS = {
  ko: {
    s1: '1. AI 답변 퀄리티 붕괴와 업무 멘붕의 순간',
    s2: '2. 프롬프트 실패와 AI 환각(Hallucination)의 핵심 원인',
    s3: '3. 바로 복사해 쓰는 실전 마스터 프롬프트 템플릿',
    s4: '4. 현직 프롬프트 엔지니어가 전하는 실무 팁 및 주의사항',
    s5: '5. 자주 묻는 질문 (FAQ)',
    tags: ['프롬프트엔지니어링', 'ChatGPT', 'Claude', '생성형AI'],
  },
  en: {
    s1: '1. Critical AI Hallucination & Output Collapse Crisis',
    s2: '2. Root Cause Breakdown of Prompt Failures and Logic Flaws',
    s3: '3. Copy-and-Paste Master Prompt Engineering Template',
    s4: '4. Professional Prompt Architect Precautions & Tips',
    s5: '5. Frequently Asked Questions (FAQ)',
    tags: ['Prompt Engineering', 'ChatGPT', 'Claude', 'Generative AI'],
  },
  ja: {
    s1: '1. AIの回答精度崩壊と業務停滞の緊急事態',
    s2: '2. プロンプト失敗とハルシネーションの根本原因',
    s3: '3. すぐに使える実践マスタープロンプトテンプレート',
    s4: '4. 現役AIプロンプト専門家が教える注意点とコツ',
    s5: '5. よくある質問 (FAQ)',
    tags: ['プロンプトエンジニアリング', 'ChatGPT', 'Claude', '生成AI'],
  },
  de: {
    s1: '1. Kritischer KI-Halluzinations- und Qualitätsnotfall',
    s2: '2. Detaillierte Ursachenanalyse von Prompt- und Logikfehlern',
    s3: '3. Sofort einsetzbare Master-Prompt-Vorlage',
    s4: '4. Praxistipps und Warnungen vom Prompt-Architekten',
    s5: '5. Häufig gestellte Fragen (FAQ)',
    tags: ['Prompt-Engineering', 'ChatGPT', 'Claude', 'Generative KI'],
  },
  fr: {
    s1: "1. Crise d'hallucination de l'IA et panne de productivité",
    s2: '2. Analyse approfondie des échecs de prompt et failles logiques',
    s3: "3. Modèle de prompt maître pratique prêt à l'emploi",
    s4: "4. Conseils et précautions d'un ingénieur de prompt",
    s5: '5. Foire Aux Questions (FAQ)',
    tags: ['Prompt Engineering', 'ChatGPT', 'Claude', 'IA Générative'],
  },
  es: {
    s1: '1. Crisis crítica de alucinación de la IA y bloqueo de tareas',
    s2: '2. Análisis de causas raíz de errores de prompt y lógica',
    s3: '3. Plantilla maestra de prompt lista para copiar y usar',
    s4: '4. Consejos y advertencias de un arquitecto de prompts',
    s5: '5. Preguntas Frecuentes (FAQ)',
    tags: ['Ingeniería de Prompts', 'ChatGPT', 'Claude', 'IA Generativa'],
  },
  it: {
    s1: "1. Emergenza improvvisa per allucinazioni dell'IA e risposte errate",
    s2: '2. Analisi approfondita dei fallimenti di prompt e logica',
    s3: "3. Template master di prompt pratico pronto all'uso",
    s4: "4. Avvertenze e suggerimenti dell'architetto di prompt",
    s5: '5. Domande Frequenti (FAQ)',
    tags: ['Ingegneria dei Prompt', 'ChatGPT', 'Claude', 'IA Generativa'],
  },
  pt: {
    s1: '1. Situação de emergência com alucinações e erros da IA',
    s2: '2. Análise da causa raiz de falhas em prompts e raciocínio',
    s3: '3. Template mestre de prompt pronto para copiar e colar',
    s4: '4. Recomendações e alertas de especialistas em prompt',
    s5: '5. Perguntas Frequentes (FAQ)',
    tags: ['Engenharia de Prompt', 'ChatGPT', 'Claude', 'IA Generativa'],
  },
  nl: {
    s1: '1. Noodsituatie door AI-hallucinaties en onbruikbare output',
    s2: '2. Grondige analyse van mislukte prompts en denkfouten van het model',
    s3: '3. Direct bruikbare master prompt template',
    s4: '4. Belangrijke adviezen van professionele prompt engineers',
    s5: '5. Veelgestelde Vragen (FAQ)',
    tags: ['Prompt Engineering', 'ChatGPT', 'Claude', 'Generatieve AI'],
  },
  pl: {
    s1: '1. Awaryjna sytuacja związana z halucynacjami i błędami AI',
    s2: '2. Szczegółowa analiza przyczyn nieudanych promptów i luk w logice',
    s3: '3. Gotowy szablon master promptu do natychmiastowego użycia',
    s4: '4. Wskazówki i ostrzeżenia profesjonalnego inżyniera promptów',
    s5: '5. Najczęściej zadawane pytania (FAQ)',
    tags: ['Inżynieria Promptów', 'ChatGPT', 'Claude', 'Generatywna AI'],
  },
  id: {
    s1: '1. Situasi Kritis Akibat Halusinasi AI dan Output Menyesatkan',
    s2: '2. Analisis Mendalam Kegagalan Prompt dan Kerusakan Logika',
    s3: '3. Templat Master Prompt Siap Pakai yang Sangat Efektif',
    s4: '4. Tips & Peringatan Penting Pakar Prompt Engineering',
    s5: '5. Pertanyaan yang Sering Diajukan (FAQ)',
    tags: ['Prompt Engineering', 'ChatGPT', 'Claude', 'AI Generatif'],
  },
  vi: {
    s1: '1. Tình huống khẩn cấp do AI trả lời ảo giác và sai lệch',
    s2: '2. Phân tích nguyên nhân gốc rễ lỗi câu lệnh và logic AI',
    s3: '3. Mẫu câu lệnh Master Prompt thực chiến sao chép dùng ngay',
    s4: '4. Lời khuyên và lưu ý quan trọng từ kỹ sư thiết kế câu lệnh',
    s5: '5. Các câu hỏi thường gặp (FAQ)',
    tags: ['Prompt Engineering', 'ChatGPT', 'Claude', 'AI Tạo Sinh'],
  },
};

// =========================================================================
// 🛡️ [4호기 자가 검수 및 치유 엔진: Self-Healing Inspector]
// =========================================================================
function inspectAndHealMarkdown(body, langCode) {
  let healed = body.trim();
  void langCode;
  const auditLogs = [];

  // 1) 헤딩 내부 볼드 제거 및 4호기 표준 소제목 강제 안착
  healed = healed.replace(/^(#{1,6}\s+)\*\*(.*?)\*\*/gm, '$1$2');
  healed = healed.replace(/^#{1,6}\s*1[.\s]+([^\n]+)/m, (_match, title) => `## 1. ${title.trim()}`);
  healed = healed.replace(/^#{1,6}\s*2[.\s]+([^\n]+)/m, (_match, title) => `## 2. ${title.trim()}`);
  healed = healed.replace(/^#{1,6}\s*3[.\s]+([^\n]+)/m, (_match, title) => `## 3. ${title.trim()}`);
  healed = healed.replace(/^#{1,6}\s*4[.\s]+([^\n]+)/m, (_match, title) => `## 4. ${title.trim()}`);
  healed = healed.replace(/^#{1,6}\s*5[.\s]+([^\n]+)/m, (_match, title) => `## 5. ${title.trim()}`);

  // 2) 🛡️ Q&A 줄바꿈 뭉개짐 자동 분리 치유 (질문과 답변 사이 빈 줄 2개 보장)
  const rawQnACount = (healed.match(/Q[1-3]\./gi) || []).length;
  if (rawQnACount > 0) {
    healed = healed.replace(/\s*(\*\*Q[1-3]\.\*\*|Q[1-3]\.)\s*/gi, '\n\n**$1** ');
    healed = healed.replace(/\s*(\*\*A[1-3]\.\*\*|A[1-3]\.)\s*/gi, '\n\n**$1** ');
    healed = healed.replace(/\*\*\s*\*\*(Q[1-3]\.|A[1-3]\.)\*\*\s*\*\*/gi, '**$1**');
    healed = healed.replace(/\*\*(Q[1-3]\.|A[1-3]\.)\*\*/gi, '**$1**');
    auditLogs.push('Q&A 줄바꿈 2열 분리 치유');
  }

  // 3) 줄바꿈을 넘지 않도록 한 Markdown 굵게 표식 안의 공백만 정돈한다.
  const normalizedBoldWhitespace = normalizeBoldWhitespace(healed);
  if (normalizedBoldWhitespace !== healed) {
    healed = normalizedBoldWhitespace;
    auditLogs.push('볼드 공백 정돈');
  }

  // 4) 특수문자 및 수식 인라인 백틱화
  healed = healed.replace(/\$(?:Strg|Ctrl|Win|Shift|Alt|Esc)\s*[^$\n]*\$/gi, (match) => {
    return `\`${match.replace(/\$/g, '').trim()}\``;
  });
  healed = healed.replace(/\$([A-Za-z0-9_-]+)\$/g, '`$1`');
  healed = healed
    .replace(/\\times/g, 'x')
    .replace(/\\circ/g, '°')
    .replace(/\\approx/g, '≈')
    .replace(/~/g, '-');

  // 5) 연속 빈 줄 압축
  healed = healed.replace(/\n{3,}/g, '\n\n').trim();

  if (auditLogs.length > 0) {
    console.log(`   🩺 [자가 치유 완료]: ${auditLogs.join(' | ')}`);
  }

  return healed;
}

if (!fs.existsSync(TOPICS_FILE)) {
  console.error('❌ topics.txt 파일이 존재하지 않습니다.');
  process.exit(1);
}

const fileContent = fs.readFileSync(TOPICS_FILE, 'utf-8');
const lines = fileContent
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

if (lines.length === 0) {
  console.log('⚠️ topics.txt에 남은 주제가 없습니다. 생성을 건너뜁니다.');
  process.exit(0);
}

const currentTopic = lines[0];
const topicKey = createCheckpointKey(lines, GENERATION_PROMPT_VERSION);
const checkpointRoot = path.resolve('.generation-checkpoints');
const checkpointDir = path.join(checkpointRoot, topicKey);
const checkpointEncryptionKey = createHash('sha256')
  .update('blog-locale-checkpoint-v1\0', 'utf8')
  .update(OPENAI_API_KEY, 'utf8')
  .digest();

function readEncryptedCheckpoint(filePath) {
  const envelope = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (envelope.version !== 1) throw new Error('체크포인트 형식 버전이 다릅니다.');
  const decipher = createDecipheriv('aes-256-gcm', checkpointEncryptionKey, Buffer.from(envelope.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(envelope.authTag, 'base64'));
  return Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext, 'base64')), decipher.final()]).toString(
    'utf8'
  );
}

function writeEncryptedCheckpoint(filePath, text) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', checkpointEncryptionKey, iv);
  const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const envelope = {
    version: 1,
    iv: iv.toString('base64'),
    authTag: cipher.getAuthTag().toString('base64'),
    ciphertext: ciphertext.toString('base64'),
  };
  fs.writeFileSync(filePath, JSON.stringify(envelope), 'utf8');
}
console.log(`📌 오늘 처리할 주제 [4호기 AI Prompt Engineering]: "${currentTopic}"`);

const THEME_PRESETS = [
  {
    id: 1,
    name: 'Cyberpunk Terminal',
    primaryColor: '#00ffcc',
    bgColor: '#111827',
    layout: 'CLI/터미널 스타일, 핵심 프롬프트 한 줄 최상단 배치',
  },
  {
    id: 2,
    name: 'Modern Minimalist Slate',
    primaryColor: '#3b82f6',
    bgColor: '#f8fafc',
    layout: '미니멀 가이드 스타일, 여백 중심의 깔끔한 단계별 프롬프트 빌딩',
  },
  {
    id: 3,
    name: 'Industrial Blueprint',
    primaryColor: '#f59e0b',
    bgColor: '#1e293b',
    layout: '엔지니어링 청사진 스타일, 프롬프트 구조 분해 및 전후 비교표 포함',
  },
  {
    id: 4,
    name: 'Retro Monokai',
    primaryColor: '#a6e22e',
    bgColor: '#272822',
    layout: '개발자 에디터 스타일, 실전 프롬프트 코드 박스 중심 전개, 디버깅 팁',
  },
  {
    id: 5,
    name: 'Nordic Clean Ice',
    primaryColor: '#0284c7',
    bgColor: '#f0f9ff',
    layout: '북유럽 감성 클린 레이아웃, 인용구 중심 도입부, 실전 체크리스트',
  },
];

const TARGET_LANGS = [
  {
    code: 'ko',
    name: 'Korean',
    persona: '친절하고 실무 경험이 많은 AI 프롬프트 아키텍트 및 생산성 컨설턴트',
    osUi: 'ChatGPT, Claude, Gemini, 프롬프트 입력창, 시스템 프롬프트 설정',
    localeContext: '서울/판교 IT 오피스 및 기업 전략 기획 부서',
  },
  {
    code: 'en',
    name: 'English',
    persona: 'Senior AI prompt engineer and LLM automation specialist',
    osUi: 'ChatGPT, Claude, Gemini, System Instructions, Artifacts',
    localeContext: 'Silicon Valley tech startup / New York creative & marketing agency',
  },
  {
    code: 'ja',
    name: 'Japanese',
    persona: 'プロンプトエンジニアリングと生成AI活用を分かりやすく教える現役AIアーキテクト',
    osUi: 'ChatGPT, Claude, Gemini, システムプロンプト, アーティファクト',
    localeContext: '東京・丸の内および渋谷のITビジネスオフィス',
  },
  {
    code: 'de',
    name: 'German',
    persona: 'Erfahrener Prompt-Architekt und Berater für generative KI-Systeme',
    osUi: 'ChatGPT, Claude, Gemini, Systemanweisungen, Einstellungen',
    localeContext: 'German-language readers in everyday work and personal settings',
  },
  {
    code: 'fr',
    name: 'French',
    persona: "Ingénieur en prompt design et spécialiste de la productivité par l'IA",
    osUi: 'ChatGPT, Claude, Gemini, Instructions système, Paramètres',
    localeContext: "Agences de conseil et sièges d'entreprise à Paris La Défense",
  },
  {
    code: 'es',
    name: 'Spanish',
    persona: 'Especialista en ingeniería de prompts y optimización con modelos LLM',
    osUi: 'ChatGPT, Claude, Gemini, Instrucciones personalizadas, Artifacts',
    localeContext: 'Oficinas corporativas y consultoras en Madrid y Barcelona',
  },
  {
    code: 'it',
    name: 'Italian',
    persona: "Architetto di prompt esperto nell'automazione aziendale con intelligenza artificiale",
    osUi: 'ChatGPT, Claude, Gemini, Istruzioni di sistema, Impostazioni',
    localeContext: 'Studi professionali e agenzie digitali a Milano',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    persona: 'Especialista em engenharia de prompts e automação prática com IA generativa',
    osUi: 'ChatGPT, Claude, Gemini, Instruções personalizadas, Configurações',
    localeContext: 'Polos de inovação e empresas na Avenida Paulista em São Paulo',
  },
  {
    code: 'nl',
    name: 'Dutch',
    persona: 'Nederlandse prompt engineer en specialist in generatieve AI-tools',
    osUi: 'ChatGPT, Claude, Gemini, Systeeminstructies, Instellingen',
    localeContext: 'Zuidas en innovatiehubs in Amsterdam',
  },
  {
    code: 'pl',
    name: 'Polish',
    persona: 'Architekt promptów i praktyk narzędzi generatywnej sztucznej inteligencji',
    osUi: 'ChatGPT, Claude, Gemini, Instrukcje systemowe, Ustawienia',
    localeContext: 'Warszawski sektor IT i nowoczesne centra biznesowe',
  },
  {
    code: 'id',
    name: 'Indonesian',
    persona: 'Praktisi AI prompt engineering dan otomatisasi workflow digital',
    osUi: 'ChatGPT, Claude, Gemini, Instruksi kustom, Pengaturan',
    localeContext: 'Kawasan bisnis Sudirman Central Business District (SCBD) Jakarta',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    persona: 'Chuyên gia thiết kế câu lệnh AI (Prompt Engineer) và tự động hóa công việc',
    osUi: 'ChatGPT, Claude, Gemini, Hướng dẫn hệ thống, Cài đặt',
    localeContext: 'Tòa nhà văn phòng công nghệ cao tại Quận 1, TP. Hồ Chí Minh',
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const fileSlug = createTopicFileSlug(currentTopic);
const generatedPostContents = new Map();

// 이전 주제 체크포인트를 정리하고, 같은 topics 큐의 검증된 언어 원고는 실패 뒤 재사용합니다.
if (fs.existsSync(checkpointRoot)) {
  for (const entry of fs.readdirSync(checkpointRoot, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== topicKey) {
      fs.rmSync(path.join(checkpointRoot, entry.name), { recursive: true, force: true });
    }
  }
}

if (fs.existsSync(checkpointDir)) {
  for (const fileName of fs.readdirSync(checkpointDir)) {
    if (fileName.endsWith('.md')) {
      fs.unlinkSync(path.join(checkpointDir, fileName));
    }
  }
}

// =========================================================================
// [호출 함수] maxOutputTokens: 8192 (2,500자 정량 생성 최적화)
// =========================================================================
async function fetchWithRetry(prompt, maxRetries = 3, delayMs = 3000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-6-luna',
          reasoning: { effort: 'none' },
          max_output_tokens: 8192,
          input: prompt,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        const message = payload?.error?.message || `HTTP ${response.status}`;
        throw new Error(`OpenAI API 오류: ${message}`);
      }

      const generatedText = (payload.output || [])
        .flatMap((item) => item.content || [])
        .filter((item) => item.type === 'output_text')
        .map((item) => item.text || '')
        .join('\n')
        .trim();

      if (!generatedText) throw new Error('OpenAI 응답에 글 본문이 없습니다.');
      return generatedText;
    } catch (error) {
      console.warn(`⚠️ [호출 재시도 ${attempt}/${maxRetries}]: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await delay(delayMs * attempt);
    }
  }
  throw new Error('OpenAI API 호출이 최대 재시도 횟수를 초과했습니다.');
}

function validateGeneratedPost(text, langCode) {
  const fm = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  if (!fm) return ['frontmatter 구분자 누락'];
  const body = text.slice(fm[0].length).trim();
  const errors = [];
  for (const field of ['title', 'description', 'publishDate', 'image']) {
    if (!new RegExp('^' + field + ':\\s*\\S', 'm').test(fm[1])) errors.push(field + ' 누락');
  }
  const description = fm[1].match(/^description:\s*["']?([^\r\n"']*)/m)?.[1]?.trim() || '';
  if (description.length > 160) errors.push('description 160자 초과');
  if (!/^image:\s*["']?https?:\/\//m.test(fm[1])) errors.push('image URL 형식 오류');

  const bodyWithoutCode = body.replace(/```[\s\S]*?```/g, ' ');
  const plainBody = bodyWithoutCode
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+\]\([^)]+\)/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/^#+\s*/gm, '')
    .replace(/[>*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const nonSpaceLength = [...plainBody].filter((char) => !/\s/u.test(char)).length;
  const words = [...plainBody.matchAll(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu)].length;
  if ((bodyWithoutCode.match(/^##\s+/gm) || []).length !== 5) errors.push('H2 섹션은 정확히 5개여야 함');
  errors.push(...validateFaqStructure(bodyWithoutCode));
  if (langCode === 'ko' && nonSpaceLength < 1800) errors.push('한국어 본문 공백 제외 1,800자 미만');
  if (langCode === 'ko' && nonSpaceLength > 3600) errors.push('한국어 본문 공백 제외 3,600자 초과');
  if (langCode === 'ja' && nonSpaceLength < 900) errors.push('일본어 본문 공백 제외 900자 미만');
  if (!['ko', 'ja'].includes(langCode) && words < 650) errors.push('본문 650단어 미만');
  if (!['ko', 'ja'].includes(langCode) && words > 1500) errors.push('본문 1,500단어 초과');

  const hangulCount = (plainBody.match(/[가-힣]/g) || []).length;
  const kanaCount = (plainBody.match(/[\u3040-\u30ff]/g) || []).length;
  const latinCount = (plainBody.match(/\p{Script=Latin}/gu) || []).length;
  if (langCode === 'ko' && hangulCount < 300) errors.push('한국어 본문 한글 문자 부족');
  if (langCode === 'ja' && kanaCount < 80) errors.push('일본어 본문 가나 문자 부족');
  if (langCode !== 'ko' && hangulCount > 0) errors.push('비한국어 본문에 한글 포함');
  if (langCode !== 'ja' && kanaCount > 40) errors.push('일본어 외 본문에 가나 문자 과다 포함');
  if (!['ko', 'ja'].includes(langCode) && latinCount < words * 0.6)
    errors.push('본문 문자 체계가 라틴 문자 locale과 맞지 않음');
  return errors;
}
async function generateSinglePost(lang, index) {
  const checkpointPath = path.join(checkpointDir, `${lang.code}.enc`);
  if (fs.existsSync(checkpointPath)) {
    try {
      const cachedText = readEncryptedCheckpoint(checkpointPath);
      const refreshedCachedText = refreshPublishDate(cachedText, CURRENT_PUBLISH_DATE);
      const cachedErrors = validateGeneratedPost(refreshedCachedText, lang.code);
      if (cachedErrors.length === 0) {
        if (refreshedCachedText !== cachedText) {
          writeEncryptedCheckpoint(checkpointPath, refreshedCachedText);
        }
        generatedPostContents.set(lang.code, refreshedCachedText);
        console.log(`\n♻️ [${index + 1}/12] ${lang.name} (${lang.code}) 암호화된 검증 원고 재사용`);
        return true;
      }
      fs.unlinkSync(checkpointPath);
      console.warn(`⚠️ ${lang.code} 체크포인트 검수 실패로 다시 생성합니다: ${cachedErrors.join(', ')}`);
    } catch {
      fs.unlinkSync(checkpointPath);
      console.warn(`⚠️ ${lang.code} 암호화 체크포인트를 읽을 수 없어 다시 생성합니다.`);
    }
  }

  const selectedTheme = THEME_PRESETS[Math.floor(Math.random() * THEME_PRESETS.length)];
  const i18n = I18N_SECTIONS[lang.code] || I18N_SECTIONS.ko;

  console.log(
    `\n🚀 [${index + 1}/12] ${lang.name} (${lang.code}) 4호기 애드센스 표준 생성 중... (테마: ${selectedTheme.name})`
  );

  const { coverUrl, bodyUrl } = getPostImages(currentTopic, index);
  const pubDateIso = CURRENT_PUBLISH_DATE;

  // 🎯 [애드센스 승인 최적화 프롬프트: 2,400~2,600자 정량화]
  const prompt = `
Write an original practical prompt-engineering guide natively in ${lang.name}, with independent wording and examples for this locale. This is a separate locale-specific article generation call, not a translation.
Topic: "${currentTopic}"
Audience and cultural context: "${lang.localeContext}"
Do not force a hallucination, token, temperature, or master-prompt discussion unless it directly applies. Do not claim personal experience or credentials. Do not invent model behavior, facts, quotations, customer cases, or outcomes.

Length and style:
- Korean: about 2,400–2,600 characters, maximum 3,000 characters.
- Other locales: about 900–1,100 words (Japanese: at least 900 non-space characters).
- Aim for an engaging opening and transitions (about 30%) and useful, accurate explanation and actionable steps (about 70%).
- Carry a natural first-person storytelling voice through the article. Aim for roughly 30% narrator reasoning, decisions, and transitions and 70% practical explanations, verifiable steps, and safety information. Use first person to explain what the guide would check and why; do not claim real personal events, credentials, customer cases, or results.
- In the opening paragraph, present a generic, recognizable situation directly related to the topic and the key unresolved question. Describe it generally or conditionally; do not frame it as a particular event that happened. Never invent named people, places/cities, companies, or customers. Do not invent customer stories/quotes or specific first-hand events unless supported by the topic or reliable source material. Generic recognizable situations may refer to a role without identifying anyone. Answer in useful stages, using first-person reasoning and brief transitions to give readers a reason to continue. Avoid clickbait, exaggeration, fabricated personal or customer experiences, hypothetical-scene disclaimers, and rigid opening formulas; phrase this naturally for the locale.
- Write idiomatic ${lang.name}, not translated wording. Localize examples and UI labels only when relevant.

Write exactly five numbered H2 headings in ${lang.name}, numbered 1 through 5. Write concise headings in the target language that fit ${currentTopic} and each section's content. Do not use generic boilerplate, promise guaranteed resolution times or outcomes, or imply unverified professional credentials. The bracketed descriptions below are instructions; never copy their brackets or placeholder text into the article.
## 1. [topic-specific opening heading]
Introduce a generic, recognizable situation directly connected to "${currentTopic}". Describe it generally or conditionally, not as a specific event that happened. Never invent named people, places/cities, companies, or customers. Do not invent customer stories/quotes or specific first-hand events unless supported by the topic or reliable source material. Generic situations may refer to a role without identifying anyone.
## 2. [topic-specific heading in ${lang.name}]
Explain topic-specific causes, limits, and clues. Avoid generic model claims that do not apply.
## 3. [topic-specific heading in ${lang.name}]
Give clear steps or a reusable template only if it directly helps solve this topic.
## 4. [topic-specific heading in ${lang.name}]
Explain relevant precautions, common mistakes, and how to check the result.
## 5. [topic-specific heading in ${lang.name}]
Provide exactly three useful Q&A pairs with a blank line between each question and answer:
**Q1.** Localized question

**A1.** Clear, useful answer.

**Q2.** Localized question

**A2.** Clear, useful answer.

**Q3.** Localized question

**A3.** Clear, useful answer.

Use reliable sources for factual claims and include links only when you can identify a relevant source accurately. Do not add filler. Use Markdown, keep headings free of bold markers, and put prompt text/settings in inline code. ${lang.code !== 'ko' ? '- Do not use Korean characters.' : ''}

Return only raw Markdown with this frontmatter:
---
title: "Native clear title in ${lang.name}"
description: "Native concise description in ${lang.name}, maximum 160 characters"
publishDate: ${pubDateIso}
image: "${coverUrl}"
category: "Prompt Engineering"
tags: ${JSON.stringify(i18n.tags)}
theme: "${selectedTheme.name}"
---`;

  try {
    const normalizeGeneratedResponse = (rawText) => {
      let text = rawText.trim();
      if (text.startsWith('```markdown')) text = text.replace(/^```markdown\n/, '').replace(/\n```$/, '');
      if (text.startsWith('```')) text = text.replace(/^```\n/, '').replace(/\n```$/, '');

      const fmMatch = text.match(/^---[\s\S]*?---\n*/);
      if (fmMatch) {
        let frontmatter = fmMatch[0].trim();
        let body = text.slice(fmMatch[0].length).trim();
        body = body.replace(/^#\s+[^\n]+\n+/, '');

        // ⚠️ 4호기 카테고리 'Prompt Engineering' 영구 보존 강제 검증
        frontmatter = frontmatter
          .replace(/category:\s*["'][^"']*["']/i, 'category: "Prompt Engineering"')
          .replace(/category:\s*[^\n\r]+/i, 'category: "Prompt Engineering"');

        // 🩺 [자가 검수 및 치유 엔진 가동]
        body = inspectAndHealMarkdown(body, lang.code);

        if (lang.code === 'ko') {
          console.log(`   📏 [4호기 본문 최종 글자 수] ${body.length}자 (애드센스 표준: 2,400~2,600자)`);
        }

        // 본문 중간 이미지 배치 (2번 섹션 직전)
        const safeAlt = currentTopic
          .replaceAll('[', '')
          .replaceAll(']', '')
          .replaceAll('(', '')
          .replaceAll(')', '')
          .replaceAll('"', '')
          .replaceAll("'", '')
          .trim();
        const middleImageMarkdown = `\n\n![${safeAlt} Prompt Guide](${bodyUrl})\n\n`;

        if (!body.includes(bodyUrl)) {
          if (body.includes('## 2.')) {
            body = body.replace(/(##\s*2\.[^\n]+)/, `${middleImageMarkdown}$1`);
          } else {
            body = `${middleImageMarkdown}${body}`;
          }
        }

        text = `${frontmatter}\n\n${body}\n`;
      }

      return text;
    };

    let text = normalizeGeneratedResponse(await fetchWithRetry(prompt));
    let validationErrors = validateGeneratedPost(text, lang.code);
    for (let correctionAttempt = 1; validationErrors.length > 0 && correctionAttempt <= 2; correctionAttempt++) {
      console.warn(
        `⚠️ ${lang.code} 검수 실패(${validationErrors.join(', ')}). 해당 언어 correction ${correctionAttempt}/2 요청합니다.`
      );
      const repairPrompt = `You are correcting one generated ${lang.name} article for "${currentTopic}".\n\nFailed validation checks: ${validationErrors.join(', ')}. Return the complete Markdown including original frontmatter. Preserve existing useful content and factual meaning. Correct only the listed failures. If H2 headings are missing or malformed, add five concise numbered headings in ${lang.name} that fit the topic and existing content. Avoid generic boilerplate, unsupported credentials, and guaranteed time or outcome claims. Reorganize relevant existing content without adding filler, unsupported facts, invented first-person experiences, or unsupported customer cases. Never invent named people, places/cities, companies, or customers; do not invent customer stories/quotes or specific first-hand events unless supported by the topic or reliable source material. Keep any scenario generic or conditional, and allow generic roles without identifying details. Preserve required FAQ markers and language. Return raw Markdown only.\n\nOriginal article:\n${text}`;
      text = normalizeGeneratedResponse(await fetchWithRetry(repairPrompt));
      validationErrors = validateGeneratedPost(text, lang.code);
    }
    if (validationErrors.length > 0) {
      throw new Error('발행 전 검수 실패(보정 2회 후): ' + validationErrors.join(', '));
    }

    fs.mkdirSync(checkpointDir, { recursive: true });
    writeEncryptedCheckpoint(checkpointPath, text);
    generatedPostContents.set(lang.code, text);
    console.log(`   ✅ [검증 완료] ${lang.code} 원고를 재실행 복구용 체크포인트로 보존했습니다.`);
    return true;
  } catch (error) {
    console.error(`❌ [최종 실패] ${lang.name} 생성 실패:`, error.message);
    return false;
  }
}

async function run() {
  console.log('==================================================');
  console.log('⚡ [4호기 AI Prompt Engineering] 12개 언어 원고 검증 및 게시 시작 (최소 10개 통과)');
  console.log('==================================================');

  for (let i = 0; i < TARGET_LANGS.length; i++) {
    await generateSinglePost(TARGET_LANGS[i], i);
    if (i < TARGET_LANGS.length - 1) await delay(2000);
  }

  const publication = decidePublishLocales(TARGET_LANGS, [...generatedPostContents.keys()], 10);
  const successCount = publication.passingCodes.length;
  const failedCodes = publication.failedCodes;
  if (!publication.canPublish) {
    console.error(
      `세트 중단: 검증 통과 ${successCount}/12개로 최소 기준 10개 미만입니다. 실패 언어: ${failedCodes.join(', ')}. 공개 글과 topics.txt는 그대로 두고 암호화 체크포인트를 보존합니다.`
    );
    process.exit(1);
  }

  // 유효한 locale만 게시 직전 재검증하고 기록합니다.
  for (const lang of publication.passingLocales) {
    const text = generatedPostContents.get(lang.code);
    if (typeof text !== 'string') throw new Error(`Missing validated locale checkpoint: ${lang.code}`);
    const errors = validateGeneratedPost(text, lang.code);
    if (errors.length) throw new Error(`${lang.code} 게시 직전 검증 실패: ${errors.join(', ')}`);
  }
  for (const lang of publication.passingLocales) {
    const text = generatedPostContents.get(lang.code);
    if (typeof text !== 'string') throw new Error(`Missing validated locale checkpoint: ${lang.code}`);
    const targetDir = path.join(POSTS_BASE_DIR, lang.code);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, `${fileSlug}.md`), text, 'utf-8');
  }

  lines.shift();
  fs.writeFileSync(TOPICS_FILE, lines.join('\n'), 'utf-8');
  console.log(`\n🧹 ${successCount}/12개 언어를 게시하고 topics.txt에서 주제를 소비했습니다.`);
  if (failedCodes.length > 0) console.warn(`⚠️ 이번 세트에서 제외된 언어: ${failedCodes.join(', ')}`);
  console.log(`📊 남은 주제 수: ${lines.length}개`);
}

run();
