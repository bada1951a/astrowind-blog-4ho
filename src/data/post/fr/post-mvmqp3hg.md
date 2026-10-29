---
title: "Extraction de données en tableau avec le Few-Shot Prompting"
description: "Guide pratique pour extraire des tableaux propres de textes non structurés sans hallucinations avec l'IA."
publishDate: 2026-10-25T03:20:00.000Z
image: 'https://picsum.photos/seed/prompt-mvmqpwnv-4-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "Modern Minimalist Slate"
---

## 1. Situation d'urgence critique au bureau L'angoisse du rapport de marché à La Défense

Il est 16h50, et la pression monte au 28e étage d'une tour de La Défense. Je dois boucler le rapport d'analyse de la concurrence pour le comex prévu à 18h00. J'ai sous les yeux un PDF brut de 60 pages rempli de communiqués de presse, de retranscriptions de conférences téléphoniques et de notes d'analystes non structurées. Je veux transformer ce chaos textuel en un tableau comparatif net (Parts de marché, Chiffre d'affaires 2025, Croissance YoY, Stratégie IA). 

Je demande naïvement à l'Ia.

*"Extrais-moi les chiffres clés des concurrents de ce texte sous forme de tableau."* 

Le résultat ? Un désastre absolu. L'IA me sort un tableau avec un air parfaitement confiant, mais en inventant la moitié des pourcentages de croissance, en mélangeant les devises (euros et dollars), et pire encore, en citant un chiffre d'affaires totalement fictif pour l'un de nos plus grands rivaux. Classique hallucination. Le modèle a voulu "combler les trous" parce que mon prompt manquait cruellement de structure et d'exemples concrets. Pas question de présenter des fausses données au patron.

<div style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Le saviez-vous ?</strong> En environnement corporate, une IA n'a pas le droit à l'erreur sur les chiffres. Le Zero-Shot (demander sans exemple) échoue 70 pourcent du temps sur de l'extraction tabulaire complexe. Le secret réside dans le Few-Shot Prompting.
</div>

![How to Write Few-Shot Prompts to Extract Tabular Data from Unstructured Text Prompt Guide](https://picsum.photos/seed/prompt-mvmqpwnv-4-b/1000/550.jpg)

## 2. [Analyse] Pourquoi le Zero-Shot échoue et comment le Few-Shot corrige le tir

Le problème fondamental vient de la nature probabiliste des LLM. Quand vous lui balancez un texte brut sans lui donner le format exact attendu, il devance vos attentes en générant du contenu plausible mais faux. 

Le <strong>Few-Shot Prompting</strong>(ou apprentissage par quelques exemples) consiste à donner à l'IA 1 ou 2 exemples parfaits de ce que vous voulez avant de lui soumettre la vraie source. C'est exactement comme briefer un nouvel analyste junior : au lieu de lui dire "fais de mon mieux", vous lui montrez un ancien rapport validé en lui disant "fais exactement pareil avec ces nouvelles données".

Pour que cela fonctionne à tous les coups, notre structure de prompt doit intégrer :
1.<strong>Un rôle clair</strong>(Expert en veille stratégique).

2.<strong>Une règle d'or anti-hallucination</strong>(Si le chiffre n'est pas dans le texte, écrire "Non disponible" ou "N/A", ne jamais deviner).

3.<strong>Des exemples concrets (Few-Shot)</strong> montrant l'entrée textuelle et la sortie tabulaire exacte.

4.<strong>La donnée cible</strong> à analyser.

## 3. [Template] Le Master Prompt prèt à l'emploi

Voici le prompt exact que j'utilise désormais pour toutes mes extractions de données financières et de marché. Copiez-le et adaptez-le dans ChatGPT, Claude ou Gemini.

```markdown
Tu es un analyste financier senior spécialisé dans l'extraction de données structurées. Ton objectif est de convertir le texte non structuré fourni en un tableau Markdown rigoureux.

RÈGLES STRICTES :
1. N'invente JAMAIS aucune donnée. Si un chiffre ou une information est absent du texte source, écris explicitement "N/A".

2. Respecte scrupuleusement les en-têtes de colonnes définis ci-dessous.

3. Ignore les informations non pertinentes.

[EXEMPLE DE DÉMONSTRATION 1]
Texte source : 
"La société AlphaTech a réalisé un CA de 45 millions d'euros en 2024, en hausse de 12% par rapport à l'an dernier. Leur position sur le marché européen reste stable."

Tableau attendu :
| Concurrent | CA 2024 | Croissance YoY | Focus Stratégique |
| :--- | :--- | :--- | :--- |
| AlphaTech | 45 M€ | +12% | Non mentionné |

[FIN DE L'EXEMPLE]

[DONNÉES CIBLES À TRAITER]
[Insérer ici votre texte brut non structuré, vos notes de réunion ou vos extraits de rapports de concurrence]

Génère uniquement le tableau Markdown final basé sur les données cibles en respectant les règles ci-dessus.
```

## 4. [Variations] Astuces de pro et gestion des paramètres

Pour pousser l'exercice encore plus loin selon l'outil que vous utilisez au bureau :

* <strong>Sur Claude 3.5 Sonnet :</strong> Ce modèle excelle particulièrement dans le respect des structures tabulaires complexes. Vous pouvez lui demander de sortir directement le résultat au format CSV ou JSON en modifiant simplement la ligne du format de sortie.
* <strong>Sur ChatGPT (GPT-4o) :</strong> Utilisez les <strong>Instructions système</strong> (Custom Instructions) pour y intégrer la règle anti-hallucination une bonne fois pour toutes, vous n'aurez plus besoin de la répéter dans chaque prompt.
* <strong>Paramètres de température :</strong> Réglez la <strong>température à 0</strong>(si l'interface le permet, comme sur l'API ou certains playgrounds). Cela supprime la créativité de l'IA et la force à être purement déterministe et factuelle.

<div style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Astuce produit :</strong> Si votre texte fait plus de 20 pages, découpez-le en sections logiques (par exemple, section par concurrent) plutôt que de tout envoyer d'un coup. Vous obtiendrez un taux de précision proche de 100 pourcent.
</div>

## 5. Foire Aux Questions (FAQ)

<strong>Q.</strong> Que faire si l'IA oublie une colonne entière dans le tableau final malgré mes instructions ?

A. Renforcez l'exemple de démonstration (Few-Shot) en y incluant explicitement la colonne manquante avec des données factices. L'IA imite la structure visuelle des exemples avec une efficacité redoutable.

<strong>Q.</strong> Puis-je utiliser cette méthode pour convertir du texte directement en fichier Excel (.xlsx) ?

A. Les LLM ne peuvent pas générer directement un fichier binaire cliquable, mais vous pouvez leur demander de formater la sortie en CSV ou en tableau Markdown. Vous n'avez ensuite qu'à copier-coller le tableau directement dans Excel, les colonnes se répartiront d'elles-mêmes.

<strong>Q.</strong> Comment éliminer définitivement les hallucinations sur les chiffres décimaux ?

A. Ajoutez une règle textuelle explicite dans votre prompt : "Conserve le format exact des chiffres trouvés dans le texte source, sans arrondir ni modifier les décimales." Couplé à une température à 0, le résultat sera infaillible.
