---
title: "미드저니 V6 얼굴 고정 프롬프트 가이드: 20개 장면에서 동일 인물 유지하기"
description: "판교 IT 오피스 실무 현장 속 30분 만에 끝내는 미드저니 V6 캐릭터 일관성 유지 프롬프트 작성법과 복사해서 쓰는 마스터 템플릿."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpc6zt-0-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "Midjourney V6", "AI Art", "Workflow Automation"]
theme: "Cobalt Enterprise Lab"
---

## 1. AI 답변 퀄리티 붕괴와 업무 멘붕의 순간

판교의 한 IT 기업, 시각 15시 45분. 내일 아침 임원진 보고에 들어갈 브랜드 기획서 시안 20장을 완성해야 하는데, 미드저니로 생성한 주인공 얼굴이 장면마다 완전히 다른 사람으로 바뀌는 대참사가 벌어졌습니다. 1번 장면에선 세련된 단발머리 기획자였던 캐릭터가 2번 장면에선 흑발의 중년 남성으로 변하고, 3번 장면에선 애니메이션 캐릭터처럼 렌더링되는 상황. 마감까지 남은 시간은 단 30분. 이 난감한 야근 위기를 어떻게 돌파해야 할까요?

안녕하세요. 판교에서 데이터 분석과 기획 자동화 프로세스를 구축하고 있는 프롬프트 아키텍트입니다. 오늘은 미드저니 V6 환경에서 20개 이상의 다양한 씬(Scene)을 연출하면서도 동일한 캐릭터의 얼굴과 고유의 특징을 완벽하게 유지하는 실무형 프롬프트 엔지니어링 기법을 공유해 드리겠습니다.

---

## 1. AI 답변 퀄리티 붕괴와 업무 멘붕의 순간로는 얼굴 고정이 안 될까?

미드저니 V6는 이전 버전보다 텍스트 이해도와 실사 렌더링 능력이 극적으로 향상되었습니다. 하지만 바로 이 점 때문에 문제가 발생합니다. "커피를 마시는 여성", "회의실에서 발표하는 여성"이라고 각각 프롬프트를 입력하면, V6는 매번 새로운 문맥에 맞춰 완전히 새로운 인물을 창조해 냅니다. 

기존의 단순 단어 나열 방식이나 무작위 시드(Seed) 값 고정만으로는 20개에 달하는 다채로운 각도, 표정, 배경 변화 속에서 얼굴을 유지하기 역부족입니다. 

<div style="border-left: 4px solid #1e40af; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>실무 컨설턴트의 인사이트:</strong> 캐릭터 일관성을 잡기 위해서는 얼굴 구조를 정의하는 고유의 토큰 조합(Character Anchor)을 고정하고, `--cref` (Character Reference) 파라미터와 `--cw` (Character Weight) 수치를 목적에 맞게 조합해야 합니다.
</div>

---

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpc6zt-0-b/1000/550.jpg)

## 2. 30분 만에 끝내는 마스터 프롬프트 템플릿

아래의 마스터 프롬프트를 복사하여 ChatGPT나 Claude 입력창에 넣고 본인의 기획서 주제에 맞게 변수([Insert...])만 수정해 보세요. 미드저니 V6에서 즉시 활용할 수 있는 구조화된 프롬프트 세트를 만들어 줍니다.

