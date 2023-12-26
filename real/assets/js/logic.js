const startQuizButton = document.querySelector("#start");
const startScreen = document.getElementById("start-screen");
const questionsSection = document.getElementById("questions");
const timerElement = document.getElementById("seconds-counting-down");
const timeScoreElement = document.getElementById("time-score");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;
let timeAllowed = 7; // ! changing to 7 second to make testing easier -- remember to change to higher later


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
        timer = setInterval (function () {
            timeAllowed--;
            timerElement.textContent = timeAllowed;

            if (timeAllowed <=0 | currentQuestionIndex === questions.length) {
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
    // TODO: When an answer is selected (the button is clicked), the code needs to remember which choice was selected (i.e. was it correct or incorrect) and then should display the next question:
    
    // ~ When the INCORRECT answer is selected (either 3 of the buttons are clicked), it should REMOVE 3 SECONDS FROM THE TIMER INSTANTLY

        //  remember the users choice as either correct or incorrect
        function remUserChoice(userChoice, correctAnswer) {
            
            const isCorr = userChoice === correctAnswer;

            //  update the score of correct answers
            if (isCorr) {
                correctAnswers++;
            }

            // check if question is last one
            if (currentQuestionIndex === questions.length - 1) {
                const timeRemaining = Math.max(0, timeAllowed);

                // store it in local
                localStorage.setItem("timeScore", timeRemaining);

                // display time remaining on the page
                timeScoreElement.textContent = timeRemaining;
            }

            //  move to the next question
            currentQuestionIndex++;
            loadQuestion();

        }


// TODO: ///////////////////////////////////////////////////////////////////////////////////////////////////////////////End of quiz screen:
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
        pctScore.textContent = `${pctsScore}%`;
        numScore.textContent = `${numsScore} out of ${questions.length} questions correct!`;



    // * displays the time remaining
        // ? & if the timer ended at 0 and not all questions were answered, it should display "no remaming time left" *bonus if you have time left

        // if all questions were answered, the time should be stored at the moment the last button was clicked (whether it was correct or incorrect) 
        const timeScore = localStorage.getItem("timeScore");
        timeScoreElement.textContent = timeScore;
        

    // * Add initials to add to leaderboard:
        // ^ a textbox should appear to add name/initials to leaderboard with a submit button
        // ^ when submimt button is clicked, the text is cleared, and the initials plus the score and time are saved in local storage
    
    // * 'go back' button
        // ^ there should be a 'go back' button which would bring you back to the start of the quiz, and the quiz should be able to be taken again. 

// TODO: View Highscores link should take me to a leaderboard where I can see all the local scores/times displayed in a list format:

const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");

    // add an event listener to the submit button
    submitButton.addEventListener("click", function() {
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
    })



    // * this is in a new HTML page - create new HTML page (look in folder)
    // * the leaderboard should show in the list order:
        // ^ the initials
        // ^ the time they got
        // ^ the score they got
    // * 'back to the home screen' button should have a link back to the game page

}