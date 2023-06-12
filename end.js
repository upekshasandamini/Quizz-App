/*const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e =>{
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    console.log(highScores);
};*/

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const MAX_HIGH_SCORES = 5;


let highScores = [];
const storedHighScores = localStorage.getItem("highScores");
if (storedHighScores) {
  try {
    highScores = JSON.parse(storedHighScores);
  } catch (error) {
    console.error("Error parsing high scores:", error);
  }
}

console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
  console.log("clicked the save button!");
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random()*100),
    name: username.value
  };
  highScores.push(score);

  highScores.sort( (a,b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('higjScores',JSON.stringify(highScores));
  window.location.assign("index.html")
  console.log(highScores);
};
