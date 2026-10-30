export function normalizeBoldWhitespace(markdown) {
  return String(markdown).replace(/\*\*[ \t]*([^*\r\n]*?)[ \t]*\*\*/g, (_match, content) => {
    return '**' + content.trim() + '**';
  });
}

export function validateFaqStructure(markdown) {
  const text = String(markdown);
  const errors = [];
  const markerSequence = [];
  const questionLines = new Map();
  const answerLines = new Map();
  const questionMatches = [...text.matchAll(/^\*\*Q([1-3])\.\*\*[ \t]+([^\r\n]+?)[ \t]*$/gm)];
  const answerMatches = [...text.matchAll(/^\*\*A([1-3])\.\*\*[ \t]+([^\r\n]+?)[ \t]*$/gm)];

  for (const number of [1, 2, 3]) {
    const questionMarker = '**Q' + number + '.**';
    const answerMarker = '**A' + number + '.**';
    const questionCount = text.split(questionMarker).length - 1;
    const answerCount = text.split(answerMarker).length - 1;
    const question = questionMatches.filter((match) => match[1] === String(number));
    const answer = answerMatches.filter((match) => match[1] === String(number));

    if (questionCount !== 1) errors.push('FAQ 질문 Q' + number + ' 표식이 정확히 1개 필요');
    if (answerCount !== 1) errors.push('FAQ 답변 A' + number + ' 표식이 정확히 1개 필요');

    if (questionCount === 1 && question.length !== 1) {
      errors.push('FAQ 질문 Q' + number + '은 별도 줄에 있어야 함');
    } else if (question.length === 1) {
      questionLines.set(number, question[0]);
      markerSequence.push({ label: 'Q' + number, index: question[0].index });
      if (/\*\*[QA][1-3]\.\*\*/.test(question[0][2])) {
        errors.push('FAQ 질문 Q' + number + '과 답변 표식은 한 줄에 함께 있을 수 없음');
      }
    }

    if (answerCount === 1 && answer.length !== 1) {
      errors.push('FAQ 답변 A' + number + '은 별도 줄에 있어야 함');
    } else if (answer.length === 1) {
      answerLines.set(number, answer[0]);
      markerSequence.push({ label: 'A' + number, index: answer[0].index });
    }
  }

  const expectedSequence = ['Q1', 'A1', 'Q2', 'A2', 'Q3', 'A3'];
  markerSequence.sort((left, right) => left.index - right.index);
  if (
    markerSequence.length === expectedSequence.length &&
    markerSequence.some((marker, index) => marker.label !== expectedSequence[index])
  ) {
    errors.push('FAQ 질문과 답변의 순서가 올바르지 않음');
  }

  for (const number of [1, 2, 3]) {
    const question = questionLines.get(number);
    const answer = answerLines.get(number);
    if (question && answer) {
      if (question.index >= answer.index) {
        errors.push('FAQ 질문 Q' + number + '은 답변보다 먼저 나와야 함');
      } else {
        const between = text.slice(question.index + question[0].length, answer.index);
        if (!/^\r?\n[ \t]*\r?\n$/.test(between)) {
          errors.push('FAQ 질문 Q' + number + '과 답변 A' + number + ' 사이에 빈 줄이 필요함');
        }
      }
    }
  }

  return [...new Set(errors)];
}

export function normalizeFaqArtifacts(markdown) {
  const text = String(markdown);
  const newline = text.includes('\r\n') ? '\r\n' : '\n';
  const lines = text.split(/\r?\n/);
  let faqStart = -1;
  let faqEnd = lines.length;
  let fenceCharacter = null;
  let fenceLength = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence) {
      const marker = fence[1];
      if (fenceCharacter === null) {
        fenceCharacter = marker[0];
        fenceLength = marker.length;
      } else if (marker[0] === fenceCharacter && marker.length >= fenceLength) {
        fenceCharacter = null;
        fenceLength = 0;
      }
      continue;
    }
    if (fenceCharacter !== null) continue;

    const heading = line.match(/^(#{1,6})[ \t]+/);
    if (faqStart === -1) {
      if (/^##[ \t]+5(?:[.\s)]|$)/.test(line)) faqStart = index;
      continue;
    }
    if (heading && heading[1].length <= 2) {
      faqEnd = index;
      break;
    }
  }

  if (faqStart === -1) return text;

  fenceCharacter = null;
  fenceLength = 0;
  for (let index = faqStart + 1; index < faqEnd; index += 1) {
    const line = lines[index];
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fence) {
      const marker = fence[1];
      if (fenceCharacter === null) {
        fenceCharacter = marker[0];
        fenceLength = marker.length;
      } else if (marker[0] === fenceCharacter && marker.length >= fenceLength) {
        fenceCharacter = null;
        fenceLength = 0;
      }
      continue;
    }
    if (fenceCharacter !== null) continue;

    if (line.trim() === '**') {
      lines[index] = '';
      continue;
    }

    const markerLine = line.match(/^([ \t]*\*\*[QA][1-3]\.\*\*[ \t]+)(.*)$/);
    if (!markerLine) continue;

    let answerOrQuestion = markerLine[2];
    while (answerOrQuestion.endsWith('**')) {
      const boldMarkers = answerOrQuestion.match(/\*\*/g) || [];
      if (boldMarkers.length % 2 === 0) break;
      answerOrQuestion = answerOrQuestion.slice(0, -2).replace(/[ \t]+$/, '');
    }
    lines[index] = markerLine[1] + answerOrQuestion;
  }

  return lines.join(newline);
}
