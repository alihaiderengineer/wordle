// dom
const textFields = document.querySelectorAll(".play-input-div");
const rowFields = document.querySelectorAll(".play-row");

let now = Date.now();
const chancesTracker = [5, 10, 15, 20, 25, 30];

let textCount = 0;
let rowCount = 0;
let chance = 0;
let chanceText = "";

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
  for (let i = 0; i < textCount; i++) {
    chanceText += textFields[i].textContent;
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
