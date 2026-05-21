(function() {
    'use strict';

    // Embedded translations to avoid CORS issues
    const translationsData = {
        'pt-BR': {
            "title": "Design Patterns Quiz",
            "description": "Você conhece sobre Design Patterns? Responda esse quiz e descubra.",
            "tryAgain": "Tentar novamente",
            "result": {
                "youGot": "Você acertou",
                "of": "de",
                "questions": "questões.",
                "comments": {
                    "perfect": " Yeah, você mandou muito bem.",
                    "good": " Quase lá...",
                    "retry": " Ops, é necessário revisar os conceitos!",
                    "failed": " Eu sei que você pode fazer melhor!"
                }
            },
            "questions": [
                {
                    "question": "O que é design patterns?",
                    "choices": ["Um catalogo de soluções para problemas recorrentes", "Um framework", "Uma linguagem de programação "]
                },
                {
                    "question": "Quais são os três tipos de Design Patterns que foram catalogados no clássico livro Design Patterns: Elements of Reusable Object-Oriented Software do GoF (Gang of Four)?",
                    "choices": ["Criacional, Builder e Factory Method", "Criacional, comportamental e estrutural", "Estrutural, comportamental e Template Method"]
                },
                {
                    "question": "O pattern Factory Method é de qual tipo?",
                    "choices": ["Estrutural", "Comportamental", "Criacional"]
                },
                {
                    "question": "O pattern Façade é de qual tipo?",
                    "choices": ["Comportamental", "Estrutural", "Criacional"]
                },
                {
                    "question": "O pattern Observer é de qual tipo?",
                    "choices": ["Criacional", "Estrutural", "Comportamental"]
                }
            ]
        },
        'en': {
            "title": "Design Patterns Quiz",
            "description": "Do you know about Design Patterns? Take this quiz and find out.",
            "tryAgain": "Try again",
            "result": {
                "youGot": "You got",
                "of": "of",
                "questions": "questions correct.",
                "comments": {
                    "perfect": " Yeah, you did great!",
                    "good": " Almost there...",
                    "retry": " Oops, you need to review the concepts!",
                    "failed": " I know you can do better!"
                }
            },
            "questions": [
                {
                    "question": "What is design patterns?",
                    "choices": ["A catalog of solutions for recurring problems", "A framework", "A programming language"]
                },
                {
                    "question": "What are the three types of Design Patterns cataloged in the classic book Design Patterns: Elements of Reusable Object-Oriented Software by the GoF (Gang of Four)?",
                    "choices": ["Creational, Builder and Factory Method", "Creational, behavioral and structural", "Structural, behavioral and Template Method"]
                },
                {
                    "question": "What type is the Factory Method pattern?",
                    "choices": ["Structural", "Behavioral", "Creational"]
                },
                {
                    "question": "What type is the Façade pattern?",
                    "choices": ["Behavioral", "Structural", "Creational"]
                },
                {
                    "question": "What type is the Observer pattern?",
                    "choices": ["Creational", "Structural", "Behavioral"]
                }
            ]
        }
    };

    const QuizI18n = {
        currentLanguage: 'pt-BR',
        translations: translationsData,
        
        init: function() {
            // Check for saved language preference
            const savedLang = localStorage.getItem('preferredLanguage');
            if (savedLang) {
                this.currentLanguage = savedLang;
            } else {
                // Detect browser language
                const browserLang = navigator.language || navigator.userLanguage;
                if (browserLang.startsWith('en')) {
                    this.currentLanguage = 'en';
                }
            }
            
            this.updateLanguage();
            this.setupLanguageSelector();
        },
        
        setLanguage: function(lang) {
            if (this.translations[lang]) {
                this.currentLanguage = lang;
                localStorage.setItem('preferredLanguage', lang);
                this.updateLanguage();
                this.updateLanguageSelectorUI();
            }
        },
        
        updateLanguage: function() {
            const translations = this.translations[this.currentLanguage];
            if (!translations) return;
            
            // Update page title
            document.title = translations.title;
            
            // Update meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', translations.description);
            }
            
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(function(element) {
                const key = element.getAttribute('data-i18n');
                const translation = self.getNestedTranslation(translations, key);
                
                if (translation) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translation;
                    } else {
                        element.innerHTML = translation;
                    }
                }
            });
            
            // Update HTML lang attribute
            document.documentElement.lang = this.currentLanguage === 'pt-BR' ? 'pt-BR' : 'en';
        },
        
        getNestedTranslation: function(obj, path) {
            return path.split('.').reduce(function(prev, curr) {
                return prev ? prev[curr] : null;
            }, obj);
        },
        
        setupLanguageSelector: function() {
            const langPt = document.getElementById('lang-pt-BR');
            const langEn = document.getElementById('lang-en');
            
            if (langPt) {
                langPt.addEventListener('click', function(e) {
                    e.preventDefault();
                    QuizI18n.setLanguage('pt-BR');
                });
            }
            
            if (langEn) {
                langEn.addEventListener('click', function(e) {
                    e.preventDefault();
                    QuizI18n.setLanguage('en');
                });
            }
            
            this.updateLanguageSelectorUI();
        },
        
        updateLanguageSelectorUI: function() {
            const langPt = document.getElementById('lang-pt-BR');
            const langEn = document.getElementById('lang-en');
            
            if (langPt && langEn) {
                if (this.currentLanguage === 'pt-BR') {
                    langPt.style.display = 'none';
                    langEn.style.display = 'inline';
                    langEn.style.fontWeight = 'bold';
                } else {
                    langEn.style.display = 'none';
                    langPt.style.display = 'inline';
                    langPt.style.fontWeight = 'bold';
                }
            }
        },
        
        t: function(key) {
            const translations = this.translations[this.currentLanguage];
            if (!translations) return key;
            return this.getNestedTranslation(translations, key) || key;
        },
        
        getQuestions: function() {
            const translations = this.translations[this.currentLanguage];
            return translations ? translations.questions : [];
        },
        
        getResultComment: function(score) {
            const translations = this.translations[this.currentLanguage];
            if (!translations || !translations.result) return '';
            
            const comments = translations.result.comments;
            if (score === 5) return comments.perfect;
            if (score >= 4) return comments.good;
            if (score >= 2) return comments.retry;
            return comments.failed;
        }
    };
    
    // Make QuizI18n available globally
    window.QuizI18n = QuizI18n;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            QuizI18n.init();
        });
    } else {
        QuizI18n.init();
    }
})();
