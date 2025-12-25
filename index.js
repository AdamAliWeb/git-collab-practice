const d = document;

let player1;
let player2;
let count = 3;

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

const determineWinner = (p1, p2) => {
  if (p1 === p2) {
    return "It's a tie!";
  } else if (
    (p1 === "rock" && p2 === "scissors") ||
    (p1 === "scissors" && p2 === "paper") ||
    (p1 === "paper" && p2 === "rock")
  ) {
    return "Player 1 wins!";
  } else {
    return "Player 2 wins!";
  }
};

const randomChoice = (player) => {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
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
        player2 = randomChoice("player2");
        d.querySelector("#result-player-1").src = imageOptions[player1];
        d.querySelector("#result-player-2").src = imageOptions[player2];

        d.querySelector("#counter").textContent = determineWinner(
          player1,
          player2
        );
      }
    }, 1000);
  }
});
