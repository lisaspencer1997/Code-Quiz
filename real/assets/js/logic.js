const startQuizButton = document.querySelector("#start");
const startScreen = document.getElementById("start-screen");
const questionsSection = document.getElementById("questions");
const timerElement = document.getElementById("seconds-counting-down");
const timeScoreElement = document.getElementById("time-score");
const timeSeconds = document.getElementById("timeAllowed");
const viewHighScoresButton = document.getElementById("viewHighScores");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;
let timeAllowed = 50;
let timeSubtract = 3;
let quizEnded = false;

timeSeconds.textContent = timeAllowed;

// TODO: When the 'Start Quiz' button is clicked, it should:

startQuizButton.addEventListener("click", function (event) {
    event.preventDefault();

    // * need to update time score from local storage every new quiz


    localStorage.removeItem("timeScore");

    timerElement.textContent = timeAllowed;


    startScreen.classList.add("hide");
    questionsSection.classList.remove("hide");
    loadQuestion();

    // * start the timer

    startTimer();

    // * function to start timer

    function startTimer() {
        timer = setInterval(function () {
            timeAllowed--;
            timerElement.textContent = timeAllowed;

            if (timeAllowed <= 0 | currentQuestionIndex === questions.length) {
                clearInterval(timer);

                // if the last uestion is answered, 
                if (currentQuestionIndex === questions.length) {
                    const timeRemaining = Math.max(0, timeAllowed);
                    localStorage.setItem("timeScore", timeRemaining);
                    timeScoreElement.textContent = timeRemaining;
                    timerElement.textContent = timeRemaining;
                }

                endQuiz();
            }

        }, 1000);

    };

});

// TODO: When the first question loads, it should:

function loadQuestion() {
    const questionTitle = document.getElementById("question-title");
    const choicesContainer = document.getElementById("choices");

    //  we need to check if there are any questions left in the bank
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        //  setting the title on the screen
        questionTitle.textContent = currentQuestion.title;

        //  clear the choices container
        choicesContainer.innerHTML = "";

        //  display the multiple-choice answers as listed buttons
        currentQuestion.choices.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.className = "choice-button";
            choiceButton.textContent = choice;

            // buttons should be clickable and saved
            choiceButton.addEventListener("click", function () {
                remUserChoice(choice, currentQuestion.correctAnswer);
            });

            choicesContainer.appendChild(choiceButton);
        })

    } else {
        endQuiz();
    }

}


//  remember the users choice as either correct or incorrect
function remUserChoice(userChoice, correctAnswer) {

    const isCorr = userChoice === correctAnswer;

    //  update the score of correct answers
    if (isCorr) {
        correctAnswers++;
        showFeedback("Correct!")
    } else {
        timeAllowed = Math.max(0, timeAllowed - timeSubtract);
        timerElement.textContent = timeAllowed;
        showFeedback("Incorrect!")
    }

    // check if question is last one
    if (currentQuestionIndex === questions.length - 1) {
        const timeRemaining = Math.max(0, timeAllowed);

        // store it in local
        localStorage.setItem("timeScore", timeRemaining);

        // display time remaining on the page
        timeScoreElement.textContent = timeRemaining;
        timerElement.textContent = timeRemaining;
    }

    //  move to the next question
    currentQuestionIndex++;
    loadQuestion();

}


// need to create function to show the feedback message

function showFeedback(message) {
    const feedbackElemetn = document.getElementById("feedback");
    feedbackElemetn.textContent = message;
    feedbackElemetn.classList.remove("hide");

    // need to hide the message when the next question loads
    setTimeout(() => {
        feedbackElemetn.textContent = "";
        feedbackElemetn.classList.add("hide");
    }, 1000);
}


function endQuiz() {
    const endScreen = document.getElementById("end-screen");
    const pctScore = document.getElementById("pct-score");
    const numScore = document.getElementById("num-score");
    const timeScoreElement = document.getElementById("time-score");


    //  display end screen and hide questions page
    questionsSection.classList.add("hide");
    endScreen.classList.remove("hide");

    // * displays the score
    //  the score is determined by how many times the 'correct' button was clicked, it has no affiliation with any 'incorrect' buttons

    const numsScore = correctAnswers // the amount of correct answers
    const pctsScore = (correctAnswers / questions.length) * 100 //show as percentage
    pctScore.textContent = `${pctsScore.toFixed(1)}%`;
    numScore.textContent = `${numsScore} out of ${questions.length} questions correct!`;



    // * displays the time remaining

    const timeScore = localStorage.getItem("timeScore");


    // TODO: View Highscores link should take me to a leaderboard where I can see all the local scores/times displayed in a list format:

    function showSubmit(message) {
        const submitMessage = document.getElementById("submitted");
        submitMessage.innerHTML = `${message} <button id="viewHighscores">View the Leaderboard</button>`;
        submitMessage.classList.remove("hide");
        
        const viewHighScoresButton = document.getElementById("viewHighscores");
    
        viewHighScoresButton.addEventListener("click", function() {
            window.location.href = "highscores.html"; 
        });
        
        
    }

    const initialsInput = document.getElementById("initials");
    const submitButton = document.getElementById("submit");

    // add an event listener to the submit button
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (!quizEnded) {
            quizEnded = true;

            submitButton.disabled = true;

            showSubmit("Submitted!");

            const playerInitials = initialsInput.value.trim();

            

            if (playerInitials !== "") {
                //get exisiting scores from local storage or start an empty array
                const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

                //create new entry
                const newHighScore = {
                    initials: playerInitials,
                    numScore: correctAnswers,
                    pctScore: (correctAnswers / questions.length) * 100,
                    time: localStorage.getItem("timeScore") || 0,
                };

                //add the new score to the array
                highscores.push(newHighScore);

                //save the new score to the local storage
                localStorage.setItem("highscores", JSON.stringify(highscores));

            }
        }
    });

    
}
