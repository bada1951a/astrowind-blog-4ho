---
title: "Guia Midjourney V6: Como Manter Rosto Consistente em 20 Cenas"
description: "Aprenda a travar a identidade de personagens no Midjourney V6 para criar narrativas visuais consistentes em campanhas e apresentacoes corporativas."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpdx8w-7-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney V6", "Prompt Engineering", "IA Generativa", "Design", "Automacao"]
theme: "Matte Black stealth"
---


Eram 19h de uma terca-feira na nossa software house aqui em Sao Paulo, e o cliente simplesmente virou a mesa na reuniao de alinhamento: o pitch deck com 20 cenas estava pronto, mas o protagonista tinha um rosto diferente em absolutamente todas as imagens. A cada geracao no Midjourney, a inteligencia artificial decidia inventar um boneco novo. O prazo para entrega do material comercial era a manha seguinte, e recomeçar do zero significaria perder horas preciosas de renderizacao e estourar o nosso limite de GPU.

Se voce ja passou por isso, sabe que o problema nao e a falta de criatividade, mas a ausencia de uma arquitetura de prompt rigida no Midjourney V6. A versao 6 e incrivelmente realista, mas ela sofre de "amnesia criativa" se voce nao souber usar os parametros corretos de ancoragem de imagem e consistencia de peso.

<div style="border-left: 4px solid #ffffff; padding: 12px 16px; margin: 20px 0; background-color: rgba(255,255,255,0.08); border-radius: 4px; color: #111827;">
<strong>Atencao pratic

a:</strong> Nao adianta apenas descrever o personagem com palavras complexas. O Midjourney V6 prioriza o estilo geral da cena em detrimento de micro-detalhes faciais, a menos que voce utilize o parametro de referencia cruzada de imagem combinado com descricoes textuais estruturadas.
</div>

## O Problema Raiz: Por que prompts vagos falham na geracao sequencial

Quando criamos uma imagem usando apenas descricoes como "jovem executivo sorrindo em Sao Paulo", o algoritmo puxa variacoes aleatorias do seu banco de dados massivo a cada nova linha de comando. Para manter a consistencia em 20 cenas, precisamos transformar a identidade visual em uma variavel fixa. A solucao nao esta em tentar adivinhar palavras magicas, mas em seguir um fluxo de engenharia de prompts dividido em tres pilares:
1. O Ancorador de Referencia (--cref): Usar o link da imagem original do personagem como chave de identidade.

2. O Modificador de Peso (--cw): Controlar o quanto o Midjourney pode alterar o cabelo e as roupas versus o formato do rosto.

3. A Estrutura Modular: Manter o mesmo esqueleto de prompt alterando apenas a acao, o cenario e a iluminacao.

## O Master Prompt Template para Consistencia de Rosto

Copie o template abaixo e ajuste as variaveis conforme o seu projeto. Este modelo foi testado exaustivamente no Midjourney V6 para manter o mesmo personagem em escritorios, ruas e salas de reuniao.

```markdown
[URL_DA_IMAGEM_BASE] A professional [Gnero/Etnia] working in a modern [Cenario], wearing [Tipo de Roupa], natural office lighting, cinematic composition, shot on 35mm lens, photorealistic, high detail --cref [URL_DA_IMAGEM_BASE] --cw 85 --v 6.0 --ar 16:9
```

### Guia rapido de variaveis para o seu fluxo:
- [URL_DA_IMAGEM_BASE]: O link direto da primeira imagem perfeita do seu personagem (use o comando `/copy link` no Discord).
- --cref (Character Reference): O parametro que obriga o Midjourney V6 a olhar para a imagem de referencia fornecida. - --cw 85 (Character Weight): Define a intensidade da copia. O valor 100 copia rosto, cabelo e roupas. O valor 0 copia apenas o rosto, permitindo trocar o guarda-roupa do personagem entre as 20 cenas. Use 85 para manter a identidade preservada com flexibilidade de vestimenta. <div style="border-left: 4px solid #ffffff; padding: 12px 16px; margin: 20px 0; background-color: rgba(255,255,255,0.08); border-radius: 4px; color: #111827;">
<strong>Dica de ouro:</strong> Nunca mude a primeira parte da descricao do texto quando for gerar a cena 2, 3 ou 4. Mantenha os traços fisicos principais identicos e altere apenas o contexto da acao e o cenario de fundo.
</div>

## Variacoes Praticas e Prevencao de Alucinacoes

Para garantir que o seu personagem nao mude drasticamente de idade ou aparencia ao longo das 20 cenas, siga estas regras de ouro na sua rotina de automacao:

- Trave a Iluminacao: Sempre inclua termos como "soft office lighting" ou "natural daylight" para evitar que mudancas drasticas de luz distorcam os traços faciais na interpretacao da I

A.
- Evite Misturar Estilos: Se a primeira cena for fotografica, nao insira termos como "digital art" ou "oil painting" nas cenas seguintes. Mantenha a mesma familia lexica de estilo visual.
- Gerenciamento de Historico: Salve sempre a imagem gerada na Cena 1 em uma pasta dedicada. Se a Cena 10 comecar a derivar muito, use o link da imagem da Cena 5 como nova referencia auxiliar (--cw 100).

## Perguntas Frequentes (FAQ)

### 1. O parametro --cref funciona com qualquer versao do Midjourney?
Nao. O parametro de referencia de personagem (--cref) e uma exclusividade nativa e altamente otimizada do Midjourney V6. Certifique-se de incluir `--v 6.0` no final dos seus prompts ou configurar sua versao padrao no `/settings`.



![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpdx8w-7-b/1000/550.jpg)

### 2. Posso usar fotos reais de pessoas como referencia de rosto?
Sim, voce pode hospedar a foto real de uma pessoa (ou um rosto gerado anteriormente), colar o link no prompt e usar o `--cref`. Porem, para rostos gerados por IA, o resultado de consistencia costuma ser ainda mais fluido e sem problemas de direitos de imagem.

### 3. Como faço para mudar a roupa do personagem sem perder o rosto?
Basta ajustar o parametro `--cw` para valores entre 0 e 50 (ex: `--cw 30`). Isso diz ao Midjourney para copiar estritamente os traços faciais da imagem de referencia, ignorando o estilo das roupas e do cabelo, permitindo que voce vista seu personagem com terno, camisa casual ou jaqueta em cenas diferentes.
