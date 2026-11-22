---
title: "AWS AI Practitioner: Por que você não deve subestimar essa prova"
date: 2026-10-29T17:49:23Z
tags: ["aws", "cloud", "ia", "certificacao"]
summary: "Nível Foundational, mas nem tanto: minha experiência na AWS AI Practitioner e por que você deve estudar Bedrock, SageMaker, engenharia de prompt e métricas como ROUGE e BLEU."
devto:
  id: 4942825
  url: https://dev.to/enoqueleal/aws-ai-practitioner-por-que-voce-nao-deve-subestimar-essa-prova-ap3
---

## Agora é oficial: sou AI Practitioner 🎉

No último sábado, 24/10/2026, fiz a prova da **AWS Certified AI Practitioner** e fico muito feliz em compartilhar que alcancei a pontuação necessária para a aprovação. Agora sou oficialmente um AWS Certified AI Practitioner! 😊

Neste artigo, conto como foi minha preparação, o que mais me surpreendeu na prova e quais tópicos eu recomendo que você priorize se estiver pensando em encarar esse desafio.

## A preparação: o bom e velho método "bunda na cadeira"

O processo de preparação foi uma aventura e tanto. Precisei sair da zona de conforto e praticar o famoso método "bunda na cadeira": sentar e estudar, com constância e disciplina. É assim que eu gosto de aprender.

Confesso que não sou fã de me preparar fazendo simulados atrás de simulados. Respeito muito quem usa esse método e tem sucesso com ele, mas, para mim, não funciona. Prefiro estudar, entender os conceitos, e praticar na console, criando soluções que aplicam os conceitos que estou estudando. Isso me ajuda muito durante as provas.

Dica: Busque descobrir qual é o seu estilo de aprendizado. Não existe uma fórmula mágica. O melhor método é aquele que funciona para você, é claro

## A prova: "nível de entrada", mas nem tanto

Na minha experiência, fiquei bastante impressionado com o nível de complexidade da prova. Mesmo sendo uma certificação de nível Foundational (level 100), sinceramente, achei a prova bem difícil.

Tudo bem, tudo bem: minha especialidade nunca foi IA, engenharia de machine learning ou disciplinas correlatas. Ainda assim, para uma certificação de entrada, arrisco dizer que o nível de dificuldade é bem elevado.

Uma possível explicação: A prova parece ter herdado alguns tópicos que eram cobrados na AWS Certified Machine Learning – Specialty (aposentada pela AWS em 31 de março de 2026) e que também aparecem na AWS Certified Machine Learning Engineer - Associate. Ou seja, não dê bobeira e não menospreze essa "provinha". 😉

## O que estudar: minhas recomendações

Para referência, o guia oficial do exame (AIF-C01) organiza o conteúdo nestes domínios:


| Domínio                                                  | Peso |
| ---------------------------------------------------------| --- |
| Fundamentos de IA e ML                                   | 20% |
| Fundamentos de IA generativa                             | 24% |
| Aplicações de foundation models                          | 28% |
| Diretrizes para IA responsável                           | 14% |
| Segurança, conformidade e governança para soluções de IA | 14% |


Sempre confira a versão mais recente do  [guia oficial do exame](https://docs.aws.amazon.com/pt_br/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)  no site da AWS antes de começar os estudos.

Com base na minha experiência, estes são os pontos que eu priorizaria:

### 1. Amazon Bedrock

É claro que ele estaria aqui! Entenda bem os casos de uso, os foundation models, os conceitos de Knowledge Bases (RAG), Agents, Guardrails e as diferenças entre customizar um modelo com fine-tuning e simplesmente usar boas técnicas de prompt.

### 2. Amazon SageMaker

Conheça o ecossistema e para que serve cada componente, por exemplo: SageMaker Clarify (detecção de vieses e explicabilidade), Model Monitor, Data Wrangler, Ground Truth e JumpStart.

### 3. Engenharia de prompt

Zero-shot, few-shot, CoT (chain-of-thought), parâmetros de inferência como temperature, top-p e top-k, além de riscos como prompt injection e jailbreak.

### 4. Métricas (sim, métricas! 🤣😅)

Esse foi o ponto que mais me surpreendeu. Confesso que, antes de começar a estudar, eu não conhecia nenhuma destas métricas, e elas apareceram diversas vezes na prova. 🤯

Um resumo rápido para você não sofrer como eu sofri:

- ROUGE: compara o texto gerado com um texto de referência medindo a sobreposição de palavras e sequências (n-gramas), com foco em recall. Muito usada para avaliar sumarização.

- BLEU: também mede a sobreposição de n-gramas com uma referência, mas com foco em precisão. Clássica para avaliar tradução automática.

- BERTScore: em vez de comparar palavras exatas, compara o significado usando embeddings contextuais. Útil quando o modelo usa palavras diferentes para dizer a mesma coisa.

- Precision e Recall: métricas de classificação. Precision indica quantos dos itens apontados como positivos realmente são; Recall indica quantos dos positivos reais o modelo conseguiu encontrar.

- F1-Score: média harmônica entre Precision e Recall, ideal quando você precisa equilibrar as duas, especialmente com dados desbalanceados.

Vale também revisar Accuracy, matriz de confusão e AUC-ROC.

Ou seja, para quem não está familiarizado com o tema, é de explodir a cabeça! 🤯

### 5. IA responsável, segurança e governança
Juntos, esses temas somam quase 30% da prova. Estude vieses, explicabilidade, transparência, o modelo de responsabilidade compartilhada aplicado a IA e serviços como IAM, AWS CloudTrail e Amazon Macie no contexto de soluções de IA.

## Conclusão: IA não é hype, é realidade

Acredito que no momento que estou escrevendo essa publicação já esteja claro para todos os profissionais de tecnologia que a Inteligência artificial é uma realidade, não apenas um hype passageiro. Veio para ficar!

Eu defendo a ideia de que o nosso papel como profissionais de tecnologia é estudar, aprender, nos manter atualizados e, nos casos de uso em que fizer sentido, colocar a IA para trabalhar a nosso favor. Sempre foi assim e continuará sendo, por mais que isso possa doer.

Se você ainda é cético sobre o assunto, fica o recado: abra o olho! 😉

E você, já fez ou está se preparando para a AWS Certified AI Practitioner? Conta nos comentários como foi sua experiência ou deixe suas dúvidas. 

Vou adorar trocar ideias!
