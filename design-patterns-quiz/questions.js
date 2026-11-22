/*
 * Perguntas do Design Patterns Quiz.
 *
 * A resposta correta (`answer`, índice em `choices`) é definida uma única vez,
 * fora dos textos de idioma. As alternativas precisam estar na MESMA ordem em
 * `pt` e `en`. O quiz embaralha a ordem exibida a cada tentativa.
 */
window.QUIZ_QUESTIONS = [
    {
        id: 'what-is',
        answer: 0,
        pt: {
            question: 'O que são design patterns?',
            choices: [
                'Um catálogo de soluções para problemas recorrentes',
                'Um framework',
                'Uma linguagem de programação'
            ],
            explanation: 'Design patterns são soluções reutilizáveis e já testadas para problemas recorrentes de design de software. Não são código pronto, framework nem linguagem: são modelos que você adapta ao seu contexto.'
        },
        en: {
            question: 'What are design patterns?',
            choices: [
                'A catalog of solutions for recurring problems',
                'A framework',
                'A programming language'
            ],
            explanation: 'Design patterns are reusable, proven solutions to recurring software design problems. They are not ready-made code, a framework or a language: they are templates you adapt to your context.'
        }
    },
    {
        id: 'gof-categories',
        answer: 1,
        pt: {
            question: 'Quais são os três tipos de design patterns catalogados no clássico livro "Design Patterns: Elements of Reusable Object-Oriented Software", do GoF (Gang of Four)?',
            choices: [
                'Criacional, Builder e Factory Method',
                'Criacional, comportamental e estrutural',
                'Estrutural, comportamental e Template Method'
            ],
            explanation: 'O GoF organiza os 23 padrões do livro em três grupos, conforme o propósito: criacionais (criação de objetos), estruturais (composição de classes e objetos) e comportamentais (comunicação e distribuição de responsabilidades). Builder, Factory Method e Template Method são padrões, não tipos.'
        },
        en: {
            question: 'What are the three types of design patterns cataloged in the classic book "Design Patterns: Elements of Reusable Object-Oriented Software" by the GoF (Gang of Four)?',
            choices: [
                'Creational, Builder and Factory Method',
                'Creational, behavioral and structural',
                'Structural, behavioral and Template Method'
            ],
            explanation: 'The GoF groups the book\'s 23 patterns into three categories by purpose: creational (object creation), structural (composition of classes and objects) and behavioral (communication and assignment of responsibilities). Builder, Factory Method and Template Method are patterns, not categories.'
        }
    },
    {
        id: 'factory-method',
        answer: 2,
        pt: {
            question: 'O pattern Factory Method é de qual tipo?',
            choices: ['Estrutural', 'Comportamental', 'Criacional'],
            explanation: 'O Factory Method define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar. Como trata da criação de objetos, é um padrão criacional.'
        },
        en: {
            question: 'What type is the Factory Method pattern?',
            choices: ['Structural', 'Behavioral', 'Creational'],
            explanation: 'Factory Method defines an interface for creating an object but lets subclasses decide which class to instantiate. Since it deals with object creation, it is a creational pattern.'
        }
    },
    {
        id: 'facade',
        answer: 1,
        pt: {
            question: 'O pattern Façade é de qual tipo?',
            choices: ['Comportamental', 'Estrutural', 'Criacional'],
            explanation: 'O Façade oferece uma interface simplificada para um subsistema complexo. Como organiza a forma como classes e objetos se compõem, é um padrão estrutural.'
        },
        en: {
            question: 'What type is the Façade pattern?',
            choices: ['Behavioral', 'Structural', 'Creational'],
            explanation: 'Façade provides a simplified interface to a complex subsystem. Since it shapes how classes and objects are composed, it is a structural pattern.'
        }
    },
    {
        id: 'observer',
        answer: 2,
        pt: {
            question: 'O pattern Observer é de qual tipo?',
            choices: ['Criacional', 'Estrutural', 'Comportamental'],
            explanation: 'O Observer define uma dependência um-para-muitos: quando um objeto muda de estado, todos os seus dependentes são notificados. Como trata da comunicação entre objetos, é um padrão comportamental.'
        },
        en: {
            question: 'What type is the Observer pattern?',
            choices: ['Creational', 'Structural', 'Behavioral'],
            explanation: 'Observer defines a one-to-many dependency: when an object changes state, all its dependents are notified. Since it deals with communication between objects, it is a behavioral pattern.'
        }
    }
];
