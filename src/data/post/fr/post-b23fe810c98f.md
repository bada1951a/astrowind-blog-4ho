---
title: "Perplexity Pro : rechercher brevets et travaux scientifiques en profondeur"
description: "Une méthode pour cadrer une recherche, recouper les sources et vérifier les résultats sur Perplexity Pro."
publishDate: 2026-10-31T10:30:00.000Z
image: "https://picsum.photos/seed/prompt-mvwagzt8-4-c/1200/675.jpg"
category: "Prompt Engineering"
tags: ["Prompt Engineering","ChatGPT","Claude","IA Générative"]
theme: "Retro Monokai"
---

## 1. Partir d’une question de recherche précise

Lorsqu’on explore une technologie, on peut trouver des articles scientifiques qui semblent répondre à la question, puis découvrir qu’un brevet décrit un dispositif proche — ou que les deux parlent en réalité de choses différentes. Le problème n’est pas seulement de trouver des documents : il faut comprendre leur portée, leur date, leurs auteurs et les limites de ce qu’ils permettent d’affirmer. Je commencerais donc par transformer le sujet en question vérifiable, avant de demander à Perplexity Pro de chercher.

Par exemple, au lieu de saisir « batteries sodium-ion », on peut préciser : « Quelles approches de cathode pour batteries sodium-ion ont été étudiées depuis 2020, et quels brevets publiés revendiquent des compositions comparables ? » Cette formulation délimite une période et deux types de documents, sans supposer qu’un article et un brevet ont la même valeur probante. Pour une décision juridique, une étude de liberté d’exploitation ou une revue systématique, les résultats d’un outil de recherche restent un point de départ, pas un avis professionnel.



![How to Use Perplexity Pro Search Prompts for Deep Patent and Academic Research Prompt Guide](https://picsum.photos/seed/prompt-mvwagzt8-4-b/1000/550.jpg)

## 2. Comprendre ce que les résultats peuvent montrer

Une recherche Pro peut aider à repérer des sources et à dégager des pistes, mais une réponse synthétique ne remplace ni la lecture des documents ni une recherche exhaustive. Les brevets sont notamment publiés par différentes juridictions et bases ; une même invention peut apparaître dans une famille de brevets, avec des demandes, des publications et des statuts distincts. Un résultat qui mentionne un document ne suffit donc pas à établir qu’il est en vigueur, qu’il couvre un produit donné ou qu’il est le premier sur le sujet.

Je distinguerais aussi les indices selon le corpus. Pour les articles, je vérifierais le titre exact, les auteurs, la revue ou le dépôt, la date, le DOI ou l’identifiant de prépublication et, si possible, le texte intégral. Pour les brevets, je noterais le numéro de publication, la juridiction, les dates de dépôt et de publication, les inventeurs, le déposant, les revendications et les liens vers les membres de la famille. Les pages de l’Office européen des brevets, de l’INPI ou de l’OMPI peuvent servir à contrôler des données bibliographiques ; Google Patents et Espacenet facilitent l’exploration, mais ne remplacent pas l’interprétation juridique.

## 3. Structurer les requêtes en étapes

Je préfère faire plusieurs requêtes ciblées plutôt qu’une seule demande chargée. Cela rend plus visible ce qui est établi, ce qui relève d’une piste et ce qui manque. Dans Perplexity Pro, je précise le type de source recherché, les critères d’inclusion et la forme attendue. Si les options de recherche ou les filtres proposés dans l’interface évoluent, je m’appuie sur les réglages disponibles au moment de la recherche plutôt que de supposer leur fonctionnement.

Un modèle réutilisable :

`Recherche des publications scientifiques et des brevets publiés sur [sujet précis], entre [dates], concernant [application ou mécanisme]. Sépare les résultats par type de document et par juridiction. Pour chaque source, donne le titre, les auteurs ou déposants, la date, l’identifiant vérifiable et le lien. Résume la méthode ou les revendications pertinentes, en distinguant explicitement les faits du document de tes interprétations. Signale les éléments introuvables et les limites de couverture.`

Ensuite, je découperais le travail :

1. **Définir le vocabulaire.** Demander les synonymes, variantes orthographiques, termes techniques et éventuels codes de classification à vérifier. Pour les brevets, ces termes servent à élargir la recherche ; ils ne garantissent pas une couverture complète.
2. **Chercher les articles.** Ajouter une question séparée sur les résultats expérimentaux, les limites déclarées par les auteurs et les travaux cités. Demander à distinguer articles évalués par les pairs, prépublications et revues de littérature.
3. **Explorer les brevets.** Rechercher les expressions techniques, les classifications proposées et les numéros de documents repérés. Demander les éléments bibliographiques et les revendications citées, sans conclure à la nouveauté ou à la validité juridique.
4. **Comparer prudemment.** Faire établir un tableau avec, par exemple, le mécanisme, le matériau, l’application, la date, le type de source et le passage justificatif. Une ressemblance de vocabulaire n’est pas nécessairement une équivalence technique.

## 4. Vérifier avant de réutiliser

Je contrôlerais chaque source directement, en priorité celles qui soutiennent la conclusion principale. Un lien doit ouvrir le document cité et correspondre au titre, à la date et à l’identifiant annoncés. Si Perplexity résume une revendication, je la lirais dans le texte du brevet : le résumé descriptif et les revendications n’ont pas le même rôle. Pour un article, je comparerais la synthèse avec les méthodes, les résultats et les limites de l’étude, pas seulement avec son titre.

Quelques erreurs fréquentes méritent un contrôle particulier : confondre date de priorité, dépôt et publication ; traiter une demande comme un brevet délivré ; compter plusieurs membres d’une famille comme des inventions indépendantes ; ou présenter une corrélation bibliographique comme une preuve d’efficacité. Je demanderais aussi une liste des sources absentes ou incertaines et je relancerais une recherche avec les synonymes, les identifiants trouvés et, si pertinent, une autre juridiction. Pour un usage juridique, réglementaire ou commercial important, il faut vérifier les bases officielles et solliciter un professionnel qualifié.

## 5. Questions fréquentes

**Q1.** Perplexity Pro peut-il établir qu’une invention est brevetable ?

**A1.** Non, pas à lui seul. Il peut aider à repérer des documents antérieurs, mais la brevetabilité dépend d’une analyse juridique et technique, notamment des revendications et des règles applicables. Vérifiez les sources et demandez un avis spécialisé si l’enjeu le justifie.

**Q2.** Comment éviter de mélanger articles et brevets dans une synthèse ?

**A2.** Demandez deux sections ou deux tableaux distincts, avec des champs adaptés à chaque corpus. Pour chaque affirmation, conservez le lien et l’identifiant du document, puis vérifiez que la source étaye bien cette affirmation.

**Q3.** Que faire si une référence ou un lien paraît douteux ?

**A3.** Ne la reprenez pas comme un fait établi. Recherchez le titre ou le numéro dans la base de l’éditeur, de l’office des brevets ou du dépôt scientifique concerné. Si la référence reste introuvable, signalez-la comme non vérifiée ou excluez-la.
