import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
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
    coverUrl: `[https://picsum.photos/seed/$](https://picsum.photos/seed/$){coverSeed}/1200/675.jpg`,
    bodyUrl: `[https://picsum.photos/seed/$](https://picsum.photos/seed/$){bodySeed}/1000/550.jpg`
  };
}

// =========================================================================
// 한국 시간(KST) 기준 안전한 당일 발행 날짜 생성 함수
// =========================================================================
function getKstPublishDateIso(index) {
  const now = new Date();
  const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = kstTime.getUTCFullYear();
  const month = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstTime.getUTCDate()).padStart(2, '0');

  const minute = String((index * 5) % 60).padStart(2, '0');
  return `${year}-${month}-${day}T03:${minute}:00.000Z`;
}

// =========================================================================
// 본문 마크다운 별표(**) 및 서식 깨짐 원천 정제 함수
// =========================================================================
function sanitizeMarkdownFormatting(content) {
  let cleaned = content;

  // 1) 3개 이상 연달아 붙은 별표(***) 정제 -> **로 통일
  cleaned = cleaned.replace(/\*{3,}/g, '**');

  // 2) 별표 안쪽에 특수기호나 따옴표가 어긋나게 갇힌 경우 정제
  cleaned = cleaned.replace(/\*\*\[([^\]]+)\]\*\*/g, '[**$1**]');
  cleaned = cleaned.replace(/\*\*"([^"]+)"\*\*/g, '"**$1**"');
  cleaned = cleaned.replace(/\*\*'([^']+)'\*\*/g, '\'**$1**\'');

  // 3) 별표 시작 뒤 또는 끝 바로 앞에 공백이 있어 마크다운이 파싱되지 않는 경우 정제
  cleaned = cleaned.replace(/\*\*\s+([^\*\n]+?)\s+\*\*/g, '**$1**');
  cleaned = cleaned.replace(/\*\*\s+([^\*\n]+?)\*\*/g, '**$1**');
  cleaned = cleaned.replace(/\*\*([^\*\n]+?)\s+\*\*/g, '**$1**');

  // 4) 짝이 맞지 않는 고립된 단일 ** 제거 (홀수 개수로 남는 경우 방지)
  const lines = cleaned.split('\n');
  const fixedLines = lines.map(line => {
    if (line.trim().startsWith('```') || line.trim().startsWith('`')) return line;
    const matches = line.match(/\*\*/g);
    if (matches && matches.length % 2 !== 0) {
      const lastIdx = line.lastIndexOf('**');
      return line.slice(0, lastIdx) + line.slice(lastIdx + 2);
    }
    return line;
  });

  return fixedLines.join('\n');
}

if (!fs.existsSync(TOPICS_FILE)) {
  console.error("❌ topics.txt 파일이 존재하지 않습니다.");
  process.exit(1);
}

const fileContent = fs.readFileSync(TOPICS_FILE, 'utf-8');
const lines = fileContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

if (lines.length === 0) {
  console.log("⚠️ topics.txt에 남은 주제가 없습니다. 생성을 건너뜁니다.");
  process.exit(0);
}

const currentTopic = lines[0];
console.log(`📌 오늘 처리할 주제 (4호기 AI Prompt Engineering): "${currentTopic}"`);

