import fs from 'fs';
import path from 'path';

const POSTS_BASE_DIR = path.resolve('src/data/post');

// 4호기 전용 12개국 표준 소제목 딕셔너리
const I18N_SECTIONS = {
  ko: {
    s1: "1. AI 답변 퀄리티 붕괴와 업무 멘붕의 순간",
    s2: "2. 프롬프트 실패와 AI 환각(Hallucination)의 핵심 원인",
    s3: "3. 바로 복사해 쓰는 실전 마스터 프롬프트 템플릿",
    s4: "4. 현직 프롬프트 엔지니어가 전하는 실무 팁 및 주의사항",
    s5: "5. 자주 묻는 질문 (FAQ)"
  },
  en: {
    s1: "1. Critical AI Hallucination & Output Collapse Crisis",
    s2: "2. Root Cause Breakdown of Prompt Failures and Logic Flaws",
    s3: "3. Copy-and-Paste Master Prompt Engineering Template",
    s4: "4. Professional Prompt Architect Precautions & Tips",
    s5: "5. Frequently Asked Questions (FAQ)"
  },
  ja: {
    s1: "1. AIの回答精度崩壊と業務停滞の緊急事態",
    s2: "2. プロンプト失敗とハルシネーションの根本原因",
    s3: "3. すぐに使える実践マスタープロンプトテンプレート",
    s4: "4. 現役AIプロンプト専門家が教える注意点とコツ",
    s5: "5. よくある質問 (FAQ)"
  },
  de: {
    s1: "1. Kritischer KI-Halluzinations- und Qualitätsnotfall",
    s2: "2. Detaillierte Ursachenanalyse von Prompt- und Logikfehlern",
    s3: "3. Sofort einsetzbare Master-Prompt-Vorlage",
    s4: "4. Praxistipps und Warnungen vom Prompt-Architekten",
    s5: "5. Häufig gestellte Fragen (FAQ)"
  },
  fr: {
    s1: "1. Crise d'hallucination de l'IA et panne de productivité",
    s2: "2. Analyse approfondie des échecs de prompt et failles logiques",
    s3: "3. Modèle de prompt maître pratique prêt à l'emploi",
    s4: "4. Conseils et précautions d'un ingénieur de prompt",
    s5: "5. Foire Aux Questions (FAQ)"
  },
  es: {
    s1: "1. Crisis crítica de alucinación de la IA y bloqueo de tareas",
    s2: "2. Análisis de causas raíz de errores de prompt y lógica",
    s3: "3. Plantilla maestra de prompt lista para copiar y usar",
    s4: "4. Consejos y advertencias de un arquitecto de prompts",
    s5: "5. Preguntas Frecuentes (FAQ)"
  },
  it: {
    s1: "1. Emergenza improvvisa per allucinazioni dell'IA e risposte errate",
    s2: "2. Analisi approfondita dei fallimenti di prompt e logica",
    s3: "3. Template master di prompt pratico pronto all'uso",
    s4: "4. Avvertenze e suggerimenti dell'architetto di prompt",
    s5: "5. Domande Frequenti (FAQ)"
  },
  pt: {
    s1: "1. Situação de emergência com alucinações e erros da IA",
    s2: "2. Análise da causa raiz de falhas em prompts e raciocínio",
    s3: "3. Template mestre de prompt pronto para copiar e colar",
    s4: "4. Recomendações e alertas de especialistas em prompt",
    s5: "5. Perguntas Frecuentes (FAQ)"
  },
  nl: {
    s1: "1. Noodsituatie door AI-hallucinaties en onbruikbare output",
    s2: "2. Grondige analyse van mislukte prompts en denkfouten van het model",
    s3: "3. Direct bruikbare master prompt template",
    s4: "4. Belangrijke adviezen van professionele prompt engineers",
    s5: "5. Veelgestelde Vragen (FAQ)"
  },
  pl: {
    s1: "1. Awaryjna sytuacja związana z halucynacjami i błędami AI",
    s2: "2. Szczegółowa analiza przyczyn nieudanych promptów i luk w logice",
    s3: "3. Gotowy szablon master promptu do natychmiastowego użycia",
    s4: "4. Wskazówki i ostrzeżenia profesjonalnego inżyniera promptów",
    s5: "5. Najczęściej zadawane pytania (FAQ)"
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
    s5: "5. Các câu hỏi thường gặp (FAQ)"
  }
};

function getAllMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function cleanPost(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const langMatch = filePath.match(/post[/\\]([a-z]{2})[/\\]/i);
  const langCode = langMatch ? langMatch[1].toLowerCase() : 'ko';
  const i18n = I18N_SECTIONS[langCode] || I18N_SECTIONS.ko;

  const fmMatch = content.match(/^---[\s\S]*?---\n*/);
  if (!fmMatch) return false;

  let frontmatter = fmMatch[0].trim();
  let body = content.slice(fmMatch[0].length).trim();

  // 1. 최상단 H1 삭제
  body = body.replace(/^#\s+[^\n]+\n+/, '');

  // 2. [4호기 핵심] 대괄호 영문 태그 및 표준 헤더 치환
  body = body.replace(/^#{0,3}\s*1\.?\s*(\[Opening Story.*?\]|Opening Story.*?)/gmi, `## ${i18n.s1}`);
  body = body.replace(/^#{0,3}\s*2\.?\s*(\[Root Cause.*?\]|Root Cause Breakdown.*?|Root Cause.*?)/gmi, `## ${i18n.s2}`);
  body = body.replace(/^#{0,3}\s*3\.?\s*(\[Master Prompt.*?\]|Master Prompt.*?|\[Step-by-Step.*?\]|Step-by-Step Resolution.*?|Step-by-Step.*?)/gmi, `## ${i18n.s3}`);
  body = body.replace(/^#{0,3}\s*4\.?\s*(\[Practical Variations.*?\]|Practical Variations.*?|\[Expert.*?\]|Expert Advice.*?|Expert.*?)/gmi, `## ${i18n.s4}`);
  body = body.replace(/^#{0,3}\s*5\.?\s*(\[Frequently Asked Questions.*?\]|Frequently Asked Questions.*?|FAQ)/gmi, `## ${i18n.s5}`);

  // 3. [캡처 기반 변칙 헤더 자동 승격]
  // 1번 헤더 변칙
  body = body.replace(/^#{0,3}\s*1\.?\s*(왜\s*단순한\s*프롬프트.*?)/gmi, `## ${i18n.s1}`);
  
  // 2번 원인 분석 승격 (The Root Cause: Why..., Warum herkömmliches..., なぜ従来の...)
  body = body.replace(/^#{0,3}\s*(The Root Cause:.*?|Warum herkömmliches Prompting.*?|なぜ従来のプロンプト.*?|왜 단순 프롬프트는 실패하고.*?)/gmi, `## ${i18n.s2}`);
  
  // 3번 실전 마스터 프롬프트 승격 (The Master Prompt Template..., 実践投入！..., 30분 만에 끝내는...)
  body = body.replace(/^#{0,3}\s*(The Master Prompt Template.*?|Master Prompt-Vorlage|実践投入.*?|30분 만에 끝내는 마스터.*?|실전 마스터 프롬프트.*?)/gmi, `## ${i18n.s3}`);
  
  // 4번 실무 응용/주의사항 승격 (Practical Variations and Failure Prevention, 実務応用..., 倫理的破綻とハルシネーション...)
  body = body.replace(/^#{0,3}\s*(Practical Variations and Failure Prevention|Praktische Variationen.*?|倫理的破綻とハルシネーション.*?|실무 응용 및 트러블슈팅.*?|현업 적용을 위한 핵심.*?)/gmi, `## ${i18n.s4}`);
  
  // 5번 FAQ 승격
  body = body.replace(/^#{0,3}\s*(Frequently Asked Questions|Preguntas Frecuentes|よくある質問).*?$/gmi, `## ${i18n.s5}`);

  // 잔여 태그 도려내기
  body = body.replace(/\[(Opening Story\/Problem|Root Cause \/ Architecture|Master Prompt Template|Practical Variations \/ Safety Tips)\]/gi, '');

  // 4. 1번 헤더 누락 시 주입 및 직후 중복 1줄 정밀 제거
  if (!body.startsWith('## 1.')) {
    body = `## ${i18n.s1}\n\n` + body;
  }
  body = body.replace(/^(## 1\.[^\n]+)\n+(\s*1\.\s+[^\n]+)\n+/m, '$1\n\n');

  // 5. 프롬프트 변수($PROMPT$) 및 단축키 주변 달러($) 기호 인라인 백틱화
  body = body.replace(/\$(?:Strg|Ctrl|Win|Shift|Alt|Esc)\s*[^$\n]*\$/gi, (match) => {
    return `\`${match.replace(/\$/g, '').trim()}\``;
  });
  body = body.replace(/\$([A-Za-z0-9_-]+)\$/g, '`$1`');

  // 6. [박스 안 글씨 시인성 보장] HTML 인라인 박스 스타일 글자색을 명확한 어두운 색(#111827)으로 강제
  body = body.replace(/(<div style="[^"]*background-color:[^"]*)"/gi, (match, p1) => {
    if (!p1.includes('color:')) {
      return `${p1}; color: #111827;"`;
    }
    return match;
  });

  // 7. 볼드 및 Q&A 정렬
  body = body.replace(/^(#{1,6}\s*)\*\*(.*?)\*\*/gm, '$1$2');
  body = body.replace(/([^\n])\s*(\*\*?[QA][0-9]*\s*[:.]\*\*?)/gi, '$1\n\n$2');
  body = body.replace(/([^\n])\s+([QA][0-9]*\s*[:.])/g, '$1\n\n$2');
  body = body.replace(/([.!?])\s*(\*\*?[QA][0-9]*\s*[:.]\*\*?)/gi, '$1\n\n$2');

  // 8. 물음표 뒤 띄어쓰기 및 과도한 개행 압축
  body = body.replace(/\?([A-Za-z\u00C0-\u024F\u1EA0-\u1EF9가-힣])/g, '? $1');
  body = body.replace(/\n{3,}/g, '\n\n');

  // 9. 상단 21줄 공백 원천 차단
  const finalContent = `${frontmatter}\n\n${body.trim()}\n`;

  if (content !== finalContent) {
    fs.writeFileSync(filePath, finalContent, 'utf-8');
    return true;
  }
  return false;
}

function run() {
  console.log("==================================================");
  console.log("🛠️ 4호기 마크다운 기존 글 일괄 정밀 복구 스크립트 가동");
  console.log("==================================================");

  const files = getAllMarkdownFiles(POSTS_BASE_DIR);
  console.log(`총 ${files.length}개의 포스트를 검사합니다...\n`);

  let modifiedCount = 0;
  for (const file of files) {
    const isModified = cleanPost(file);
    const relPath = path.relative(process.cwd(), file);
    if (isModified) {
      console.log(`✨ [정밀 복구 완료] ${relPath}`);
      modifiedCount++;
    } else {
      console.log(`✔️ [이상 없음] ${relPath}`);
    }
  }

  console.log(`\n🎉 4호기 작업 완료: 총 ${files.length}개 중 ${modifiedCount}개 파일 복구 완료.`);
}

run();
