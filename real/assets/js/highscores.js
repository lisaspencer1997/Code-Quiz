document.addEventListener("DOMContentLoaded", function () {
    const highscoresList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear");

    // display highscores
    function displayHighScores() {

        highscoresList.innerHTML = "";
        
        const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        
        highscores.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.initials} - Correct Questions: ${entry.numScore}, Percentage score: ${entry.pctScore}%, Time: ${entry.time} seconds remaining`;
            highscoresList.appendChild(listItem);
        })

    }

    displayHighScores();


    //clear the highscores
    clearButton.addEventListener("click", function() {
        localStorage.removeItem("highscores");
        displayHighScores();
    })
});

