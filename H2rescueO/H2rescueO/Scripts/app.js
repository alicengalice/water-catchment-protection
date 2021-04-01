const questionNo = document.querySelector(".question-number");
const qText = document.querySelector(".question-text");
const optBox = document.querySelector(".option-container");
const explainText = document.querySelector(".explain-text");
const answerCheckBox = document.querySelector(".answer-indicator");
const homeSection = document.querySelector(".home-box");
const quizSection = document.querySelector(".quiz-box");
const resultSection = document.querySelector(".result-box");

let noOfQuestions = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let noOfAttempt = 0;


// push the questions into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestion = 5;
    for (let i = 0; i < quiz.length; i++) {
        availableQuestions.push(quiz[i])
    }
    //console.log(availableQuestions)
}

// set question number and question and options
function getNewQuestion() {
    document.getElementById("nextbtn").style.visibility = "hidden";
    explainText.innerHTML = '';
    // set question number
    questionNo.innerHTML = "Question " + (noOfQuestions + 1) + " of 5";
    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    qText.innerHTML = currentQuestion.q;
    // console.log(questionIndex)

    // get the position of 'questionIndex' from the availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the 'questionIndex' from the availableQuestion Array so that the question does not repeat
    availableQuestions.splice(index1, 1);
    console.log(availableQuestions)

    // set options
    // get the length of options
    const optionLen = currentQuestion.options.length
    // push options into availableOptions array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)
    }

    optBox.innerHTML = '';
    let animationDelay = 0.15;
    // create options in html
    for (let i = 0; i < optionLen; i++) {
        // random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optionIndex' from availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        // remove the 'optionIndex' from availableOptions, so that the option does not repeat
        availableOptions.splice(index2, 1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optBox.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    noOfQuestions++
}

// get the result of current attempt question
function getResult(element) {
    const id = parseInt(element.id);
    // get the answer by comparing the if of clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct answer
        element.classList.add("correct");
        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct:" + correctAnswers)
        explainText.innerHTML = "You've got the correct one!<br>" + currentQuestion.explain;
        // show next button
        document.getElementById("nextbtn").style.visibility = "visible";
    }
    else {
        // set the red color to the wrong answer
        element.classList.add("wrong");
        // add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        // if the answer is incorrect, add the green color to the correct answer
        const optionLen = optBox.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optBox.children[i].id) === currentQuestion.answer) {
                optBox.children[i].classList.add("correct");
            }
        }
        explainText.innerHTML = "Oops give it another try next time!<br>" + currentQuestion.explain;
        // show next button
        document.getElementById("nextbtn").style.visibility = "visible";
    }
    noOfAttempt++;
    unclickableOption();
}

// make all the options unclickable when the user selects an option
// this step restricts the user to change the choice or select any other options
function unclickableOption() {
    const optionLen = optBox.children.length;
    for (let i = 0; i < optionLen; i++) {
        optBox.children[i].classList.add("already-answered");
    }

}

function answerIndicator() {
    answerCheckBox.innerHTML = '';
    const totalQuestion = 5;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answerCheckBox.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answerCheckBox.children[noOfQuestions - 1].classList.add(markType)

}

function next() {
    if (noOfQuestions == 5) {
        console.log("quiz over");
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function back() {
    if (noOfQuestions == 1){
        // hide quiz box
        quizSection.classList.add("hide");
        // show home box
        homeSection.classList.remove("hide");
        resetQuiz();
    }
    else {
        

    }
}

function quizOver() {
    // hide quiz box
    quizSection.classList.add("hide");
    // show result box
    resultSection.classList.remove("hide");
    quizResult();

}

// get the results
function quizResult() {
    resultSection.querySelector(".total-question").innerHTML = 5;
    resultSection.querySelector(".total-attempt").innerHTML = noOfAttempt;
    resultSection.querySelector(".total-correct").innerHTML = correctAnswers;
    resultSection.querySelector(".total-wrong").innerHTML = noOfAttempt - correctAnswers;
    const percentage = (correctAnswers / 5) * 100;
    resultSection.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultSection.querySelector(".total-score").innerHTML = correctAnswers + " / " + 5;
    if (correctAnswers <= 2) {
        resultSection.querySelector(".comment").innerHTML = "Oh no :( Let's try again next time!"
    }
    else if (correctAnswers == 3) {
        resultSection.querySelector(".comment").innerHTML = "You've tried your best! Let's make it perfect next time!"
    } 
    else if (correctAnswers == 4) {
        resultSection.querySelector(".comment").innerHTML = "Good job!"
    } 
    else if (correctAnswers == 5) {
        resultSection.querySelector(".comment").innerHTML = "Hurray! You've made a perfect score!"
    }


}

function resetQuiz() {
    noOfQuestions = 0;
    correctAnswers = 0;
    noOfAttempt = 0;
}

// try the quiz again
function tryAgainQuiz() {
    // hide the result box
    resultSection.classList.add("hide");
    // show the quiz box
    quizSection.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // TEMPORARY SHOW THE INSTRUCTION PAGE - NEEDS TO GO BACK TO QUIZ HOME ON MAIN WEBSITE
    // hide result box 
    resultSection.classList.add("hide");
    // hide quiz box
    quizSection.classList.add("hide");
    // show home box
    homeSection.classList.remove("hide");
    
    resetQuiz();
}


// ##### STARTING POINT #####

function startQuiz(){
    // hide home box
    homeSection.classList.add("hide");
    // show quiz box
    quizSection.classList.remove("hide");
    // first we will set all questions in availableQuestions Array
    setAvailableQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
    // create indicator of answers
    answerIndicator();
}

window.onload = function (){
    homeSection.querySelector(".total-questions").innerHTML = 5;
}