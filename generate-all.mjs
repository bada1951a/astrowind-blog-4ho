// =========================================================================
// 📌 [고정 식별자] 이 파일은 '4호기' 전용 스크립트입니다.
// ⚠️ [혼동 방지 경고]
// 1. 이 파일은 '4호기 (Prompt Engineering)'입니다. 2-1호기나 다른 호기와 절대 혼동하지 말 것!
// 2. 카테고리는 대표님의 지시 전까지 'Prompt Engineering'으로 영구 고정한다. (임의 변경 절대 금지)
// 3. 이미지 생성 방식은 Picsum prompt- 시드 URL 방식을 영구 유지한다.
// 4. 대표님과의 모든 설명, 질문, 대화 및 주석은 반드시 100% 한국어로만 진행한다.
// =========================================================================

import fs from 'fs';
import path from 'path';
import { createHash } from 'node:crypto';

const DRY_RUN = process.argv.includes('--dry-run');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!DRY_RUN && !OPENAI_API_KEY) throw new Error('OPENAI_API_KEY secret is required.');
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
    bodyUrl: `https://picsum.photos/seed/${bodySeed}/1000/550.jpg`
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
// [4호기 전용] 12개국 100% 현지어 섹션 제목 및 치환 딕셔너리 (영구 고정)
// =========================================================================
const I18N_SECTIONS = {
  ko: {
    s1: "1. AI 답변 퀄리티 붕괴와 업무 멘붕의 순간",
    s2: "2. 프롬프트 실패와 AI 환각(Hallucination)의 핵심 원인",
    s3: "3. 바로 복사해 쓰는 실전 마스터 프롬프트 템플릿",
    s4: "4. 현직 프롬프트 엔지니어가 전하는 실무 팁 및 주의사항",
    s5: "5. 자주 묻는 질문 (FAQ)",
    tags: ["프롬프트엔지니어링", "ChatGPT", "Claude", "생성형AI"]
  },
  en: {
    s1: "1. Critical AI Hallucination & Output Collapse Crisis",
    s2: "2. Root Cause Breakdown of Prompt Failures and Logic Flaws",
    s3: "3. Copy-and-Paste Master Prompt Engineering Template",
    s4: "4. Professional Prompt Architect Precautions & Tips",
    s5: "5. Frequently Asked Questions (FAQ)",
    tags: ["Prompt Engineering", "ChatGPT", "Claude", "Generative AI"]
  },
  ja: {
    s1: "1. AIの回答精度崩壊と業務停滞の緊急事態",
    s2: "2. プロンプト失敗とハルシネーションの根本原因",
    s3: "3. すぐに使える実践マスタープロンプトテンプレート",
    s4: "4. 現役AIプロンプト専門家が教える注意点とコツ",
    s5: "5. よくある質問 (FAQ)",
    tags: ["プロンプトエンジニアリング", "ChatGPT", "Claude", "生成AI"]
  },
  de: {
    s1: "1. Kritischer KI-Halluzinations- und Qualitätsnotfall",
    s2: "2. Detaillierte Ursachenanalyse von Prompt- und Logikfehlern",
    s3: "3. Sofort einsetzbare Master-Prompt-Vorlage",
    s4: "4. Praxistipps und Warnungen vom Prompt-Architekten",
    s5: "5. Häufig gestellte Fragen (FAQ)",
    tags: ["Prompt-Engineering", "ChatGPT", "Claude", "Generative KI"]
  },
  fr: {
    s1: "1. Crise d'hallucination de l'IA et panne de productivité",
    s2: "2. Analyse approfondie des échecs de prompt et failles logiques",
    s3: "3. Modèle de prompt maître pratique prêt à l'emploi",
    s4: "4. Conseils et précautions d'un ingénieur de prompt",
    s5: "5. Foire Aux Questions (FAQ)",
    tags: ["Prompt Engineering", "ChatGPT", "Claude", "IA Générative"]
  },
  es: {
    s1: "1. Crisis crítica de alucinación de la IA y bloqueo de tareas",
    s2: "2. Análisis de causas raíz de errores de prompt y lógica",
    s3: "3. Plantilla maestra de prompt lista para copiar y usar",
    s4: "4. Consejos y advertencias de un arquitecto de prompts",
    s5: "5. Preguntas Frecuentes (FAQ)",
    tags: ["Ingeniería de Prompts", "ChatGPT", "Claude", "IA Generativa"]
  },
  it: {
    s1: "1. Emergenza improvvisa per allucinazioni dell'IA e risposte errate",
    s2: "2. Analisi approfondita dei fallimenti di prompt e logica",
    s3: "3. Template master di prompt pratico pronto all'uso",
    s4: "4. Avvertenze e suggerimenti dell'architetto di prompt",
    s5: "5. Domande Frequenti (FAQ)",
    tags: ["Ingegneria dei Prompt", "ChatGPT", "Claude", "IA Generativa"]
  },
  pt: {
    s1: "1. Situação de emergência com alucinações e erros da IA",
    s2: "2. Análise da causa raiz de falhas em prompts e raciocínio",
    s3: "3. Template mestre de prompt pronto para copiar e colar",
    s4: "4. Recomendações e alertas de especialistas em prompt",
    s5: "5. Perguntas Frequentes (FAQ)",
    tags: ["Engenharia de Prompt", "ChatGPT", "Claude", "IA Generativa"]
  },
  nl: {
    s1: "1. Noodsituatie door AI-hallucinaties en onbruikbare output",
    s2: "2. Grondige analyse van mislukte prompts en denkfouten van het model",
    s3: "3. Direct bruikbare master prompt template",
    s4: "4. Belangrijke adviezen van professionele prompt engineers",
    s5: "5. Veelgestelde Vragen (FAQ)",
    tags: ["Prompt Engineering", "ChatGPT", "Claude", "Generatieve AI"]
  },
  pl: {
    s1: "1. Awaryjna sytuacja związana z halucynacjami i błędami AI",
    s2: "2. Szczegółowa analiza przyczyn nieudanych promptów i luk w logice",
    s3: "3. Gotowy szablon master promptu do natychmiastowego użycia",
    s4: "4. Wskazówki i ostrzeżenia profesjonalnego inżyniera promptów",
    s5: "5. Najczęściej zadawane pytania (FAQ)",
    tags: ["Inżynieria Promptów", "ChatGPT", "Claude", "Generatywna AI"]
  },
  id: {
    s1: "1. Situasi Kritis Akibat Halusinasi AI dan Output Menyesatkan",
    s2: "2. Analisis Mendalam Kegagalan Prompt dan Kerusakan Logika",
    s3: "3. Templat Master Prompt Siap Pakai yang Sangat Efektif",
    s4: "4. Tips & Peringatan Penting Pakar Prompt Engineering",
    s5: "5. Pertanyaan yang Sering Diajukan (FAQ)",
    tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Generatif"]
  },
  vi: {
    s1: "1. Tình huống khẩn cấp do AI trả lời ảo giác và sai lệch",
    s2: "2. Phân tích nguyên nhân gốc rễ lỗi câu lệnh và logic AI",
    s3: "3. Mẫu câu lệnh Master Prompt thực chiến sao chép dùng ngay",
    s4: "4. Lời khuyên và lưu ý quan trọng từ kỹ sư thiết kế câu lệnh",
    s5: "5. Các câu hỏi thường gặp (FAQ)",
    tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tạo Sinh"]
  }
};

