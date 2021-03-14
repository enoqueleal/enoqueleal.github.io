
$(document).ready(function () {
    start(questionNumber);

    $(".submit-answer").on("click", function (event) {

        var userAnswer = parseInt($(this).attr("id"));
        answerCheck(userAnswer);

        setTimeout(function () {
            $(".submit-answer").removeClass("correctStyle incorrectStyle");
            start(questionNumber);
        }, 1500)

        questionNumber++;
    });

});

var questionNumber = 0,
    totalCorrect = 0,
    optionFinal = 0;

var allQuestions = [
    {
        question: "O que é design patterns?",
        choices: ["Um catalogo de soluções para problemas recorrentes", "Um framework", "Uma linguagem de programação "],
        answer: 0
    }
    , {
        question: "Quais são os três tipos de Design Patters que foram catalogados no clássico livro Design Patterns: Elements of Reusable Object-Oriented Software do GoF (Gang of Four)?",
        choices: ["Criacional, Builder e Factory Method", "Criacional, comportamental e estrutural", "Estrutural, comportamental e Template Method"],
        answer: 1
    }
    , {
        question: "O pattern Factory Method é de qual tipo?",
        choices: ["Estrutural", "Comportamental", "Criacional"],
        answer: 2
    }
    , {
        question: "O pattern Façade é de qual tipo?",
        choices: ["Comportamental", "Estrutural", "Criacional"],
        answer: 1
    }
    , {
        question: "O pattern Observer é de qual tipo?",
        choices: ["Criacional", "Estrutural", "Comportamental"],
        answer: 2
    }
];

var result = [
    {
        image: "img/congrats.gif",
        comment: " Yeah, você mandou muito bem."
    }
    , {
        image: "img/good-job.gif",
        comment: " Quase lá..."
    }
    , {
        image: "img/retry.gif",
        comment: " Ops, é necessário revisar os conceitos!"
    }
    , {
        image: "img/failed.gif",
        comment: " Eu sei que você pode fazer melhor!"
    }
];


// continue with next question or end
var start = function (questionNumber) {
    $('h2').hide().fadeIn(400);

    if (questionNumber !== allQuestions.length) {
        question(questionNumber);
    } else {
        end();
    }
};

// show question and possible answers
function question(questionNum) {
    $("h2").text(allQuestions[questionNum].question);

    $.each(allQuestions[questionNum].choices, function (i, answers) {
        $("#" + i).html(answers);
    });
};

function end() {
    finalImage();
    $("ul").hide();
    $("h2").text("Você acertou " + totalCorrect + " de " + allQuestions.length + " questões. " + result[optionFinal].comment);
    $("#image").html('<img src=' + result[optionFinal].image + ' alt="">').fadeIn(1000);
    $("#try-again-container").show();
    restart();
};

// result image accourding to correct answers
function finalImage() {
    if (totalCorrect < allQuestions.length && totalCorrect >= (allQuestions.length * .7)) {
        optionFinal = 1;
    } else if (totalCorrect <= (allQuestions.length * .6) && totalCorrect >= (allQuestions.length * .2)) {
        optionFinal = 2;
    } else if (totalCorrect !== allQuestions.length) {
        optionFinal = 3;
    }
}

function restart() {
    $("#try-again").click(function () {
        questionNumber = 0,
            totalCorrect = 0,
            optionFinal = 0;

        start(questionNumber);
        $("#image").hide();
        $("#try-again-container").hide();
        $("ul").fadeIn(400);
    });
}

function answerCheck(userAnswer) {
    var correctAnswer = allQuestions[questionNumber].answer;

    if (userAnswer === correctAnswer) {
        $("#" + userAnswer).addClass("correctStyle");
        totalCorrect++;
    } else {
        $("#" + userAnswer).addClass("incorrectStyle");
    }
};
