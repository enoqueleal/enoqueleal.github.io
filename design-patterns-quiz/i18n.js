/*
 * Textos de interface do quiz e preferência de idioma.
 * As perguntas ficam em questions.js.
 *
 * Contrato compartilhado com a página principal e o blog:
 * localStorage.preferredLanguage = 'pt' | 'en'
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'preferredLanguage';
    const LEGACY_CODES = { 'pt-BR': 'pt' };

    const STRINGS = {
        pt: {
            htmlLang: 'pt-BR',
            title: 'Design Patterns Quiz',
            description: 'Você conhece design patterns? Responda o quiz, veja as explicações e descubra.',
            backToSite: 'enoque.dev',
            switchLanguage: 'English',
            switchLanguageLabel: 'English: mudar o idioma para inglês',
            intro: {
                kicker: 'Quiz',
                heading: 'Design Patterns',
                lead: 'Teste seus conhecimentos sobre os padrões de projeto catalogados pelo GoF. A cada resposta você vê uma explicação curta.',
                count: '{n} perguntas',
                duration: 'cerca de 2 minutos',
                start: 'Começar'
            },
            progress: 'Pergunta {current} de {total}',
            choicesLabel: 'Alternativas',
            keyboardHint: 'Dica: use as teclas 1, 2, 3 (ou A, B, C) para responder e Enter para avançar.',
            correct: 'Correto!',
            incorrect: 'Resposta incorreta',
            correctAnswerIs: 'Resposta correta: {answer}',
            next: 'Próxima',
            seeResult: 'Ver resultado',
            result: {
                heading: 'Resultado',
                score: 'Você acertou {score} de {total}',
                tiers: {
                    perfect: 'Excelente! Você domina o assunto.',
                    good: 'Quase lá! Só um detalhe escapou.',
                    review: 'Bom começo, mas vale revisar os conceitos.',
                    retry: 'Não desanime: leia as explicações e tente de novo.'
                },
                reviewHeading: 'Revise suas respostas',
                yourAnswer: 'Sua resposta: {answer}',
                tryAgain: 'Tentar novamente',
                readBlog: 'Ler sobre Design Patterns no blog'
            }
        },
        en: {
            htmlLang: 'en',
            title: 'Design Patterns Quiz',
            description: 'Do you know design patterns? Take the quiz, read the explanations and find out.',
            backToSite: 'enoque.dev',
            switchLanguage: 'Português',
            switchLanguageLabel: 'Português: switch language to Portuguese',
            intro: {
                kicker: 'Quiz',
                heading: 'Design Patterns',
                lead: 'Test your knowledge of the design patterns cataloged by the GoF. After each answer you get a short explanation.',
                count: '{n} questions',
                duration: 'about 2 minutes',
                start: 'Start'
            },
            progress: 'Question {current} of {total}',
            choicesLabel: 'Choices',
            keyboardHint: 'Tip: use keys 1, 2, 3 (or A, B, C) to answer and Enter to continue.',
            correct: 'Correct!',
            incorrect: 'Incorrect answer',
            correctAnswerIs: 'Correct answer: {answer}',
            next: 'Next',
            seeResult: 'See result',
            result: {
                heading: 'Result',
                score: 'You got {score} of {total}',
                tiers: {
                    perfect: 'Excellent! You master the subject.',
                    good: 'Almost there! Just one detail slipped.',
                    review: 'Good start, but it is worth reviewing the concepts.',
                    retry: 'Don\'t give up: read the explanations and try again.'
                },
                reviewHeading: 'Review your answers',
                yourAnswer: 'Your answer: {answer}',
                tryAgain: 'Try again',
                readBlog: 'Read about Design Patterns on the blog'
            }
        }
    };

    function readSaved() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function save(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            // localStorage indisponível (ex.: navegação privada): segue sem persistir
        }
    }

    function detect() {
        let saved = readSaved();
        if (saved && LEGACY_CODES[saved]) {
            saved = LEGACY_CODES[saved];
            save(saved);
        }
        if (saved && STRINGS[saved]) return saved;
        const browser = (navigator.language || '').toLowerCase();
        return browser.indexOf('pt') === 0 ? 'pt' : 'en';
    }

    const QuizI18n = {
        lang: detect(),

        setLanguage: function (lang) {
            if (!STRINGS[lang]) return;
            this.lang = lang;
            save(lang);
        },

        otherLanguage: function () {
            return this.lang === 'pt' ? 'en' : 'pt';
        },

        /** Texto pela chave ("result.score"), com {placeholders} substituídos. */
        t: function (key, params) {
            const value = key.split('.').reduce(function (obj, part) {
                return obj ? obj[part] : undefined;
            }, STRINGS[this.lang]);
            if (typeof value !== 'string') return key;
            return value.replace(/\{(\w+)\}/g, function (match, name) {
                return params && name in params ? params[name] : match;
            });
        },

        blogUrl: function () {
            return this.lang === 'pt' ? '/blog/' : '/blog/en/';
        }
    };

    window.QuizI18n = QuizI18n;
})();
