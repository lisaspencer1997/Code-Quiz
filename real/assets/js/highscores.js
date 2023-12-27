document.addEventListener("DOMContentLoaded", function () {
    const highscoresBody = document.getElementById("highscores-body");
    const clearButton = document.getElementById("clear");

    // display highscores
    function displayHighScores() {

        highscoresBody.innerHTML = "";
        
        const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        
        highscores.forEach((entry, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.initials}</td>
                <td>${entry.numScore}</td>
                <td>${entry.pctScore.toFixed(1)}%</td>
                <td>${entry.time}</td>
            `;
            highscoresBody.appendChild(row);
        })

    }

    displayHighScores();


    //clear the highscores
    clearButton.addEventListener("click", function() {
        localStorage.removeItem("highscores");
        displayHighScores();
    })
});

