---
title: "Midjourney V6完全攻略：20シーンでも同一キャラクターの顔を完璧に固定するプロンプト設計術"
description: "東京・丸の内のオフィスで勃発した企画書作成の危機。Midjourney V6でキャラクターの顔ブレを防ぎ、20シーンを一貫させる実践プロンプト術をAIアーキテクトが徹底解説。"
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpcpgo-2-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "Midjourney", "Claude", "AI Tips"]
theme: "Rosewood Hardware Guide"
---

## 1. AIの回答精度崩壊と業務停滞の緊急事態

東京・丸の内のオフィス、時計の針は深夜を回る頃。翌朝のクライアント向け大型ピッチ資料の最終確認で、社内が緊迫した空気に包まれていました。案件の成否を握る新規サービスの企画書には、一人の主人公が様々なシチュエーションで活躍する20枚のビジュアルが必要。しかし、そこで我々を襲ったのは最悪の事態でした。「シーンが変わるたびに主人公の顔や髪型が別人になってしまう」という、生成AI特有のキャラクターブレの壁です。

「これでは同一人物のストーリーとして成立しない...朝までに20枚すべてを揃えるのは無理か」

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpcpgo-2-b/1000/550.jpg)

焦るプロジェクトチームを救ったのは、AIモデルの特性を理解し、一貫性を保つための「構造化されたプロンプト設計」でした。今日は、この修羅場を乗り越えた実戦投入済みのMidjourney V6キャラクター固定術をすべて公開します。

<div style="border-left: 4px solid #be123c; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>AIアーキテクトの緊急アドバイス:</strong> 単に「同じ女性」と指示するだけでは、Midjourney V6は文脈を維持できません。顔の骨格、髪型、服装、そしてライティングの4要素をコード化し、--crefパラメータと組み合わせることで初めてブレのない一貫性が生まれます。
</div>

## なぜ普通のプロンプトでは顔がブレるのか？

Midjourney V6は言語理解力が飛躍的に向上した一方で、確率的サンプリングの性質上、シーン（背景や動作）が変わると、キャラクターのアイデンティティを再解釈してしまいます。

例えば、「丸の内のカフェで働く女性」と「プレゼン中の女性」と入力した場合、AIは「丸の内の女性像」「プレゼン中の女性像」それぞれの確率分布から画像を生成するため、別人が誕生します。これを防ぐには、「固定すべき特徴量」と「変化させる環境情報」をプロンプト内で明確に分離しなければなりません。

LLM（ClaudeやChatGPT）を活用したワークフローの比較は以下の通りです。Claude ArtifactsやGPT Canvasをうまく使い分けることで、20シーン分のプロンプトを爆速で生成できます。

| 活用プラットフォーム | 主な役割 | メリット・特徴 |
| :--- | :--- | :--- |
| Claude (Artifacts) | プロンプトの構造化・一括生成 | 長文のコンテキスト保持とコードブロック出力に優れ、20シーンのバリエーション展開を一瞬で行える |
| ChatGPT (Canvas) | シナリオとセリフの調整 | 人間味のある自然なシーン描写の微調整や、マーケティング視点でのトーン＆マナー統一に向いている |

## 実戦投入！ブレないキャラクターを作るマスタープロンプト

まずは、すべての基準となる「基準画像（Base Character）」を作成するためのマスタープロンプトを定義します。

```markdown
[Character Core]: A 28-year-old Japanese female professional, sharp symmetrical facial features, warm hazel eyes, shoulder-length straight dark brown hair with subtle bangs, minimalist silver earrings --ar 16:9 --v 6.0 --style raw
```

この基準画像が生成できたら、その画像リンク（URL）を取得し、残りの19シーンすべてに `--cref [URL]` を組み込みます。

<div style="border-left: 4px solid #be123c; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>プロの技:</strong> キャラクターリファレンスを使う際は、--cw（Character Weight）パラメータを 100 に設定してください。「--cw 100」と指定することで、顔だけでなく髪型や服装も含めて厳密に参照させることができます。服を変えたい場合は --cw 0 にして顔だけを固定するテクニックも有効です。
</div>

### 20シーン展開用のテンプレート構造

ClaudeやChatGPTに以下のシステムプロンプトを渡し、20シーン分のMidjourney用プロンプトを一括出力させます。

```markdown
# 役割
あなたは一流のAIビジュアルディレクターです。以下のキャラクター基準を維持したまま、指定された20のビジネスシーンにおけるMidjourney V6用プロンプトを作成してください。

# キャラクター基準
- 特徴: 28-year-old Japanese female professional, sharp symmetrical facial features, warm hazel eyes, shoulder-length straight dark brown hair.
- 共通設定: --cref [基準画像のURL] --cw 100 --v 6.0 --style raw --ar 16:9

# 出力フォーマット
シーン番号. [アクション・環境描写] + [キャラクターコア] + [共通パラメータ]
```

## 実践例：異なる3シーンでのプロンプト展開

実際に上記テンプレートから生成されるプロンプトの具体例です。背景やライティングが変わっても、顔の一貫性が保たれます。

*   シーン1（オフィスでの朝会）:
    `A Japanese female professional smiling during a morning briefing in a modern Tokyo office, cinematic lighting, corporate interior --cref https://link.to/base.jpg --cw 100 --v 6.0 --style raw --ar 16:9`
*   シーン2（タクシー移動中のリサーチ）:
    `A Japanese female professional looking at a tablet inside a moving Tokyo taxi at night, city lights blurred in background, moody lighting --cref https://link.to/base.jpg --cw 100 --v 6.0 --style raw --ar 16:9`
*   シーン3（クライアントへの大型プレゼン）:
    `A Japanese female professional confidently presenting in a bright glass-walled boardroom, pointing at a large digital screen --cref https://link.to/base.jpg --cw 100 --v 6.0 --style raw --ar 16:9`

---

## 5. よくある質問 (FAQ)

###

**Q1.** `--cref` を使っても微妙に顔が変わってしまいます。どうすればいいですか？

**A.** `--cw` パラメータの値を確認してください。デフォルトでは服や髪型も含めて参照されますが、顔の骨格だけを完全に固定したい場合は `--cw 0` を試してください。また、基準画像の顔が正面を向いており、高解像度でクリアであることも重要です。

###

**Q2.** 20シーンすべてで同じ服装になってしまい、バリエーションが出ません。

**A.** キャラクターリファレンス（`--cref`）の重みを下げるか、プロンプト内で服装の指定を明確に上書きしてください。例えば、基準画像がスーツの場合でも、プロンプトに `wearing a casual beige knit sweater` と記述し、`--cw 30` などの低いウェイトを設定することで、顔を維持しつつ服装だけを変更できます。

###

**Q3.** Midjourney V6以外のバージョンでもこの方法は使えますか？

**A.** `--cref`（キャラクターリファレンス）機能は Midjourney V6 および V5.2 の一部で最適化されています。特にV6はテキストプロンプトの理解力が圧倒的に高いため、V6（`--v 6.0`）環境での実行を強く推奨します。
