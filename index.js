const d = document;

let player1;
let player2;
let count = 3;

if (!localStorage.getItem("player1Score")) {
  localStorage.setItem("player1Score", 0);
}

if (!localStorage.getItem("player2Score")) {
  localStorage.setItem("player2Score", 0);
}

let player1Score = localStorage.getItem("player1Score");
let player2Score = localStorage.getItem("player2Score");

d.querySelector("#player1-score").textContent = player1Score;
d.querySelector("#player2-score").textContent = player2Score;

let svgs = d.querySelectorAll(".game-btn img");

const imageOptions = {
  rock: svgs[0].src,
  paper: svgs[1].src,
  scissors: svgs[2].src,
};

const disableBtns = () => {
  d.querySelectorAll(".game-btn").forEach((el) => {
    el.disabled = true;
    el.classList.add("disabled-btn");
  });
};

const enableBtns = () => {
  d.querySelectorAll(".game-btn").forEach((el) => {
    el.disabled = false;
    el.classList.remove("disabled-btn");
  });
};

const determineWinner = (p1, p2) => {
  if (p1 === p2) {
    return "It's a tie!";
  } else if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "rock")
  ) {
    player1Score++;
    localStorage.setItem("player1Score", player1Score);
    d.querySelector("#player1-score").textContent = player1Score;

    return "Player 1 wins!";
  } else {
    player2Score++;
    localStorage.setItem("player2Score", player2Score);
    d.querySelector("#player2-score").textContent = player2Score;
    return "Player 2 wins!";
  }
};

const randomChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
};

const resetGame = () => {
  enableBtns();
  d.querySelector("#result-player-1").src = "";
  d.querySelector("#result-player-2").src = "";
  d.querySelector("#counter").textContent =
    "Select a choice to start the game!";

  player1 = null;
  player2 = null;
  count = 3;

  d.querySelector(".reset-btn").disabled = true;
  d.querySelector(".reset-btn").style.display = "none";
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".game-btn")) {
    console.log(e.target.id);
    player1 = e.target.id;
    disableBtns();

    d.querySelector("#counter").textContent = count;
    let counter = setInterval(() => {
      count--;
      d.querySelector("#counter").textContent = count;

      if (count <= 0) {
        clearInterval(counter);
        player2 = randomChoice();
        d.querySelector("#result-player-1").src = imageOptions[player1];
        d.querySelector("#result-player-2").src = imageOptions[player2];

        d.querySelector("#counter").textContent = determineWinner(
          player1,
          player2
        );
        d.querySelector(".reset-btn").disabled = false;
        d.querySelector(".reset-btn").style.display = "block";
      }
    }, 1000);
  }

  if (e.target.matches(".reset-btn")) {
    resetGame();
  }
});
