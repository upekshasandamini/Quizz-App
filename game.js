const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById("progressText");
const scoreText=document.getElementById("score");
const progressBarFull=document.getElementById("progressBarFull");





let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What does the attribute in the <img> tag represent?",
        choice1: "The alignment of the image",
        choice2: "The alternative text for the image",
        choice3: "The size of the image",
        choice4: "The source URL of the image",
        answer: 2
    },
    {
        question: "Which property is used to change the text color in CSS?",
        choice1: "font-color",
        choice2: "text-color",
        choice3: "color",
        choice4: "text-style",
        answer: 3
    },
    {
        question: "How do you declare a variable in JavaScript?",
        choice1: "variable x;",
        choice2: "x = var;",
        choice3: "var = x;",
        choice4: "var x;",
        answer: 4
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        choice1: "<ul>",
        choice2: "<ol>",
        choice3: "<li>",
        choice4: "<dl>",
        answer: 1
    },
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        
        // Go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;

    progressText.innerText=`Question ${questionCounter}/${MAX_QUESTIONS}`;

    /*Update the progressbar*/
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;



    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers=true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        /*const classToApply = 'incorrect';
            if (selectedAnswer === currentQuestion.answer) {
            classToApply = 'correct';
            }*/


            const classToApply = 
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if(classToApply=="correct"){
                incrementScore(CORRECT_BONUS);
            }

            selectedChoice.parentElement.classList.add(classToApply);
            
            setTimeout( ()=>{
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            },1000);
        // Add your logic for checking the answer and updating the score here
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText=score;
};

startGame();
