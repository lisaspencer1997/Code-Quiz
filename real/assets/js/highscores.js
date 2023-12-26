document.addEventListener("DOMContentLoaded", function () {
    const highscoresList = document.getElementById("highscores-list");

    //get highscores from local
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // display highscores
    highscores.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${entry.initials} - Score: ${entry.score}, Time: ${entry.time} seconds`;
        highscoresList.appendChild(listItem);
    })
});