```markdown
[시스템 역할 설정]
너는 세계 최고 수준의 생성형 AI 프롬프트 아키텍트이자 미드저니 V6 전문가야. 
사용자가 제공하는 캐릭터 설정과 20개의 씬 시나리오를 바탕으로, 동일한 얼굴과 스타일이 유지되는 미드저니 V6 프롬프트 리스트를 작성해줘.

[캐릭터 기준 설정 (Character Anchor)]
- 이름 및 특징: [예: 지수, 28세, 한국인 여성, 날렵한 턱선, 자연스러운 단발머리, 얇은 금테 안경]
- 기본 스타일: [예: 현대적이고 세련된 비즈니스 캐주얼, 고해상도 실사 사진 스타일]

[출력 요구사항]
1. 각 씬마다 캐릭터의 고유 외모 묘사 키워드를 동일하게 유지할 것.

2. 미드저니 V6 문법에 맞게 `--v 6.0`과 `--cref [첫 번째 이미지 URL]` 파라미터를 포함할 수 있는 구조로 작성할 것.

3. 20개의 씬에 대해 카메라 앵글, 조명, 행동을 다채롭게 변형할 것.

[사용자 입력 데이터]
- 프로젝트 주제: [예: 핀테크 앱 사용자 여정 기획서]
- 필수 포함 장면 수: 20개
```

실제 미드저니 입력창에 들어갈 프롬프트의 기본 구조는 다음과 같습니다.

```text
A professional Korean woman, 28 years old, sharp jawline, natural bob haircut, thin gold-rimmed glasses, wearing a modern business casual blazer, [Insert Scene Action: e.g., pointing at a data chart on a large glass whiteboard], office environment, natural lighting, photorealistic, 8k resolution --ar 16:9 --v 6.0 --cref [URL_OF_BASE_IMAGE] --cw 100
```

---

## 3. 현업 적용을 위한 핵심 파라미터 가이드

성공적인 20개 씬 제작을 위해 반드시 알아야 할 미드저니 V6 파라미터 설정값입니다.

<div style="border-left: 4px solid #1e40af; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>핵심 파라미터 요약</strong><br>
- <strong>--cref [URL]:</strong> 기준이 되는 첫 번째 이미지의 웹 링크를 입력하여 얼굴과 외모 특징을 고정합니다.<br>
- <strong>--cw 100:</strong> 캐릭터 가중치(Character Weight)를 0부터 100까지 설정합니다. 100으로 설정하면 얼굴뿐만 아니라 헤어스타일과 옷까지 똑같이 복사되므로, 옷을 바꾸고 싶다면 수치를 0-50 사이로 낮추어 조절하세요.<br>
- <strong>--v 6.0:</strong> 최신 V6 엔진을 강제 지정하여 디테일과 텍스트 표현력을 극대화합니다.
</div>

---

## 4. 자주 묻는 질문 (FAQ)

###

Q1. 얼굴은 비슷해지는데 옷이나 헤어스타일까지 똑같이 고정되어 곤란합니다. 어떻게 하나요?

A: `--cref` 파라미터를 사용할 때 `--cw` (Character Weight) 값을 낮추어야 합니다. 기본값인 100은 얼굴, 머리, 의상까지 모두 고정하지만, `--cw 20` 또는 `--cw 30`으로 설정하면 얼굴의 골격과 이목구비만 유지한 채 프롬프트에 작성한 새로운 의상과 헤어스타일이 자연스럽게 적용됩니다.

###

Q2. 20개 씬을 일일이 만들지 않고 한 번에 대량 생성할 수 있는 팁이 있나요?

A: ChatGPT나 Claude를 활용해 20개의 씬 시나리오를 먼저 짠 뒤, 위에서 제공한 마스터 프롬프트 구조에 맞춰 엑셀이나 CSV 형태로 일괄 출력해 달라고 요청하세요. 그 후 미드저니 파라미터가 포함된 프롬프트들을 순서대로 복사해서 입력하면 30분 안에 모든 소스를 확보할 수 있습니다.

###

Q3. 미드저니 V6에서 `--cref` 기능을 쓸 때 꼭 지켜야 할 규칙이 있나요?

A: 기준이 되는 첫 번째 이미지는 정면을 바라보고 조명이 선명하며 배경이 단순한 실사 이미지일수록 좋습니다. 얼굴이 측면이거나 어두우면 이후 20개 씬에서 AI가 얼굴 특징을 오인식하여 일관성이 깨질 확률이 높아집니다. 기준 이미지(Base Image) 선정이 전체 작업의 성공을 좌우합니다.