// =========================================================================
// 30가지 고유 시각 스타일 및 레이아웃 프리셋 (AI 프롬프트/자동화 최적화)
// =========================================================================
const THEME_PRESETS = [
  { id: 1, name: "Cyberpunk Terminal", primaryColor: "#00ffcc", bgColor: "#111827", layout: "CLI/터미널 스타일, 핵심 프롬프트 한 줄 최상단 배치" },
  { id: 2, name: "Modern Minimalist Slate", primaryColor: "#3b82f6", bgColor: "#f8fafc", layout: "미니멀 가이드 스타일, 여백 중심의 깔끔한 단계별 프롬프트 빌딩" },
  { id: 3, name: "Industrial Blueprint", primaryColor: "#f59e0b", bgColor: "#1e293b", layout: "엔지니어링 청사진 스타일, 프롬프트 구조 분해 및 전후 비교표 포함" },
  { id: 4, name: "Retro Monokai", primaryColor: "#a6e22e", bgColor: "#272822", layout: "개발자 에디터 스타일, 실전 프롬프트 코드 박스 중심 전개, 디버깅 팁" },
  { id: 5, name: "Nordic Clean Ice", primaryColor: "#0284c7", bgColor: "#f0f9ff", layout: "북유럽 감성 클린 레이아웃, 인용구 중심 도입부, 실전 체크리스트" },
  { id: 6, name: "Dark Velvet Obsidian", primaryColor: "#a855f7", bgColor: "#0f172a", layout: "고급 다크 모드, 전문가 독점 시스템 프롬프트 배너, 단계별 튜닝 타임라인" },
  { id: 7, name: "Crimson Emergency Field", primaryColor: "#ef4444", bgColor: "#fff1f2", layout: "할루시네이션(환각) 방지 매뉴얼 스타일, 위험 경고 박스 최우선 강조" },
  { id: 8, name: "Forest Emerald Bio", primaryColor: "#10b981", bgColor: "#f0fdf4", layout: "생산성 10배 가이드 스타일, 시간 절약 지표 박스, 친절하고 명쾌한 어조" },
  { id: 9, name: "Solarized Amber Warm", primaryColor: "#d97706", bgColor: "#fef3c7", layout: "실무 프롬프트 공방 노트 스타일, 모델별(ChatGPT vs Claude) 비교표" },
  { id: 10, name: "Deep Ocean Cobalt", primaryColor: "#2563eb", bgColor: "#eff6ff", layout: "표준 AI 엔지니어링 지침서, 프롬프트 파라미터 심층 설명" },
  { id: 11, name: "Tokyo Neon Violet", primaryColor: "#8b5cf6", bgColor: "#2e1065", layout: "파워유저 아티팩츠 스타일, 웹앱 인터랙티브 코드 생성 팁" },
  { id: 12, name: "Graphite Technical Paper", primaryColor: "#475569", bgColor: "#f1f5f9", layout: "기술 백서 스타일, Few-Shot 가설 및 검증 절차, 표준화된 템플릿" },
  { id: 13, name: "High-Contrast Charcoal", primaryColor: "#e11d48", bgColor: "#18181b", layout: "고대비 경보 스타일, 데이터 유출 방지 수칙, 기업 보안 주의 팁" },
  { id: 14, name: "Warm Coffee Latte", primaryColor: "#78350f", bgColor: "#fefae0", layout: "초보자를 위한 친절한 AI 입문 수필, 쉬운 비유법, 차근차근 따라하기" },
  { id: 15, name: "Steel Silver Metallic", primaryColor: "#64748b", bgColor: "#e2e8f0", layout: "공식 벤치마크 리포트 스타일, 프롬프트 정확도 체크리스트" },
  { id: 16, name: "Sunset Horizon Coral", primaryColor: "#f97316", bgColor: "#fff7ed", layout: "크리에이티브 프롬프트 세팅 스타일, 생성물 전후 비교표" },
  { id: 17, name: "Mint Fresh Engineering", primaryColor: "#059669", bgColor: "#ecfdf5", layout: "가벼운 롤플레잉 프롬프트 매뉴얼, 불필요한 토큰 낭비 제거 팁" },
  { id: 18, name: "Midnight Navy Royal", primaryColor: "#1d4ed8", bgColor: "#172554", layout: "실무 배포 로그 스타일, 복잡한 다단계 체이닝 프롬프트 극복기" },
  { id: 19, name: "Matte Black stealth", primaryColor: "#ffffff", bgColor: "#09090b", layout: "전문 실무 가이드 스타일, 군더더기 배제, 직관적인 프롬프트 복사 블록" },
  { id: 20, name: "Teal Matrix Digital", primaryColor: "#14b8a6", bgColor: "#042f2e", layout: "API 및 Function Calling 프롬프트 스타일, JSON 스키마 점검표" },
  { id: 21, name: "Pastel Lavender Tech", primaryColor: "#7c3aed", bgColor: "#faf5ff", layout: "사용자 경험 중심 가이드, AI 활용 시 가장 자주 묻는 질문 5선 최상단 요약" },
  { id: 22, name: "Bronze Artisan Workshop", primaryColor: "#b45309", bgColor: "#fffbeb", layout: "미드저니/이미지 프롬프트 가이드, 카메라 렌즈 및 스타일 파라미터 목록" },
  { id: 23, name: "Cobalt Enterprise Lab", primaryColor: "#1e40af", bgColor: "#dbeafe", layout: "기업용 프롬프트 라이브러리 형식, 사내 도입 및 비용 절감 수치 인용" },
  { id: 24, name: "Rosewood Hardware Guide", primaryColor: "#be123c", bgColor: "#ffe4e6", layout: "LLM 모델별 특성 비교기, Claude Artifacts vs GPT Canvas 차이점" },
  { id: 25, name: "Deep Indigo System", primaryColor: "#4338ca", bgColor: "#e0e7ff", layout: "자동화 에이전트 프롬프트 분석 형식, 다단계 추론 체인 설계" },
  { id: 26, name: "Acid Lime Hacker Space", primaryColor: "#84cc16", bgColor: "#14532d", layout: "무료 오픈소스 AI 툴 가이드, 로컬 LLM 시스템 프롬프트 안내" },
  { id: 27, name: "Sandstone Desert Minimal", primaryColor: "#a16207", bgColor: "#fefce8", layout: "깔끔한 실무 매뉴얼 스타일, 소제목 하단 1줄 핵심 프롬프트 강조 배너" },
  { id: 28, name: "Dracula Purple Dev", primaryColor: "#bd93f9", bgColor: "#282a36", layout: "전통 드라큘라 테마 스타일, 필수 역량 주입 템플릿 하이라이트" },
  { id: 29, name: "Electric Cyan Speed", primaryColor: "#06b6d4", bgColor: "#ecfeff", layout: "초고속 1분 복붙 가이드 형식, 퀵 프롬프트 -> 심층 커스텀 2단계 분리" },
  { id: 30, name: "Pure Titanium Clean", primaryColor: "#334155", bgColor: "#ffffff", layout: "초고화질 매뉴얼 스타일, 볼드 타이포그래피 강조, 깔끔한 구분선" }
];

