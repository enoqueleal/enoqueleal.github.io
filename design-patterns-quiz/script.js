/*
 * Design Patterns Quiz: JavaScript nativo, sem dependências.
 *
 * Todo o estado fica em `state`, e render() desenha a tela atual a partir dele.
 * Trocar o idioma só redesenha a tela, então o progresso é preservado.
 */
(function () {
    'use strict';

    const QUESTIONS = window.QUIZ_QUESTIONS;
    const i18n = window.QuizI18n;
    const MARKERS = ['A', 'B', 'C', 'D'];
    const TIER_EMOJI = { perfect: '🏆', good: '👏', review: '📚', retry: '💪' };

    const app = document.getElementById('app');
    const announcer = document.getElementById('announcer');
    const langToggle = document.getElementById('lang-toggle');

    let state = newState('intro');

    function newState(screen) {
        return {
            screen: screen,          // 'intro' | 'question' | 'result'
            index: 0,                // pergunta atual
            order: QUESTIONS.map(function (q) { return shuffle(q.pt.choices.map(function (_, i) { return i; })); }),
            answers: []              // índice ORIGINAL escolhido em cada pergunta
        };
    }

    // Fisher–Yates
    function shuffle(list) {
        const a = list.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
        }
        return a;
    }

    function text(q) { return q[i18n.lang]; }
    function score() {
        return state.answers.filter(function (a, i) { return a === QUESTIONS[i].answer; }).length;
    }
    function tier(s, total) {
        if (s === total) return 'perfect';
        if (s === total - 1) return 'good';
        if (s >= 2) return 'review';
        return 'retry';
    }

    /* ---------- helpers de DOM ---------- */

    function h(tag, attrs) {
        const el = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (k) {
            const v = attrs[k];
            if (v === false || v == null) return;
            if (k === 'class') el.className = v;
            else if (k === 'text') el.textContent = v;
            else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
            else el.setAttribute(k, v === true ? '' : v);
        });
        for (let i = 2; i < arguments.length; i++) {
            const child = arguments[i];
            if (child == null || child === false) continue;
            el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
        }
        return el;
    }

    function announce(message) {
        // Limpar antes garante que mensagens repetidas também sejam anunciadas
        announcer.textContent = '';
        window.setTimeout(function () { announcer.textContent = message; }, 50);
    }

    function mount(view, focusSelector) {
        app.replaceChildren(view);
        app.dataset.screen = state.screen;
        if (focusSelector) {
            const target = app.querySelector(focusSelector);
            if (target) target.focus({ preventScroll: false });
        }
    }

    /* ---------- telas ---------- */

    function renderIntro(focus) {
        const view = h('section', { class: 'screen screen-intro' },
            h('p', { class: 'kicker', text: i18n.t('intro.kicker') }),
            h('h1', { id: 'screen-title', tabindex: '-1', text: i18n.t('intro.heading') }),
            h('p', { class: 'lead', text: i18n.t('intro.lead') }),
            h('ul', { class: 'meta' },
                h('li', { text: i18n.t('intro.count', { n: QUESTIONS.length }) }),
                h('li', { text: i18n.t('intro.duration') })
            ),
            h('button', { type: 'button', class: 'btn btn-primary', id: 'start', onclick: start, text: i18n.t('intro.start') })
        );
        mount(view, focus);
    }

    function renderQuestion(focus) {
        const q = QUESTIONS[state.index];
        const t = text(q);
        const total = QUESTIONS.length;
        const answered = state.answers[state.index];
        const isAnswered = answered !== undefined;
        const isLast = state.index === total - 1;

        const choices = h('div', { class: 'choices', role: 'group', 'aria-labelledby': 'screen-title' });
        state.order[state.index].forEach(function (original, displayIndex) {
            let status = '';
            if (isAnswered) {
                if (original === q.answer) status = 'is-correct';
                else if (original === answered) status = 'is-wrong';
            }
            const icon = status === 'is-correct' ? '✓' : status === 'is-wrong' ? '✗' : '';
            choices.appendChild(h('button', {
                type: 'button',
                class: ('choice ' + status).trim(),
                'data-index': String(displayIndex),
                disabled: isAnswered,
                'aria-pressed': isAnswered ? String(original === answered) : false,
                onclick: function () { choose(displayIndex); }
            },
                h('span', { class: 'marker', 'aria-hidden': 'true', text: MARKERS[displayIndex] }),
                h('span', { class: 'choice-text', text: t.choices[original] }),
                icon ? h('span', { class: 'choice-icon', 'aria-hidden': 'true', text: icon }) : null
            ));
        });

        let feedback = null;
        if (isAnswered) {
            const ok = answered === q.answer;
            feedback = h('div', { class: 'feedback ' + (ok ? 'is-correct' : 'is-wrong'), id: 'feedback' },
                h('p', { class: 'feedback-title' },
                    h('span', { 'aria-hidden': 'true', text: ok ? '✓ ' : '✗ ' }),
                    ok ? i18n.t('correct') : i18n.t('incorrect')
                ),
                ok ? null : h('p', { class: 'feedback-answer', text: i18n.t('correctAnswerIs', { answer: t.choices[q.answer] }) }),
                h('p', { class: 'feedback-explanation', text: t.explanation }),
                h('button', {
                    type: 'button', class: 'btn btn-primary', id: 'next', onclick: next,
                    text: isLast ? i18n.t('seeResult') : i18n.t('next')
                })
            );
        }

        const percent = Math.round(((state.index + (isAnswered ? 1 : 0)) / total) * 100);
        const view = h('section', { class: 'screen screen-question' },
            h('div', { class: 'progress' },
                h('p', { class: 'progress-label', id: 'progress-label', text: i18n.t('progress', { current: state.index + 1, total: total }) }),
                h('div', {
                    class: 'progress-bar', role: 'progressbar', 'aria-labelledby': 'progress-label',
                    'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(percent)
                }, h('span', { style: 'width:' + percent + '%' }))
            ),
            h('h1', { id: 'screen-title', class: 'question', tabindex: '-1', text: t.question }),
            choices,
            feedback,
            isAnswered ? null : h('p', { class: 'hint', text: i18n.t('keyboardHint') })
        );
        mount(view, focus);
    }

    function renderResult(focus) {
        const total = QUESTIONS.length;
        const s = score();
        const level = tier(s, total);

        const review = h('ol', { class: 'review' });
        QUESTIONS.forEach(function (q, i) {
            const t = text(q);
            const ok = state.answers[i] === q.answer;
            review.appendChild(h('li', { class: 'review-item ' + (ok ? 'is-correct' : 'is-wrong') },
                h('p', { class: 'review-question' },
                    h('span', { class: 'review-icon', 'aria-hidden': 'true', text: ok ? '✓' : '✗' }),
                    t.question
                ),
                h('p', { class: 'review-answer', text: i18n.t('result.yourAnswer', { answer: t.choices[state.answers[i]] }) }),
                ok ? null : h('p', { class: 'review-correct', text: i18n.t('correctAnswerIs', { answer: t.choices[q.answer] }) }),
                ok ? null : h('p', { class: 'review-explanation', text: t.explanation })
            ));
        });

        const view = h('section', { class: 'screen screen-result tier-' + level },
            h('p', { class: 'kicker', text: i18n.t('result.heading') }),
            h('div', { class: 'result-emoji', 'aria-hidden': 'true', text: TIER_EMOJI[level] }),
            h('h1', { id: 'screen-title', tabindex: '-1', class: 'result-score', text: i18n.t('result.score', { score: s, total: total }) }),
            h('p', { class: 'result-big', 'aria-hidden': 'true' }, h('strong', { text: String(s) }), '/' + total),
            h('p', { class: 'lead result-message', text: i18n.t('result.tiers.' + level) }),
            h('div', { class: 'actions' },
                h('button', { type: 'button', class: 'btn btn-primary', id: 'try-again', onclick: restart, text: i18n.t('result.tryAgain') }),
                h('a', { class: 'btn btn-secondary', id: 'read-blog', href: i18n.blogUrl(), text: i18n.t('result.readBlog') })
            ),
            h('h2', { class: 'review-heading', text: i18n.t('result.reviewHeading') }),
            review
        );
        mount(view, focus);
    }

    function render(focus) {
        if (state.screen === 'intro') renderIntro(focus);
        else if (state.screen === 'question') renderQuestion(focus);
        else renderResult(focus);
    }

    /* ---------- ações ---------- */

    function start() {
        state = newState('question');
        render('#screen-title');
        announce(i18n.t('progress', { current: 1, total: QUESTIONS.length }));
    }

    function choose(displayIndex) {
        if (state.screen !== 'question' || state.answers[state.index] !== undefined) return;
        const q = QUESTIONS[state.index];
        const original = state.order[state.index][displayIndex];
        if (original === undefined) return;
        state.answers[state.index] = original;
        render('#next');
        const ok = original === q.answer;
        announce((ok ? i18n.t('correct') : i18n.t('incorrect') + '. ' +
            i18n.t('correctAnswerIs', { answer: text(q).choices[q.answer] })) + '. ' + text(q).explanation);
    }

    function next() {
        if (state.answers[state.index] === undefined) return;
        if (state.index < QUESTIONS.length - 1) {
            state.index++;
            render('#screen-title');
            announce(i18n.t('progress', { current: state.index + 1, total: QUESTIONS.length }));
        } else {
            state.screen = 'result';
            render('#screen-title');
        }
    }

    function restart() {
        start();
    }

    /* ---------- idioma ---------- */

    function applyLanguage() {
        document.documentElement.lang = i18n.t('htmlLang');
        document.title = i18n.t('title');
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', i18n.t('description'));
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = i18n.t(el.getAttribute('data-i18n'));
        });
        langToggle.textContent = i18n.t('switchLanguage');
        langToggle.setAttribute('aria-label', i18n.t('switchLanguageLabel'));
        langToggle.setAttribute('lang', i18n.otherLanguage() === 'pt' ? 'pt-BR' : 'en');
    }

    langToggle.addEventListener('click', function () {
        i18n.setLanguage(i18n.otherLanguage());
        applyLanguage();
        render(); // mantém o estado; o foco continua no botão de idioma
    });

    /* ---------- teclado ---------- */

    const KEY_TO_INDEX = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (state.screen !== 'question') return;
        const answered = state.answers[state.index] !== undefined;
        const key = e.key.toLowerCase();

        if (!answered && key in KEY_TO_INDEX) {
            e.preventDefault();
            choose(KEY_TO_INDEX[key]);
            return;
        }
        // Enter fora de um controle avança. Num botão ou link, o próprio navegador já aciona o clique.
        if (answered && e.key === 'Enter') {
            const active = document.activeElement;
            if (active && /^(BUTTON|A)$/.test(active.tagName)) return;
            e.preventDefault();
            next();
        }
    });

    /* ---------- início ---------- */

    // Exposto para depuração e para os testes e2e (somente leitura)
    window.QuizState = function () { return JSON.parse(JSON.stringify(state)); };

    applyLanguage();
    render();
})();
