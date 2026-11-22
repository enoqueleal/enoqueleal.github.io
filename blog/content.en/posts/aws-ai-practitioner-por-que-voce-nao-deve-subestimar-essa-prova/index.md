---
title: "AWS AI Practitioner: why you shouldn't underestimate this exam"
slug: aws-ai-practitioner-why-you-should-not-underestimate-this-exam
date: 2026-10-29T17:49:23Z
tags: ["aws", "cloud", "ai", "certification"]
summary: "Foundational level, but not that easy: my experience with the AWS AI Practitioner and why you should study Bedrock, SageMaker, prompt engineering and metrics such as ROUGE and BLEU."
translatedFrom: pt
devto:
  id: 4942825
  url: https://dev.to/enoqueleal/aws-ai-practitioner-por-que-voce-nao-deve-subestimar-essa-prova-ap3
---

{{< translated-from >}}

## It's official: I'm an AI Practitioner 🎉

Last Saturday, 10/24/2026, I took the **AWS Certified AI Practitioner** exam, and I am very happy to share that I reached the passing score. I am now officially an AWS Certified AI Practitioner! 😊

In this article, I talk about how I prepared, what surprised me most in the exam and which topics I recommend you prioritize if you are thinking about taking on this challenge.

## Preparation: the good old "butt in the chair" method

The preparation process was quite an adventure. I had to step out of my comfort zone and practice the famous "butt in the chair" method: sit down and study, with consistency and discipline. That is how I like to learn.

I confess I am not a fan of preparing by taking practice exam after practice exam. I really respect those who use this method and succeed with it, but it does not work for me. I prefer to study, understand the concepts and practice in the console, building solutions that apply the concepts I am studying. That helps me a lot during exams.

Tip: try to find out what your learning style is. There is no magic formula. The best method is the one that works for you, of course.

## The exam: "entry level", but not quite

In my experience, I was quite impressed by the level of complexity of the exam. Even though it is a Foundational-level certification (level 100), honestly, I found the exam quite hard.

Okay, okay: my specialty has never been AI, machine learning engineering or related disciplines. Still, for an entry-level certification, I would venture to say the difficulty is quite high.

A possible explanation: the exam seems to have inherited some topics that used to be covered in the AWS Certified Machine Learning – Specialty (retired by AWS on March 31, 2026) and that also appear in the AWS Certified Machine Learning Engineer - Associate. In other words, don't slack off and don't underestimate this "little exam". 😉

## What to study: my recommendations

For reference, the official exam guide (AIF-C01) organizes the content into these domains:


| Domain                                                   | Weight |
| ---------------------------------------------------------| --- |
| Fundamentals of AI and ML                                | 20% |
| Fundamentals of generative AI                            | 24% |
| Applications of foundation models                        | 28% |
| Guidelines for responsible AI                            | 14% |
| Security, compliance and governance for AI solutions     | 14% |


Always check the latest version of the [official exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) on the AWS website before you start studying.

Based on my experience, these are the topics I would prioritize:

### 1. Amazon Bedrock

Of course it would be here! Make sure you understand the use cases, foundation models, the concepts of Knowledge Bases (RAG), Agents, Guardrails, and the differences between customizing a model with fine-tuning and simply using good prompting techniques.

### 2. Amazon SageMaker

Get to know the ecosystem and what each component is for, for example: SageMaker Clarify (bias detection and explainability), Model Monitor, Data Wrangler, Ground Truth and JumpStart.

### 3. Prompt engineering

Zero-shot, few-shot, CoT (chain-of-thought), inference parameters such as temperature, top-p and top-k, as well as risks such as prompt injection and jailbreak.

### 4. Metrics (yes, metrics! 🤣😅)

This was the topic that surprised me the most. I confess that, before I started studying, I didn't know any of these metrics, and they showed up several times in the exam. 🤯

A quick summary so you don't suffer like I did:

- ROUGE: compares the generated text with a reference text by measuring the overlap of words and sequences (n-grams), with a focus on recall. Widely used to evaluate summarization.

- BLEU: also measures n-gram overlap with a reference, but with a focus on precision. A classic for evaluating machine translation.

- BERTScore: instead of comparing exact words, it compares meaning using contextual embeddings. Useful when the model uses different words to say the same thing.

- Precision and Recall: classification metrics. Precision indicates how many of the items flagged as positive really are positive; Recall indicates how many of the actual positives the model managed to find.

- F1-Score: the harmonic mean of Precision and Recall, ideal when you need to balance both, especially with imbalanced data.

It is also worth reviewing Accuracy, the confusion matrix and AUC-ROC.

In other words, for anyone unfamiliar with the subject, it's mind-blowing! 🤯

### 5. Responsible AI, security and governance
Together, these topics account for almost 30% of the exam. Study bias, explainability, transparency, the shared responsibility model applied to AI, and services such as IAM, AWS CloudTrail and Amazon Macie in the context of AI solutions.

## Conclusion: AI is not hype, it's reality

I believe that, at the time I am writing this post, it is already clear to every tech professional that artificial intelligence is a reality, not just passing hype. It is here to stay!

I believe our role as tech professionals is to study, learn, stay up to date and, in the use cases where it makes sense, put AI to work in our favor. It has always been this way and it will continue to be, no matter how much that may hurt.

If you are still skeptical about it, here is my message: keep your eyes open! 😉

And you, have you taken or are you preparing for the AWS Certified AI Practitioner? Tell me how your experience went or share your questions.

I'd love to exchange ideas!
