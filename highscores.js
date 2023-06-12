// highscores.js
const highScoreList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

if (highScores.length > 0) {
  highScoreList.innerHTML = highScores
    .map(score => {
      return `<li class="high-score">${score.name}-${score.score}</li>`;
    })
    .join("");
} else {
  highScoreList.innerHTML = "<li>No high scores available</li>";
}
