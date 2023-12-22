const startQuizButton = document.querySelector("#start");
const startScreen = document.getElementById("start-screen");
const questionsSection = document.getElementById("questions");

let currentQuestionIndex = 0;
let correctAnswers = 0;


// TODO: When the 'Start Quiz' button is clicked, it should:

startQuizButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    // * remove the title page and button
     startScreen.classList.add("hide");
     questionsSection.classList.remove("hide");
    
    // * load the first question of the quiz    
     loadQuestion();
    
    // * start the timer of 10 seconds})
    


});     
    



// TODO: When the first question loads, it should:

 // * display the question
 // create a function to load the question
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
    
            // * display the multiple-choice answers as listed buttons
            currentQuestion.choices.forEach((choice, index) => {
                const choiceButton = document.createElement("button");
                choiceButton.className = "choice-button";
                choiceButton.textContent = choice;
                
                // buttons should be clickable and saved
                choiceButton.addEventListener("click", remUserChoice);

                choicesContainer.appendChild(choiceButton);
            })

        } else {
        endQuiz();
     }

        // * display the timer counting down every second


    }
    // TODO: When an answer is selected (the button is clicked), the code needs to remember which choice was selected (i.e. was it correct or incorrect) and then should display the next question:
        // * remember the users choice as either correct or incorrect
         function remUserChoice(userChoice, correctAnswer) {
            const isCorr = userChoice === correctAnswer;

        // * move to the next question
         currentQuestionIndex++;
         loadQuestion();

        // * the timer should continue counting down as normal (should not change from first job)

        

        // * the score goes up by 1 (the score is hidden from the view of the user until the end screen)

         }

    // TODO: When the INCORRECT answer is selected (either 3 of the buttons are clicked), it should:
        // * display the NEXT question and answers in the same way as the first one
        // * the timer should continue counting down as normal (should not change from first job) 
            // ! BUT ALSO IT SHOULD REMOVE 3 SECONDS FROM THE TIMER INSTANTLY
        // * the score does not move (the score is hidden from the view of the user until the end screen)

// TODO: When the timer hits 0, it should:
    // * the counter should stop going furthet than 0
    // * the quiz should end, meaning if there are still questions in the question bank, they should not be displayed, and the 'end of quiz' screen should display

// TODO: When the last question of the question bank has been displayed:
    // * the quiz should end, meaning if there is still time ticking down to the 0, the time is saved in local storage, and the 'end of quiz' screen should display


// TODO: End of quiz screem:
 function endQuiz() {
    const endScreen = document.getElementById("end-screen");
    const pctScore = document.getElementById("pct-score");
    const numScore = document.getElementById("num-score");
    
    // * display end screen and hide questions page
     questionsSection.classList.add("hide");
     endScreen.classList.remove("hide");

    // * happens either:
        // ^ when the time ends at 0

        // ^ when the last question in the question bank has been answered

    // * displays the score
        // ^ the score is determined by how many times the 'correct' button was clicked, it has no affiliation with any 'incorrect' buttons

        const numsScore = correctAnswers // the amount of correct answers
        const pctsScore = (correctAnswers / currentQuestionIndex) * 100 //show as percentage
        pctScore.textContent = `${pctsScore}%`;
        numScore.textContent = `${numsScore} out of ${currentQuestionIndex} questions correct!`;


    // * displays the time remaining
        // & if the timer ended at 0 and not all questions were answered, it should display "no remaming time left"

        // & if all questions were answered, the time should be stored at the moment the last button was clicked (whether it was correct or incorrect)
    // * displays the amount of questions answered ** this is only a bonus if i have enough time as it is not in the acceptance criteria
        // & if the timer ended at 0 and not all questions were answered, it should display the amount of buttons clicked concat with "out out 15 questions" (pretend its 15 questions for now)

        // & if all questions were answered, it should display "15 out of 15 questions were answered"

    // * Add initials to add to leaderboard:
        // ^ a textbox should appear to add name/initials to leaderboard with a submit button
        // ^ when submimt button is clicked, the text is cleared, and the initials plus the score and time are saved in local storage
     
    // * 'go back' button
        // ^ there should be a 'go back' button which would bring you back to the start of the quiz, and the quiz should be able to be taken again. 

// TODO: View Highscores link should take me to a leaderboard where I can see all the local scores/times displayed in a list format:
    // * this is in a new HTML page
    // * the leaderboard should show in the list order:
        // ^ the initials
        // ^ the time they got
        // ^ the score they got
    // * 'back to the home screen' button should have a link back to the game page

 }