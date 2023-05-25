var start = document.querySelector("start");
var done = document.querySelector("submit");
var playerScore = document.querySelector("playerScore");

start.onclick = startQuiz;
done.onclick = submitScore;

var score = 0;
var clock = 101;

var timer = document.querySelector("timer");
var initialsBox = document.querySelector("playerInitialsBox");
var initials = document.querySelector("initials");
var scores = doument.querySelector("playerScoreList");
var leaderboard = [];
var questionSection = document.querySelector("questionSection");
var readyPrompt = document.querySelector("readyPrompt");
var questionResult = document.querySelector("questionResult");
var playerReady = document.querySelector("playerReady");
var currentQuestion;
var currentQuestionIndex = 0;

var questions = [
  {
    title: "Commonly used data types DO not include:",
    choice: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    title: "The condition in a if / else statement is enclosed with ____.",
    choice: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    answer: "Parenthesis",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choice: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the Above",
    ],
    answer: "All of the Above",
  },
  {
    title:
      "String values must be enclosed with ____ when being assigned to variables",
    choice: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    answer: "Quotes",
  },
];

function showQuestion() {
  currentQuestion = questions[currentQuestionIndex];
  readyPrompt.textContent = currentQuestion.title;
  playerReady.innerHTML = "";

  for (var i = 0; i < currentQuestion.length; i++) {
    var choiceButton = Object.assign(document.createElement("button"), {
      class: answerBtn,
    });
    choiceButton.textContent = i + 1 + ". " + currentQuestion.choice[i];
    playerReady.appendChild(choiceButton);
  }
}

var paused = false;

function startTimer() {
  var timeInterval = setInterval(function () {
    clock--;
    timer.textContent = clock + "Seconds";
    if (clock <= -1) {
      pausedTime(timeInterval);
      end();
      clock++;
      timer.textContent = clock + "Seconds";
    }
  }, 1000);
}

function pausedTime() {
  paused = true;
}

playerReady.addEventListener("click", function (e) {
  var playerAnswer = e.target;
  if (playerAnswer.matches("start") === false) {
    var results;
    if (
      playerAnswer.textContent.substring(3) ===
      questions[currentQuestionIndex].answer
    ) {
      score = score + 1;
      results = "CORRECT";
      playerScore.textContent = "Your Score: " + score;
    } else {
      clock = clock - 15;
      results = "INCORRECT";
    }
    questionResult.innerHTML = results;
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      end();
    } else {
      showQuestion();
    }
  }
});

function startQuiz() {
  setTimer();
  start.setAttribute("hidden", "true");
  timer.removeAttribute("hidden");
  showQuestion();
}

function end() {
  pausedTime();
  document.querySelector("subQuestion").setAttribute("hidden", "true");
  done.removeAttribute("hidden");
  questionResult.textContent = "GAME OVER";
  playerInitialsBox.removeAttribute("hidden");
}

function submission() {
  done.setAttribute("hidden", "true");
  pausedTime();
  playerInitialsBox.removeAttribute("hidden");
  questionResult.textContent = "Enter your initials here!";
}