const TARGET_LANGS = [
  { code: 'ko', name: 'Korean', persona: '친절하고 실무 경험이 많은 AI 프롬프트 아키텍트 및 생산성 컨설턴트', osUi: 'ChatGPT, Claude, Gemini, 프롬프트 입력창, 시스템 프롬프트 설정', localeContext: '서울/판교 IT 오피스, 기획서 및 데이터 분석 자동화를 30분 만에 끝내야 하는 상황' },
  { code: 'en', name: 'English', persona: 'Senior AI prompt engineer and LLM automation specialist', osUi: 'ChatGPT, Claude, Gemini, System Instructions, Artifacts', localeContext: 'Silicon Valley tech startup / NYC marketing agency, automating executive briefings before morning sync' },
  { code: 'ja', name: 'Japanese', persona: 'プロンプトエンジニアリングと生成AI活用を分かりやすく教える現役AIアーキテクト', osUi: 'ChatGPT, Claude, Gemini, システムプロンプト, アーティファクト', localeContext: '東京・丸の内のオフィス, 企画書作成とリサーチ作業をAIで爆速化する緊急プロジェクト' },
  { code: 'de', name: 'German', persona: 'Erfahrener Prompt-Architekt und Berater für generative KI-Systeme', osUi: 'ChatGPT, Claude, Gemini, Systemanweisungen, Einstellungen', localeContext: 'Frankfurter Banken- und Consultingbereich, Automatisierung von Geschäftsberichten' },
  { code: 'fr', name: 'French', persona: 'Ingénieur en prompt design et spécialiste de la productivité par l\'IA', osUi: 'ChatGPT, Claude, Gemini, Instructions système, Paramètres', localeContext: 'Agence à Paris, création d\'un outil interactif avec Claude Artifacts en un temps record' },
  { code: 'es', name: 'Spanish', persona: 'Especialista en ingeniería de prompts y optimización con modelos LLM', osUi: 'ChatGPT, Claude, Gemini, Instrucciones personalizadas, Artifacts', localeContext: 'Oficina en Madrid, generación de código y análisis de mercado con IA para cliente clave' },
  { code: 'it', name: 'Italian', persona: 'Architetto di prompt esperto nell\'automazione aziendale con intelligenza artificiale', osUi: 'ChatGPT, Claude, Gemini, Istruzioni di sistema, Impostazioni', localeContext: 'Studio a Milano, sprint per sviluppare un prompt di copywriting e analisi dati' },
  { code: 'pt', name: 'Portuguese', persona: 'Especialista em engenharia de prompts e automação prática com IA generativa', osUi: 'ChatGPT, Claude, Gemini, Instruções personalizadas, Configurações', localeContext: 'Empresa de tecnologia em São Paulo, construindo fluxos de trabalho rápidos com LLMs' },
  { code: 'nl', name: 'Dutch', persona: 'Nederlandse prompt engineer en specialist in generatieve AI-tools', osUi: 'ChatGPT, Claude, Gemini, Systeeminstructies, Instellingen', localeContext: 'Zuidas Amsterdam, efficiëntie-verbetering met geavanceerde prompt-sjablonen' },
  { code: 'pl', name: 'Polish', persona: 'Architekt promptów i praktyk narzędzi generatywnej sztucznej inteligencji', osUi: 'ChatGPT, Claude, Gemini, Instrukcje systemowe, Ustawienia', localeContext: 'Warszawski sektor IT, tworzenie gotowych szablonów zapytań dla zespołu projektowego' },
  { code: 'id', name: 'Indonesian', persona: 'Praktisi AI prompt engineering dan otomatisasi workflow digital', osUi: 'ChatGPT, Claude, Gemini, Instruksi kustom, Pengaturan', localeContext: 'Kawasan bisnis Jakarta, percepatan pembuatan konten dan ringkasan data dengan AI' },
  { code: 'vi', name: 'Vietnamese', persona: 'Chuyên gia thiết kế câu lệnh AI (Prompt Engineer) và tự động hóa công việc', osUi: 'ChatGPT, Claude, Gemini, Hướng dẫn hệ thống, Cài đặt', localeContext: 'Văn phòng tại TP.HCM, ứng dụng Claude và ChatGPT tối ưu hóa công việc hàng daily' }
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const fileSlug = `post-${Date.now().toString(36)}`;

async function fetchWithRetry(prompt, maxRetries = 15, delayMs = 20000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.warn(`⚠️ [호출 재시도] ${attempt}/${maxRetries}:${error.message}`);
      if (attempt === maxRetries) throw error;
      await delay(delayMs);
    }
  }
}

