const startGameBtn = document.querySelector(".start-game-btn");
const header = document.querySelector("header");
const main = document.querySelector("main");
const optionsBtn = document.querySelector(".options");
const gameOverContainer = document.querySelector(".game-over-container");
const gameOverBtn = document.querySelector(".game-over-btn");
const guessBox = document.querySelector(".guess-box");
const resetBtn = document.querySelector(".reset-btn");
const correct = document.querySelector(".correct");
const overlay = document.querySelector(".overlay");
const guessBoxQM = document.querySelector(".guess-box p");
const score = document.querySelector(".score");
const highScore = document.querySelector(".high-score");

const footer = document.querySelector("footer");

let scoreEl = 0;
let highScoreEl = 0;

//prettier-ignore
const colors = ["rgb(255, 153, 0)", "rgb(172, 255, 172)", "rgb(128, 0, 128)", "rgb(150, 75, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)"];

//STARTING GAME FEATURE
const handleStartGame = function () {
  main.classList.remove("hidden");
  header.classList.add("hidden");
  footer.classList.add("hidden");
};

startGameBtn.addEventListener("click", handleStartGame);

//CREATING THE BUTTONS
function createBtns() {
  colors.forEach((color, idx) => {
    const createBtn = document.createElement("button");
    createBtn.classList.add("option-btn");
    createBtn.setAttribute("data-testid", "colorOptions");
    createBtn.style.backgroundColor = color;
    console.log(createBtn);
    createBtn.innerText = `Color ${idx + 1}`;

    optionsBtn.insertAdjacentElement("beforeend", createBtn);
  });
}

//FUNCTION FOR HIGHTSCORE
const handleHighScore = function () {
  if (scoreEl > highScoreEl) highScoreEl = scoreEl;
  highScore.textContent = highScoreEl;
};

//SELECTING COLORS FEATURE AND CHECKING IF GUESS IS CORRECT
optionsBtn.addEventListener("click", function (e) {
  if (!e.target.classList.contains("option-btn")) return;
  isClicked = true;
  const randomNumber = Math.trunc(Math.random() * (5 + 0)) - 0;

  guessBoxQM.classList.add("hidden");
  guessBox.style.backgroundColor = colors[randomNumber];

  const optionBtns = document.querySelectorAll(".option-btn");

  optionBtns.forEach((btn) => {
    btn.style.opacity = 0.5;
    btn.disabled = true;
    btn.style.transform = "scale(0.9)";
  });
  e.target.style.opacity = 1;
  e.target.style.transform = "scale(1.1)";

  if (e.target.style.backgroundColor === colors[randomNumber]) {
    scoreEl = scoreEl + 1;
    score.textContent = scoreEl;
    correct.style.top = "10px";
  }
  if (e.target.style.backgroundColor !== colors[randomNumber]) {
    setTimeout(function () {
      overlay.classList.remove("hidden");
      gameOverContainer.classList.remove("hidden");
      handleHighScore();
    }, 1500);
  }

  setTimeout(function () {
    guessBoxQM.classList.remove("hidden");
    guessBox.style.backgroundColor = "whitesmoke";
    optionBtns.forEach((btn) => {
      btn.disabled = false;
      btn.style.opacity = 1;
      btn.style.transform = "scale(1)";
      correct.style.top = "-100%";
    });
  }, 1500);
});

//GAME OVER FEATURE
gameOverBtn.addEventListener("click", function () {
  score.textContent = 0;
  overlay.classList.add("hidden");
  gameOverContainer.classList.add("hidden");
});

//RESET FEATUIRE
resetBtn.addEventListener("click", function () {
  score.textContent = 0;
});

function init() {
  createBtns();
}

//INITIALIZING GAME FEATURE
init();
