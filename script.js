// dom
const textFields = document.querySelectorAll(".play-input-div");
const rowFields = document.querySelectorAll(".play-row");
const TODAY_URL = "https://words.dev-apis.com/word-of-the-day?muzzel=1";

let now = Date.now();
let TODAY_WORD = "";
const chancesTracker = [5, 10, 15, 20, 25, 30];

let textCount = 0;
let rowCount = 0;
let chance = 0;
let chanceText = "";

window.addEventListener("load", async () => {
  let response = await fetch(TODAY_URL);
  let data = await response.json();
  TODAY_WORD = data.word;
  console.log(TODAY_WORD);
});

document.addEventListener("keydown", handelKeyboard);

function handelKeyboard(event) {
  if (Date.now() < now) {
    return;
  }
  const key = event.key;
  const istext = isLetter(key);

  if (istext) {
    if (textCount >= 30) {
      return;
    }

    handelRow();

    textCount++;
    textFields[textCount - 1].textContent = key;

    handelFiveChac();
  } else if (key === "Backspace") {
    if (textCount <= 0) {
      return;
    }

    let row = textFields[textCount - 1].closest(".play-row");

    if (row.classList.contains("attempted")) {
      return;
    }

    textFields[textCount - 1].textContent = "";
    textCount--;
    console.log(textCount);
  }
}

function handelFiveChac() {
  if (chancesTracker.includes(textCount)) {
    getChanceText();
    checkingCorrection();

    now = Date.now() + 2000;
    setTimeout(() => {
      rowFields[rowCount].classList.add("correct");
      rowFields[rowCount].classList.add("attempted");
    }, 300);
  }
}

function getChanceText() {
  switch (textCount) {
    case 5:
      iterationLoop(5);
      break;
    case 10:
      iterationLoop(10);
      break;
    case 15:
      iterationLoop(15);
      break;
    case 20:
      iterationLoop(20);
      break;
    case 25:
      iterationLoop(25);
      break;
    case 30:
      iterationLoop(30);
      break;
  }
}

function checkingCorrection() {}

function handelRow() {
  if (textCount / 5 < 1) {
    rowCount = 0;
  } else if (textCount / 5 < 2) {
    rowCount = 1;
  } else if (textCount / 5 < 3) {
    rowCount = 2;
  } else if (textCount / 5 < 4) {
    rowCount = 3;
  } else if (textCount / 5 < 5) {
    rowCount = 4;
  } else if (textCount / 5 < 6) {
    rowCount = 5;
  }
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function iterationLoop(start) {
  chanceText = "";

  for (let i = start - 5; i < start + 5; i++) {
    chanceText += textFields[i].textContent;
  }
}
