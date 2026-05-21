(function() {
    'use strict';

    // Embedded translations to avoid CORS issues
    const translationsData = {
        'pt-BR': {
            "nav": {
                "home": "Home",
                "about": "Sobre",
                "services": "Serviços",
                "technologies": "Tecnologias",
                "blog": "Blog",
                "linktree": "Linktree",
                "contact": "Contato"
            },
            "header": {
                "greeting": "Olá, sou",
                "role": "Software Engineer",
                "learnMore": "Saber mais"
            },
            "about": {
                "title": "Sobre mim",
                "whoAmI": "Quem sou",
                "paragraph1": "Trabalho com tecnologia há 15 anos e, ao longo da minha carreira, tive a oportunidade de atuar em diversas empresas de médio e grande porte, sempre focado no desenvolvimento de soluções e na construção de sistemas em diferentes linguagens, com experiência predominante em Java e seus diversos frameworks.",
                "paragraph2": "Atualmente, ocupo uma posição de liderança como Engineering Manager, mas busco manter minha veia técnica sempre ativa. Por isso, continuo estudando e me aperfeiçoando, praticando o lifelong learning.",
                "paragraph3": "Estou constantemente em busca de novos conhecimentos, explorando e testando novas tecnologias, além de me aprofundar naquelas que já domino.",
                "paragraph4": "Gosto muito de trabalhar em equipe, em ambientes colaborativos, e de compartilhar conhecimentos e também de aprender outras pessoas. Afinal, niguém sabe de tudo!",
                "paragraph5": "Além da minha carreira na indústria como Engenheiro de Software, também atuo na área acadêmica, ministrando aulas no curso superior de Análise e Desenvolvimento de Sistemas no Centro Universitário Senac. Também trabalho como Instrutor Autorizado AWS, entregando treinamentos oficiais da AWS em parceria com a Ka Solution."
            },
            "services": {
                "title": "O que eu faço",
                "backend": {
                    "title": "Back-end",
                    "description": "Implementação de regras de negócio em Java com expertise no ecossistema Spring Framework e nos principais frameworks do mercado."
                },
                "architecture": {
                    "title": "Arquitetura",
                    "description": "Definição e implementação de arquiteturas de software escaláveis e resilientes, alinhando boas práticas de engenharia a padrões modernos como microservices, event-driven e cloud-native."
                },
                "solutions": {
                    "title": "Soluções",
                    "description": "Arquitetura de soluções cloud-native na AWS, com foco em escalabilidade, segurança e excelência operacional."
                }
            },
            "technologies": {
                "title": "Tecnologias",
                "all": "Todas",
                "languages": "Linguagens",
                "frameworks": "Frameworks",
                "cloudProviders": "Cloud Providers"
            },
            "contact": {
                "title": "Entre em contato",
                "contactInfo": "Informações de contato",
                "location": "São Paulo - SP, Brazil",
                "contactInstructions": "Para entrar em contato comigo, abra uma <b>Issue</b> no repositório listado abaixo"
            },
            "footer": {
                "copyright": "Copyright © eleal. All rights reserved."
            },
            "languageSelector": {
                "label": "Idioma"
            }
        },
        'en': {
            "nav": {
                "home": "Home",
                "about": "About",
                "services": "Services",
                "technologies": "Technologies",
                "blog": "Blog",
                "linktree": "Linktree",
                "contact": "Contact"
            },
            "header": {
                "greeting": "Hi, I'm",
                "role": "Software Engineer",
                "learnMore": "Learn more"
            },
            "about": {
                "title": "About me",
                "whoAmI": "Who I am",
                "paragraph1": "I've been working with technology for 15 years, and throughout my career, I've had the opportunity to work in various medium and large companies, always focused on developing solutions and building systems in different languages, with predominant experience in Java and its various frameworks.",
                "paragraph2": "Currently, I hold a leadership position as Engineering Manager, but I strive to keep my technical side always active. That's why I continue studying and improving myself, practicing lifelong learning.",
                "paragraph3": "I'm constantly seeking new knowledge, exploring and testing new technologies, as well as deepening my understanding of those I already master.",
                "paragraph4": "I really enjoy working in teams, in collaborative environments, and sharing knowledge as well as learning from others. After all, no one knows everything!",
                "paragraph5": "In addition to my industry career as a Software Engineer, I also work in academia, teaching classes in the Analysis and Systems Development course at Centro Universitário Senac. I also work as an AWS Authorized Instructor, delivering official AWS training in partnership with Ka Solution."
            },
            "services": {
                "title": "What I do",
                "backend": {
                    "title": "Back-end",
                    "description": "Implementation of business rules in Java with expertise in the Spring Framework ecosystem and the main frameworks in the market."
                },
                "architecture": {
                    "title": "Architecture",
                    "description": "Definition and implementation of scalable and resilient software architectures, aligning engineering best practices with modern patterns such as microservices, event-driven, and cloud-native."
                },
                "solutions": {
                    "title": "Solutions",
                    "description": "Cloud-native solution architecture on AWS, focusing on scalability, security, and operational excellence."
                }
            },
            "technologies": {
                "title": "Technologies",
                "all": "All",
                "languages": "Languages",
                "frameworks": "Frameworks",
                "cloudProviders": "Cloud Providers"
            },
            "contact": {
                "title": "Get in touch",
                "contactInfo": "Contact information",
                "location": "São Paulo - SP, Brazil",
                "contactInstructions": "To get in touch with me, open an <b>Issue</b> in the repository listed below"
            },
            "footer": {
                "copyright": "Copyright © eleal. All rights reserved."
            },
            "languageSelector": {
                "label": "Language"
            }
        }
    };

    const I18n = {
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
            
            const self = this;
            
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
                    I18n.setLanguage('pt-BR');
                });
            }
            
            if (langEn) {
                langEn.addEventListener('click', function(e) {
                    e.preventDefault();
                    I18n.setLanguage('en');
                });
            }
            
            this.updateLanguageSelectorUI();
        },
        
        updateLanguageSelectorUI: function() {
            const langPt = document.getElementById('lang-pt-BR');
            const langEn = document.getElementById('lang-en');
            
            if (langPt && langEn) {
                if (this.currentLanguage === 'pt-BR') {
                    langPt.parentElement.style.display = 'none';
                    langEn.parentElement.style.display = 'block';
                    langEn.classList.add('active');
                } else {
                    langEn.parentElement.style.display = 'none';
                    langPt.parentElement.style.display = 'block';
                    langPt.classList.add('active');
                }
            }
        },
        
        t: function(key) {
            const translations = this.translations[this.currentLanguage];
            if (!translations) return key;
            return this.getNestedTranslation(translations, key) || key;
        }
    };
    
    // Make I18n available globally
    window.I18n = I18n;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            I18n.init();
        });
    } else {
        I18n.init();
    }
})();