async function generateSinglePost(lang, index) {
  const selectedTheme = THEME_PRESETS[Math.floor(Math.random() * THEME_PRESETS.length)];

  console.log(`\n🚀 [${index + 1}/12]${lang.name} (${lang.code}) 4호기 프롬프트 포스팅 생성 중... (적용 테마: ${selectedTheme.name})`);

  const { coverUrl, bodyUrl } = getPostImages(currentTopic, index);
  const pubDateIso = getKstPublishDateIso(index);

  const prompt = `
You are a ${lang.persona}.
Write a highly practical, conversational, 1st-person AI prompt engineering guide natively in ${lang.name}.
CRITICAL: DO NOT translate literally from Korean. Write completely from scratch as an authentic native AI architect working in THAT specific country/culture.

[Topic]
${currentTopic}

[Workplace Scenario]
Context: "${lang.localeContext}"

[CRITICAL OUTPUT LANGUAGE INTEGRITY - ZERO HANGUL IN GLOBAL POSTS]
- If target language is NOT Korean (ko):
  * Absolutely NEVER include any Korean Hangul characters (가-힣) anywhere in the title, description, tags, or body.
  * Every single character in the title and description MUST strictly be in native ${lang.name}.

[WRITING STYLE: PLAIN & PRACTICAL FOR EVERYDAY PROFESSIONALS]
1. Plain & Actionable:
    - Avoid overly academic mathematical theory.
    - Provide immediate copy-pasteable prompt templates and clear instructions matching: "${lang.osUi}".
2. Laser-Focused Narrative:
    - The opening emergency story MUST be 100% strictly about [Topic] (${currentTopic}).

[STRICT MARKDOWN & FORMATTING RULES - NO RENDERING GLITCHES]
1. BOLD FORMATTING RULE:
    - Standard markdown bold is strictly: **Word**
    - NEVER put brackets or quotes inside asterisks (FORBIDDEN: **[Word]**, **"Word"**). Instead write: [**Word**] or "**Word**".
    - NEVER leave space inside asterisks (FORBIDDEN: ** Word **).
2. COMMANDS & PROMPT TEMPLATES / CODE BLOCKS:
    - Always wrap copy-pasteable prompt templates, JSON schemas, or terminal commands in standard 3-backtick code blocks (\`\`\`markdown, \`\`\`json, or \`\`\`text) so they never overflow horizontally on mobile screens.
3. NO LATEX & NO TILDE:
    - ABSOLUTELY FORBIDDEN: NEVER use LaTeX math delimiters ($ or $$).
    - ABSOLUTELY FORBIDDEN: NEVER use tilde (~) for ranges (e.g., NEVER write "0~5s", "10~20%"). Always use a hyphen (e.g., "0-5s", "10-20%").

[Design Theme & Layout Dynamic Rules (MANDATORY)]
- Assigned Theme: "${selectedTheme.name}"
- Primary Accent Color: ${selectedTheme.primaryColor}
- Layout Characteristic: ${selectedTheme.layout}
- You MUST incorporate native Markdown and inline styled HTML callouts tailored to this theme.
- Use custom styled tip/warning boxes (e.g., <div style="border-left: 4px solid ${selectedTheme.primaryColor}; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">...</div>).
  * CRITICAL: All text inside callout/tip/warning boxes MUST be crisp dark charcoal/black (color: #111827) so it is 100% legible against any background.

[Tone & Writing Style Rules (STRICT - NO AI VIBE)]
1. Mandatory Opening:
    - Absolutely FORBIDDEN: Boring textbook intros like "Hello", "In this post", "Today we will explore".
    - Start immediately with an intense, relatable workplace emergency scenario strictly about [Topic].
2. Tone & Voice:
    - Write like a real colleague sharing an honest, battle-tested prompt trick on a developer/creator community.
3. Fast-Paced 3-Step Narrative:
    - Step 1: Sudden workflow panic regarding [Topic] set in ${lang.localeContext}.
    - Step 2: Vague prompts that failed and produced useless hallucinations.
    - Step 3: The breakthrough actionable prompt template & exact variables.

[Content & Structure (AdSense E-E-A-T Compliant)]
1. Opening Story: Intense real workplace incident strictly regarding this topic.
2. Root Cause / Architecture: Why simple prompting fails and the logic behind this prompt structure.
3. Master Prompt Template: Clear, copy-pasteable Markdown code block with placeholders (e.g., [Insert Data]).
4. Practical Variations / Safety Tips: Hallucination prevention, token saving, or system instructions.
5. Frequently Asked Questions (FAQ): Exactly 3 realistic, high-value Q&As that everyday users would ask.

[Length & Richness Rules]
- Korean (ko): Minimum 2,500 characters of rich, deep, non-repetitive text.
- Other languages: 1,200 to 1,500 words of thorough practical explanation.

[Strict Output Format]
Return ONLY raw Markdown starting directly with frontmatter:
---
title: "Native Catchy Title in ${lang.name}"
description: "Native concise description in ${lang.name} under 160 characters"
publishDate: ${pubDateIso}
image: "${coverUrl}"
category: "Prompt Engineering"
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "${selectedTheme.name}"
---
(Body starts directly here without H1 header)
`;

  try {
    let rawText = await fetchWithRetry(prompt);
    let text = rawText.trim();
    if (text.startsWith('```markdown')) text = text.replace(/^```markdown\n/, '').replace(/\n```$/, '');
    if (text.startsWith('```')) text = text.replace(/^```\n/, '').replace(/\n```$/, '');

    text = text.replace(/\$([^$]+)\$/g, '$1')
               .replace(/\\times/g, 'x')
               .replace(/\\circ/g, '°')
               .replace(/\\approx/g, '≈');

    // [취소선 버그 원천 차단 후처리]
    text = text.replace(/(\S)\s*~\s*(\S)/g, '$1 - $2');
    text = text.replace(/~/g, '-');

    if (lang.code !== 'ko') {
      text = text.replace(/(title:\s*")([^"]*)(")/g, (match, p1, p2, p3) => `${p1}${p2.replace(/[가-힣]+/g, '').trim()}${p3}`);
      text = text.replace(/(description:\s*")([^"]*)(")/g, (match, p1, p2, p3) => `${p1}${p2.replace(/[가-힣]+/g, '').trim()}${p3}`);
    }

    const fmMatch = text.match(/^---[\s\S]*?---\n*/);
    if (fmMatch) {
      let frontmatter = fmMatch[0];
      let body = text.slice(frontmatter.length).trim();
      body = body.replace(/^#\s+[^\n]+\n+/, '');

      // 4호기 영구 고정 단일 카테고리: Prompt Engineering
      frontmatter = frontmatter.replace(/category:\s*["'][^"']*["']/i, "category: 'Prompt Engineering'")
                               .replace(/category:\s*[^\n\r]+/i, "category: 'Prompt Engineering'");

      // Cloudflare 빌드 실패 및 날짜 밀림 방지: 정확한 KST 기반 ISO 날짜 강제 주입
      frontmatter = frontmatter.replace(/publishDate:\s*[^\n\r]+/i, `publishDate: ${pubDateIso}`);

      // 대표 이미지 경로 강제 동기화
      frontmatter = frontmatter.replace(/image:\s*["'][^"']*["']/i, `image: '${coverUrl}'`);

      // 본문 별표(**) 서식 오류 정제
      body = sanitizeMarkdownFormatting(body);

      // 이미지 alt 텍스트 특수문자 제거 방어 로직 (마크다운 깨짐 방지)
      const safeAlt = currentTopic.replace(/[\[\]\(\)"']/g, '').trim();
      const middleImageMarkdown = `\n\n![${safeAlt} Prompt Guide](${bodyUrl})\n\n`;

      if (body.includes('## 2.') || body.includes('### 2.')) {
        body = body.replace(/(#{2,3}\s*2\.[^\n]+)/, `${middleImageMarkdown}$1`);
      } else {
        const paragraphs = body.split('\n\n');
        if (paragraphs.length >= 3) {
          paragraphs.splice(2, 0, middleImageMarkdown.trim());
          body = paragraphs.join('\n\n');
        } else {
          body = `${middleImageMarkdown}${body}`;
        }
      }

      text = `${frontmatter}\n${body}\n`;
    }

    const targetDir = path.join(POSTS_BASE_DIR, lang.code);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, `${fileSlug}.md`);
    fs.writeFileSync(filePath, text, 'utf-8');
    console.log(`✅ [저장 완료] 4호기: src/data/post/${lang.code}/${fileSlug}.md (Prompt Engineering / 테마: ${selectedTheme.name})`);
    return true;
  } catch (error) {
    console.error(`❌ [생성 실패] ${lang.name}:`, error.message);
    return false;
  }
}

async function run() {
  console.log("==================================================");
  console.log("⚡ 4호기 Prompt Engineering 12개국 30가지 테마 Picsum 자동 포스팅 파이프라인 시작");
  console.log("==================================================");

  let successCount = 0;
  for (let i = 0; i < TARGET_LANGS.length; i++) {
    const isSuccess = await generateSinglePost(TARGET_LANGS[i], i);
    if (isSuccess) successCount++;
    if (i < TARGET_LANGS.length - 1) await delay(5000);
  }

  if (successCount > 0) {
    lines.shift();
    fs.writeFileSync(TOPICS_FILE, lines.join('\n'), 'utf-8');
    console.log(`\n🧹 총 ${successCount}개국 포스팅 완료. topics.txt 갱신.`);
  } else {
    process.exit(1);
  }
}

run();
