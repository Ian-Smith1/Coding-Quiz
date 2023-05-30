var start = document.querySelector(".start");
var done = document.querySelector(".submit");
var playerScore = document.querySelector(".playerScore");

var score = 0;
var clock = 101;

var startSection = document.querySelector(".startSection");
var questionSection = document.querySelector(".questionSection");
var resultSection = document.querySelector(".resultSection");
var questionResult = document.querySelector(".questionResult");
var timer = document.querySelector(".timer");
var initialsBox = document.querySelector(".playerInitialsBox");
var initials = document.querySelector(".initials");
var scores = document.querySelector(".playerScoreList");
var leaderboard = [];
var readyPrompt = document.querySelector(".readyPrompt");
var playerReady = document.querySelector(".playerReady");
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

function handleAnswer(ans) {
  console.log(ans);
  var playerAnswer = parseInt(ans);
  // if (playerAnswer.matches(".start") === false) {
  var results;
  if (
    questions[currentQuestionIndex].choice[playerAnswer] ===
    questions[currentQuestionIndex].answer
  ) {
    score = score + 1;
    results = "CORRECT";
    playerScore.textContent = "Your Score: " + score;
  } else {
    clock = clock - 15;
    results = "INCORRECT";
  }
  questionResult.append = results;
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    end();
  } else {
    showQuestion();
  }
}

function showQuestion() {
  currentQuestion = questions[currentQuestionIndex];
  // readyPrompt.textContent = currentQuestion.title;
  var template = `
  <h2>${currentQuestion.title}</h2>
          <button class="answerBtn"id="0" onclick="handleAnswer(this.id)">${currentQuestion.choice[0]}</button>
          <button class="answerBtn"id="1" onclick="handleAnswer(this.id)">${currentQuestion.choice[1]}</button>
          <button class="answerBtn"id="2" onclick="handleAnswer(this.id)">${currentQuestion.choice[2]}</button>
          <button class="answerBtn"id="3" onclick="handleAnswer(this.id)">${currentQuestion.choice[3]}</button>
  `;
  questionResult.innerHTML = template;
  // for (var i = 0; i < currentQuestion.length; i++) {
  //   var choiceButton = Object.assign(document.createElement("button"), {
  //     class: answerBtn,
  //   });
  //   choiceButton.textContent = i + 1 + ". " + currentQuestion.choice[i];
  //   playerReady.appendChild(choiceButton);
  // }
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

function startQuiz() {
  // setTimer();
  startSection.classList.add("hide");
  questionSection.classList.remove("hide");
  // start.setAttribute("hidden", "true");
  // timer.removeAttribute("hidden");
  showQuestion();
}

function end() {
  // pausedTime();
  questionSection.classList.add("hide");
  resultSection.classList.remove("hide");

  // document.querySelector("subQuestion").setAttribute("hidden", "true");
  // done.removeAttribute("hidden");
  // questionResult.textContent = "GAME OVER";
  // playerInitialsBox.removeAttribute("hidden");
}

function submission() {
  done.setAttribute("hidden", "true");
  pausedTime();
  playerInitialsBox.removeAttribute("hidden");
  questionResult.textContent = "Enter your initials here!";
}

function showScores() {
  leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
  if (leaderboard === null) {
    leaderboard = [];
  } else {
    var showLeaderboard = leaderboard.sort();
    for (var i = 0; i < showLeaderboard.length; i++) {
      var ranking = document.createElement("li");
      ranking.textContent = showLeaderboard[i];
      scores.appendChild(rank);
    }
  }
}

start.addEventListener("click", startQuiz);

// start.addEventListener("click", function (e) {
//   e.preventDefault();
//   var playerInitals = playerInitals.value;
//   if (playerInitals === "") {
//     playerInitals = alert("Input valid initials");
//   } else {
//     playerInitals.value = " ";
//     var playerScore = playerInitals.concat(":", score);
//     leaderboard.push(playerScore);
//     localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
//     var rank = document.createElement("li");
//     rank.textContent = playerScore;
//     scores.appendChild(rank);
//   }
//   playerReady.addEventListener("click", function (e) {
//     var playerAnswer = e.target;
//     if (playerAnswer.matches(".start") === false) {
//       var results;
//       if (
//         playerAnswer.textContent.substring(3) ===
//         questions[currentQuestionIndex].result
//       ) {
//         score = score + 1;
//         results = "CORRECT";
//         playerScore.textContent = "Your Score: " + score;
//       } else {
//         clock = clock - 15;
//         results = "INCORRECT";
//       }
//       questionResult.append = results;
//       currentQuestionIndex++;
//       if (currentQuestionIndex === questions.length) {
//         end();
//       } else {
//         showQuestion();
//       }
//     }
//   });
// });