// =========================================================================
// 🛡️ [4호기 자가 검수 및 치유 엔진: Self-Healing Inspector]
// =========================================================================
function inspectAndHealMarkdown(body) {
  return body.trim()
    .replace(/^(#{1,6}\s+)\*\*([^\n]*?)\*\*/gm, '$1$2')
    .replace(/\*\*[ \t]+([^*\n]+?)[ \t]+\*\*/g, '**$1**')
    // Luna sometimes bolds the whole FAQ question: **Q1. question?**.
    // Normalize the marker only; keep the native-language question text unchanged.
    .replace(/^\*\*Q([1-3])\.\s+([^\n]*?)\*\*[ \t]*$/gm, '**Q$1.** $2')
    .replace(/(\*\*Q[1-3]\.\*\*[^\n]*)\n(?=\*\*A[1-3]\.\*\*)/g, '$1\n\n')
    .replace(/\n{3,}/g, '\n\n');
}
function validateGeneratedPost(text, langCode) {
  const errors = [];
  const fm = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n/);
  if (!fm) return ['frontmatter missing'];
  const meta = fm[1], body = text.slice(fm[0].length);
  for (const field of ['title', 'description', 'publishDate', 'image', 'theme'])
    if (!new RegExp('^' + field + ':\\s*\\S', 'm').test(meta)) errors.push(field + ' missing');
  if (!/^category:\s*['"]?Prompt Engineering['"]?\s*$/m.test(meta)) errors.push('category must be Prompt Engineering');
  const readable = body.replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/[#*_\x60>]/g,'');
  const isCharacterCountLanguage = langCode === 'ko' || langCode === 'ja';
  const count = isCharacterCountLanguage ? [...readable.replace(/\s/g, '')].length : (readable.match(/\S+/g) || []).length;
  const minLength = langCode === 'ko' ? 1900 : langCode === 'ja' ? 1700 : 700;
  const maxLength = langCode === 'ko' ? 3100 : langCode === 'ja' ? 3500 : 1400;
  if (count < minLength || count > maxLength) errors.push('body length ' + count);
  const headings = body.match(/^##\s+[^\n]+/gm)||[];
  if (headings.length !== 5) errors.push('exactly 5 H2 headings required');
  for(let n=1;n<=5;n++) if(!headings[n-1]?.startsWith('## '+n+'. ')) errors.push('H2 order '+n);
  for(let n=1;n<=3;n++){
    if((body.match(new RegExp('\\*\\*Q'+n+'\\.\\*\\*','gi'))||[]).length!==1) errors.push('Q'+n+' missing or duplicated');
    if((body.match(new RegExp('\\*\\*A'+n+'\\.\\*\\*','gi'))||[]).length!==1) errors.push('A'+n+' missing or duplicated');
  }
  if((body.match(/^\x60\x60\x60/gm)||[]).length%2) errors.push('unclosed code fence');
  if(langCode!=='ko' && /[가-힣]/.test(body)) errors.push('Korean in non-Korean article');
  return errors;
}

if (!DRY_RUN && !fs.existsSync(TOPICS_FILE)) {
  console.error("❌ topics.txt 파일이 존재하지 않습니다.");
  process.exit(1);
}

const fileContent = DRY_RUN ? 'offline test article topic' : fs.readFileSync(TOPICS_FILE, 'utf-8');
const lines = fileContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

if (lines.length === 0) {
  console.log("⚠️ topics.txt에 남은 주제가 없습니다. 생성을 건너뜁니다.");
  process.exit(0);
}

const currentTopic = lines[0];
console.log(`📌 오늘 처리할 주제 [4호기 AI Prompt Engineering]: "${currentTopic}"`);

const PROMPT_CRISIS_SCENARIOS_30 = [
  "급작스러운 부서장 호출로 30분 뒤 신사업 전략 초안을 들고 들어가야 하는데, 챗GPT가 뜬구름 잡는 원론적인 답변만 늘어놓을 때",
  "경쟁사 시장 분석 보고서를 오늘 퇴근 전까지 제출해야 하는데, AI가 검색해도 안 나오는 가짜 수치(환각 현상)를 당당하게 지어낼 때",
  "해외 바이어에게 보낼 영문 비즈니스 제안서를 다듬어야 하는데, 번역기 특유의 어색한 문체 때문에 신뢰도가 떨어져 보일 때",
  "점심시간 직후 진행될 팀 브레인스토밍 회의를 위해 파격적인 마케팅 카피 20개가 급히 필요한 난감한 순간",
  "새벽 2시 홀로 남아 스타트업 투자 유치용 IR 피치덱 발표 스크립트를 작성하던 중 창의력과 체력이 완전히 고갈되었을 때",
  "분기 성과 발표를 위해 50페이지짜리 사내 설문조사 주관식 답변을 정량적으로 분류하고 요약해야 하는 막막한 상황",
  "클라이언트가 제시한 까다로운 브랜드 가이드라인과 톤앤매너를 지키면서 블로그 콘텐츠 초안을 대량 생산해야 할 때",
  "월요일 아침 전사 주간 회의 직전, 주말 사이 쏟아진 산업 동향 뉴스 30편을 3줄 핵심 브리핑으로 즉시 정리해야 할 때",
  "간단한 파이썬 데이터 크롤링 스크립트를 짜달라고 했으나 폐기된 구버전 라이브러리 문법을 추천해 오류가 쏟아질 때",
  "복잡한 SQL 쿼리 최적화를 위해 프롬프트를 넣었으나 테이블 조인(JOIN) 논리가 꼬인 엉터리 코드를 반환했을 때",
  "웹 프론트엔드 인터랙티브 컴포넌트를 Claude Artifacts로 뽑아내려는데 스타일 시트가 깨져 화면이 뭉개지는 순간",
  "정규표현식(Regex) 패턴 하나가 계속 매칭에 실패해 1시간째 프롬프트와 정규식을 번갈아 수정하며 헤매던 오후",
  "API 호출 결과를 JSON 포맷으로 깔끔하게 받아내야 하는데 자꾸 마크다운 설명글을 덧붙여 파싱 에러를 유발할 때",
  "사내 업무 자동화 봇을 구축하면서 사용자 입력의 다양한 예외 케이스를 처리할 강력한 퓨샷(Few-shot) 예시가 부족할 때",
  "노코드 툴과 웹훅을 연결하는 과정에서 데이터 스키마 변환 규칙을 AI에게 정확히 인지시키지 못해 병목이 생겼을 때",
  "대용량 CSV 텍스트 데이터를 분석 창에 업로드했으나 토큰 한도 초과(Context Window Limit)로 문맥이 잘려나갈 때",
  "법률 판례나 사내 취업규칙 관련 질문을 던졌더니 실제 법조문과 정반대되는 위험한 조언을 천연덕스럽게 생성할 때",
  "AI에게 특정 전문가 페르소나를 부여했으나 몇 번 대화가 오가자마자 원래의 로봇 같은 중립적 어조로 되돌아갈 때",
  "복잡한 5단계 업무 프로세스를 지시했으나 중간 3단계를 건너뛰고 결과물만 성의 없이 뱉어내는 멍청한 결과를 봤을 때",
  "사내 보안 규정상 고객 실명을 넣지 못하는 상태에서 맥락을 잃지 않고 문서를 재구성하도록 프롬프트를 설계해야 할 때",
  "의료/바이오 관련 전문 용어가 가득한 논문 초록을 일반인도 이해하기 쉬운 설명문으로 변환하는 데 실패했을 때",
  "고객 응대(CS) 자동 챗봇의 시스템 프롬프트가 악의적인 탈옥(Jailbreak) 프롬프트에 뚫려 엉뚱한 답변을 내놓을 위험에 처했을 때",
  "다국어 로컬라이징 번역을 맡겼는데 현지 문화적 맥락을 반영하지 못하고 단어를 직역해 브랜드 이미지를 깎아먹을 뻔했을 때",
  "회의 녹음 텍스트에서 말하는 사람별 핵심 주장과 액션 플랜(To-Do)만 칼같이 추출하고 싶은데 온갖 잡담까지 다 긁어모아 줄 때",
  "신규 입사자 교육용 방대한 매뉴얼을 10분 만에 퀴즈와 플래시 카드로 인터랙티브하게 재가공해야 하는 상황",
  "반복되는 일일 업무 보고 작성을 위해 단 3개의 키워드만 넣으면 완벽한 양식으로 완성해 주는 전용 템플릿이 절실할 때",
  "팀원마다 AI 결과물의 품질 편차가 너무 심해 부서 전체가 공통으로 쓸 표준 시스템 프롬프트 라이브러리가 필요할 때",
  "소셜 미디어(인스타그램, 스레드, 링크드인) 채널별 성격에 맞게 1개의 원 소스를 3가지 다른 포맷으로 즉시 변환해야 할 때",
  "길고 지루한 연구 리포트를 읽을 시간이 없어 저자의 핵심 논리와 한계점을 날카롭게 비판하는 반론 요약이 급할 때",
  "AI 모델의 최신 업데이트 이후 기존에 잘 쓰던 프롬프트가 예전만큼 정교한 결과물을 내지 못해 전면 수정이 필요한 순간"
];

const THEME_PRESETS = [
  { id: 1, name: "Cyberpunk Terminal", primaryColor: "#00ffcc", bgColor: "#111827", layout: "CLI/터미널 스타일, 핵심 프롬프트 한 줄 최상단 배치" },
  { id: 2, name: "Modern Minimalist Slate", primaryColor: "#3b82f6", bgColor: "#f8fafc", layout: "미니멀 가이드 스타일, 여백 중심의 깔끔한 단계별 프롬프트 빌딩" },
  { id: 3, name: "Industrial Blueprint", primaryColor: "#f59e0b", bgColor: "#1e293b", layout: "엔지니어링 청사진 스타일, 프롬프트 구조 분해 및 전후 비교표 포함" },
  { id: 4, name: "Retro Monokai", primaryColor: "#a6e22e", bgColor: "#272822", layout: "개발자 에디터 스타일, 실전 프롬프트 코드 박스 중심 전개, 디버깅 팁" },
  { id: 5, name: "Nordic Clean Ice", primaryColor: "#0284c7", bgColor: "#f0f9ff", layout: "북유럽 감성 클린 레이아웃, 인용구 중심 도입부, 실전 체크리스트" }
];

const TARGET_LANGS = [
  { code: 'ko', name: 'Korean', persona: '친절하고 실무 경험이 많은 AI 프롬프트 아키텍트 및 생산성 컨설턴트', osUi: 'ChatGPT, Claude, Gemini, 프롬프트 입력창, 시스템 프롬프트 설정', localeContext: '서울/판교 IT 오피스 및 기업 전략 기획 부서' },
  { code: 'en', name: 'English', persona: 'Senior AI prompt engineer and LLM automation specialist', osUi: 'ChatGPT, Claude, Gemini, System Instructions, Artifacts', localeContext: 'Silicon Valley tech startup / New York creative & marketing agency' },
  { code: 'ja', name: 'Japanese', persona: 'プロンプトエンジニアリングと生成AI活用を分かりやすく教える現役AIアーキテクト', osUi: 'ChatGPT, Claude, Gemini, システムプロンプト, アーティファクト', localeContext: '東京・丸の内および渋谷のITビジネスオフィス' },
  { code: 'de', name: 'German', persona: 'Erfahrener Prompt-Architekt und Berater für generative KI-Systeme', osUi: 'ChatGPT, Claude, Gemini, Systemanweisungen, Einstellungen', localeContext: 'Frankfurter Bankenviertel und Berliner Tech-Szene' },
  { code: 'fr', name: 'French', persona: 'Ingénieur en prompt design et spécialiste de la productivité par l\'IA', osUi: 'ChatGPT, Claude, Gemini, Instructions système, Paramètres', localeContext: 'Agences de conseil et sièges d\'entreprise à Paris La Défense' },
  { code: 'es', name: 'Spanish', persona: 'Especialista en ingeniería de prompts y optimización con modelos LLM', osUi: 'ChatGPT, Claude, Gemini, Instrucciones personalizadas, Artifacts', localeContext: 'Oficinas corporativas y consultoras en Madrid y Barcelona' },
  { code: 'it', name: 'Italian', persona: 'Architetto di prompt esperto nell\'automazione aziendale con intelligenza artificiale', osUi: 'ChatGPT, Claude, Gemini, Istruzioni di sistema, Impostazioni', localeContext: 'Studi professionali e agenzie digitali a Milano' },
  { code: 'pt', name: 'Portuguese', persona: 'Especialista em engenharia de prompts e automação prática com IA generativa', osUi: 'ChatGPT, Claude, Gemini, Instruções personalizadas, Configurações', localeContext: 'Polos de inovação e empresas na Avenida Paulista em São Paulo' },
  { code: 'nl', name: 'Dutch', persona: 'Nederlandse prompt engineer en specialist in generatieve AI-tools', osUi: 'ChatGPT, Claude, Gemini, Systeeminstructies, Instellingen', localeContext: 'Zuidas en innovatiehubs in Amsterdam' },
  { code: 'pl', name: 'Polish', persona: 'Architekt promptów i praktyk narzędzi generatywnej sztucznej inteligencji', osUi: 'ChatGPT, Claude, Gemini, Instrukcje systemowe, Ustawienia', localeContext: 'Warszawski sektor IT i nowoczesne centra biznesowe' },
  { code: 'id', name: 'Indonesian', persona: 'Praktisi AI prompt engineering dan otomatisasi workflow digital', osUi: 'ChatGPT, Claude, Gemini, Instruksi kustom, Pengaturan', localeContext: 'Kawasan bisnis Sudirman Central Business District (SCBD) Jakarta' },
  { code: 'vi', name: 'Vietnamese', persona: 'Chuyên gia thiết kế câu lệnh AI (Prompt Engineer) và tự động hóa công việc', osUi: 'ChatGPT, Claude, Gemini, Hướng dẫn hệ thống, Cài đặt', localeContext: 'Tòa nhà văn phòng công nghệ cao tại Quận 1, TP. Hồ Chí Minh' }
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const fileSlug = 'post-' + createHash('sha256').update(currentTopic).digest('hex').slice(0,14);

// =========================================================================
// [호출 함수] maxOutputTokens: 4096 (2,500자 정량 생성 최적화)
// =========================================================================
async function fetchWithRetry(prompt, maxRetries = 3, delayMs = 3000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-6-luna', input: prompt, max_output_tokens: 6500 }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(`OpenAI HTTP ${response.status}: ${JSON.stringify(result.error || result).slice(0, 400)}`);
      const output = (result.output || []).flatMap((item) => item.content || [])
        .filter((part) => part.type === 'output_text').map((part) => part.text).join('\n');
      if (!output.trim()) throw new Error('No text in GPT response: ' + (result.status || 'unknown'));
      return output;
    } catch (error) {
      console.warn(`GPT retry ${attempt}/${maxRetries}: ${error.message}`);
      if (attempt === maxRetries) throw error;
      await delay(delayMs * attempt);
    }
  }
}

async function generateSinglePost(lang, index) {
  const existingPath = path.join(POSTS_BASE_DIR, lang.code, `${fileSlug}.md`);
  if (fs.existsSync(existingPath)) {
    console.log(`기존 성공 언어 보존: ${lang.code}`);
    return true;
  }
  const selectedTheme = THEME_PRESETS[Math.floor(Math.random() * THEME_PRESETS.length)];
  const selectedScenario = PROMPT_CRISIS_SCENARIOS_30[Math.floor(Math.random() * PROMPT_CRISIS_SCENARIOS_30.length)];
  const i18n = I18N_SECTIONS[lang.code] || I18N_SECTIONS.ko;

  console.log(`\n🚀 [${index + 1}/12] ${lang.name} (${lang.code}) 4호기 애드센스 표준 생성 중... (테마: ${selectedTheme.name})`);

  const { coverUrl, bodyUrl } = getPostImages(currentTopic, index);
  const pubDateIso = getKstPublishDateIso(index);

  // 🎯 [애드센스 승인 최적화 프롬프트: 2,400~2,600자 정량화]
  const prompt = `
You are a ${lang.persona}.
Write a high-quality, practical AI prompt engineering guide natively in ${lang.name}.
Target Culture: "${lang.localeContext}"
Optional illustrative situation ONLY when relevant; never invent as a personal experience: "${selectedScenario}"
Topic: "${currentTopic}"
Native-language taxonomy examples: ${JSON.stringify(i18n.tags)}. Tags must describe the actual topic.

[ADSENSE QUALITY & LENGTH REQUIREMENT]
- For Korean (ko): Target 2,400-2,600 Korean characters excluding spaces and Markdown; never pad with filler.
- For other languages: Write exactly 900 - 1,100 words.
- Tone: Highly informative, professional, practical workplace advice.

[STRUCTURE - STRICT 5 H2 HEADINGS]
Write five topic-specific native language H2 headings numbered 1 to 5. Do not force unrelated headings:

## 1. [Specific native-language heading matching the actual topic]
Describe a realistic prompt engineering problem grounded in the topic, without fabricated personal stories.

## 2. [Specific native-language heading matching the actual topic]
Explain topic-specific failure mechanisms accurately, without assuming every AI error is caused by temperature or context length.

## 3. [Specific native-language heading matching the actual topic]
Provide a useful copy-and-paste topic-specific original prompt template with [Context], [Role], [Objective], [Constraints], and [Output Format] in a correctly closed fenced code block. Then explain how to customize and verify its output.

## 4. [Specific native-language heading matching the actual topic]
Explain prompt testing, verification limitations, and practical safeguards appropriate for this topic.

## 5. [Specific native-language heading matching the actual topic]
Provide exactly 3 practical Q&A items. You MUST put an empty line between Question and Answer:

**Q1.** Question text

**A1.** Detailed answer (3-4 sentences).

**Q2.** Question text

**A2.** Detailed answer (3-4 sentences).

**Q3.** Question text

**A3.** Detailed answer (3-4 sentences).

[FORMATTING RULES]
1. Never put asterisks (**) inside H2 headings.
2. Bold keywords with strict syntax: **keyword** (no space inside asterisks).
3. Put prompt tags, variables, or system settings in inline backticks (e.g. \`[Role]\`, \`temperature: 0.2\`).
${lang.code !== 'ko' ? `- Absolutely NO Korean characters in non-Korean posts.` : ''}

[Strict Output Format]
Return ONLY raw Markdown starting directly with frontmatter:
---
title: "Native Clear Title in ${lang.name}"
description: "Native concise description in ${lang.name} under 160 characters"
publishDate: ${pubDateIso}
image: "${coverUrl}"
category: "Prompt Engineering"
tags: ["3-5 topic-specific tags written in this language"]
theme: "${selectedTheme.name}"
---
`;

  try {
    let rawText = await fetchWithRetry(prompt);
    let text = rawText.trim();
    if (text.startsWith('```markdown')) text = text.replace(/^```markdown\n/, '').replace(/\n```$/, '');
    if (text.startsWith('```')) text = text.replace(/^```\n/, '').replace(/\n```$/, '');

    const fmMatch = text.match(/^---[\s\S]*?---\n*/);
    if (fmMatch) {
      let frontmatter = fmMatch[0].trim();
      let body = text.slice(fmMatch[0].length).trim();
      body = body.replace(/^#\s+[^\n]+\n+/, '');

      // ⚠️ 4호기 카테고리 'Prompt Engineering' 영구 보존 강제 검증
      frontmatter = frontmatter.replace(/category:\s*["'][^"']*["']/i, 'category: "Prompt Engineering"')
                               .replace(/category:\s*[^\n\r]+/i, 'category: "Prompt Engineering"');

      // 🩺 [자가 검수 및 치유 엔진 가동]
      body = inspectAndHealMarkdown(body);

      if (lang.code === 'ko') {
        console.log(`   📏 [4호기 본문 최종 글자 수] ${body.length}자 (애드센스 표준: 2,400~2,600자)`);
      }

      // 본문 중간 이미지 배치 (2번 섹션 직전)
      const safeAlt = currentTopic.replace(/[\[\]()"']/g, '').trim();
      const middleImageMarkdown = `\n\n![${safeAlt} Prompt Guide](${bodyUrl})\n\n`;

      if (body.includes('## 2.')) {
        body = body.replace(/(##\s*2\.[^\n]+)/, `${middleImageMarkdown}$1`);
      } else {
        body = `${middleImageMarkdown}${body}`;
      }

      text = `${frontmatter}\n\n${body}\n`;
    } else {
      throw new Error('프런트매터 누락: 저장 차단');
    }
    const validationErrors = validateGeneratedPost(text, lang.code);
    if (validationErrors.length) throw new Error('품질 검사 실패: ' + validationErrors.join(', '));

    const targetDir = path.join(POSTS_BASE_DIR, lang.code);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, `${fileSlug}.md`);
    fs.writeFileSync(filePath, text, 'utf-8');
    console.log(`   ✅ [성공] 4호기 저장 완료: src/data/post/${lang.code}/${fileSlug}.md`);
    return true;
  } catch (error) {
    console.error(`❌ [최종 실패] ${lang.name} 생성 실패:`, error.message);
    return false;
  }
}

async function run() {
  if (DRY_RUN) {
    console.log('SAFE DRY RUN: no API calls, no files changed, no publishing');
    const sample = '---\ntitle: sample\ndescription: sample\npublishDate: 2026-10-28\nimage: https://picsum.photos/seed/test/1200/675.jpg\ncategory: Prompt Engineering\ntheme: test\n---\n\n## 1. Test\nshort';
    if (!validateGeneratedPost(sample,'ko').some(e=>e.startsWith('body length'))) throw new Error('Validation smoke test failed for Korean');
    if (!validateGeneratedPost(sample,'ja').some(e=>e.startsWith('body length'))) throw new Error('Validation smoke test failed for Japanese');
    const japaneseBody = ['## 1. 症状', 'あ'.repeat(500), '## 2. 原因', 'あ'.repeat(500), '## 3. 対処法', 'あ'.repeat(500), '## 4. 注意点', 'あ'.repeat(500), '## 5. 質問', '**Q1.** 質問', '**A1.** 回答', '**Q2.** 質問', '**A2.** 回答', '**Q3.** 質問', '**A3.** 回答'].join('\n\n');
    const japaneseSample = sample.slice(0, sample.indexOf('## 1. Test')) + japaneseBody;
    if (validateGeneratedPost(japaneseSample, 'ja').length) throw new Error('Valid Japanese character-count sample rejected');
    const repairedFaq = inspectAndHealMarkdown('**Q1. 와이파이 연결 오류인가요?**  \n**A1.** 답변');
    if (!repairedFaq.includes('**Q1.** 와이파이 연결 오류인가요?\n\n**A1.**')) throw new Error('FAQ bold-question repair or paragraph separation failed');
    console.log('PASS: Korean/Japanese length gates and FAQ question-marker repair');
    return;
  }
  console.log("==================================================");
  console.log("⚡ [4호기 AI Prompt Engineering] (카테고리: Prompt Engineering) 12개국 고속 자동 포스팅 시작");
  console.log("==================================================");

  let successCount = 0;

  for (let i = 0; i < TARGET_LANGS.length; i++) {
    let isSuccess = false;
    for (let attempt = 1; attempt <= 2 && !isSuccess; attempt++) {
      isSuccess = await generateSinglePost(TARGET_LANGS[i], i);
      if (!isSuccess && attempt < 2) await delay(2500);
    }
    if (isSuccess) successCount++;
    if (i < TARGET_LANGS.length - 1) {
      await delay(2000);
    }
  }

  if (successCount === TARGET_LANGS.length) {
    lines.shift();
    fs.writeFileSync(TOPICS_FILE, lines.join('\n'), 'utf-8');
    console.log(`\n🧹 총 ${successCount}개국 포스팅 완료. topics.txt에서 주제를 제거했습니다.`);
    console.log(`📊 남은 주제 수: ${lines.length}개`);
  } else {
    console.error(`\n❌ ${TARGET_LANGS.length - successCount}개 언어 생성 실패. 주제를 보존합니다.`);
    process.exit(1);
  }
}

run();
