---
title: "Gardez le même visage sur 20 scènes Midjourney V6 sans perdre la boule"
description: "Guide pratique d'ingénierie de prompt pour maintenir des visages de personnages cohérents dans Midjourney V6 pour vos projets d'agence."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpd71m-4-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney V6", "Prompt Engineering", "Claude Artifacts", "Design Workflow"]
theme: "Sunset Horizon Coral"
---


Il est 22h dans notre agence à Paris, et la pression est à son comble. Nous devons boucler la création d'un outil interactif avec Claude Artifacts en un temps record pour un client majeur du secteur du luxe. Le prototype fonctionne à merveille, le code est propre, mais un problème critique bloque la validation finale : sur les 20 scènes générées pour illustrer le parcours utilisateur, notre héroïne principale change de visage à chaque image. Un coup elle est blonde aux yeux clairs, l'instant d'après brune aux traits anguleux. Impossible de livrer un storytelling visuel aussi décousu.

Au début, j'ai essayé la méthode naïve. J'ai balancé des descriptions physiques kilométriques dans mes prompts Midjourney V6 : "A 25-year-old French woman with hazel eyes, bob haircut, wearing a beige trench coat, realistic lighting..." Résultat catastrophique. Midjourney interprète chaque prompt comme une page blanche, réinventant le personnage à chaque génération. Même avec le même "seed", le moindre changement de décor ou d'action venait détruire la morphologie faciale.

La solution ne réside pas dans la complexité du texte, mais dans une architecture de prompt rigoureuse combinant les paramètres natifs de la V6, une structure de description atomique et le paramètre `--cref` (Character Reference). Voici la méthode exacte que nous avons déployée cette nuit-là pour générer les 20 scènes avec un taux de constance faciale de 95%.

<div style="border-left: 4px solid #f97316; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Le saviez-vous ?</strong> Le paramètre `--cref` de Midjourney V6 analyse les traits du visage d'une image de référence pour les projeter sur les nouvelles générations, éliminant ainsi 80% des variations indésirables entre vos scènes.
</div>

## 1. La structure de l'architecture de prompt V6

Pour figer un personnage, il faut séparer l'identité visuelle du contexte de la scène. Voici la structure infaillible que nous utilisons désormais dans tous nos sprints créatifs :

*   **Identité de base :** Nom de code du personnage + traits anthropométriques fixes.
*   **Action et Contexte :** Ce que fait le personnage dans la scène spécifique.
*   **Direction Artistique :** Style photographique, éclairage et ambiance colorimétrique.
*   **Paramètres techniques :** `--cref [URL_IMAGE_BASE]` suivi du paramètre de poids `--cw`.

Voici le template maître prêt à l'emploi que vous pouvez copier-coller dans votre outil de centralisation (comme vos instructions système sur Claude ou vos blocs de notes) :

```text
[NomDuPersonnage], a 28-year-old French woman, sharp jawline, straight bob auburn hair, hazel eyes, wearing [Vêtement_Spécifique], positioned in [Action_De_La_Scène], set against [Décor_Détaillé], cinematic lighting, shot on 35mm lens, photorealistic --ar 16:9 --v 6.0 --cref https://url-de-votre-personnage-reference.jpg --cw 100
```

<div style="border-left: 4px solid #f97316; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Astuce de pro :</strong> Le paramètre de poids de cohérence `--cw` varie de 0 à 100. Utilisez `--cw 100` pour copier le visage ET les cheveux/vêtements, et `--cw 0` si vous voulez garder uniquement le visage tout en changeant la tenue et la coiffure de votre personnage selon les scènes.
</div>



![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpd71m-4-b/1000/550.jpg)

## 2. Étapes pratiques pour industrialiser 20 scènes

Ne lancez jamais vos 20 prompts à l'aveugle. Suivez cette méthodologie en cascade pour garantir un résultat homogène :

1.  **Générez la "Master Image" :** Créez une image de face de votre personnage sur fond neutre avec un éclairage parfait. C'est elle qui servira de référence universelle.
2.  **Récupérez l'URL :** Copiez le lien permanent de cette image générée sur Discord.
3.  **Appliquez le template :** Pour chaque scène de votre outil interactif, reprenez la même structure de prompt en modifiant uniquement l'action et le décor, tout en conservant le lien `--cref` et le même `--cw`.
4.  **Ajustez par itération :** Si une variation dévie trop, augmentez légèrement le paramètre `--s` (Stylize) ou recadrez via l'outil Zoom/Pan de Midjourney.

## 3. Comparatif avant/après de la méthode

| Critère | Approche classique (Vague) | Approche structurée (--cref + Template) |
| :--- | :--- | :--- |
| **Taux de constance faciale** | 10 à 20% de réussite sur 20 scènes | 90 à 95% de fidélité visuelle |
| **Temps de production** | 4 heures de retouches et de régénérations | 30 minutes de prompts maîtrisés |
| **Intégration UI/UX** | Impossible (visages incohérents dans l'app) | Parfaite pour les prototypes Claude Artifacts |

## Foire Aux Questions (FAQ)

### Pourquoi mon personnage change-t-il de vêtements malgré le paramètre `--cref` ?
Par défaut, le paramètre `--cref` avec un poids `--cw 100` tente de conserver la tenue de l'image de référence. Si vous décrivez de nouveaux vêtements dans votre prompt textuel (par exemple, "wearing a red dress" alors que l'image de base portait un manteau), Midjourney va souvent fusionner les deux ou donner la priorité au texte pour les vêtements tout en essayant de garder le visage. Pour un contrôle total, utilisez `--cw 0` pour figer uniquement les traits du visage.

### Puis-je combiner `--cref` et `--sref` (Style Reference) en même temps ?
Absolument. C'est même la combinaison ultime pour les agences. Vous pouvez ajouter `--cref [URL_VISAGE]` pour l'identité de votre personnage et `--sref [URL_STYLE]` pour imposer la même charte graphique, la même palette de couleurs et la même texture à l'ensemble de vos 20 scènes.

### Comment faire si mon personnage doit porter des lunettes ou un chapeau dans certaines scènes ?
Les accessoires modifient la structure apparente du visage et perturbent l'algorithme de reconnaissance de Midjourney. Pour ces scènes spécifiques, baissez le paramètre de poids à `--cw 30` ou `--cw 50`. Cela permettra à l'IA d'accepter l'accessoire tout en maintenant une similarité structurelle suffisante avec l'image de référence.
