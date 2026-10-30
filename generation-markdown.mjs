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
