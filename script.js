// dom
const textFields = document.querySelectorAll(".play-input-div");
const rowFields = document.querySelectorAll(".play-row");
const TODAY_URL = "https://words.dev-apis.com/word-of-the-day?puzzle=1";
const VALIDATER_URL = "https://words.dev-apis.com/validate-word";
let isWordIsValid = false;

let now = Date.now();
let TODAY_WORD = "happy";
let TODAY_WORD_STRUCTURE = "happy"; //["c", "i", "g", "a", "r"]
const chancesTracker = [5, 10, 15, 20, 25, 30];

let textCount = 0;
let rowCount = 0;
let chance = 0;
let chanceText = "";
let USER_GUESS_STRUCTURE = [];
let chanceNodes = [];

// load Today Word
// window.addEventListener("load", async () => {
//   let response = await fetch(TODAY_URL);
//   let data = await response.json();
//   TODAY_WORD = data.word;
// });

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
  }
}

function handelFiveChac() {
  if (chancesTracker.includes(textCount)) {
    console.log("he");

    getChanceText();

    now = Date.now() + 2000;
    setTimeout(async () => {
      await isGrammer();

      if (!isWordIsValid) return;

      rowFields[rowCount].classList.add("attempted");
      checkingCorrection();
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

function checkingCorrection() {
  let object = {};

  for (let i = 0; i < TODAY_WORD_STRUCTURE.length; i++) {
    if (!object[TODAY_WORD_STRUCTURE[i]]) {
      object[TODAY_WORD_STRUCTURE[i]] =
        TODAY_WORD_STRUCTURE.split(TODAY_WORD_STRUCTURE[i]).length - 1;
    }
  }

  for (let i = 0; i < TODAY_WORD_STRUCTURE.length; i++) {
    if (
      TODAY_WORD_STRUCTURE[i] === USER_GUESS_STRUCTURE[i] &&
      object[TODAY_WORD_STRUCTURE[i]] > 0
    ) {
      object[USER_GUESS_STRUCTURE[i]]--;
      chanceNodes[i].classList.add("green");
    } else if (
      TODAY_WORD_STRUCTURE.includes(USER_GUESS_STRUCTURE[i]) &&
      object[USER_GUESS_STRUCTURE[i]] > 0
    ) {
      object[USER_GUESS_STRUCTURE[i]]--;

      chanceNodes[i].classList.add("yellow");
    } else {
      chanceNodes[i].classList.add("grey");
    }
  }

  if (chanceText == TODAY_WORD) {
    rowFields[rowCount].classList.add("correct");
  } else {
    rowFields[rowCount].classList.add("wrong");
  }
}

async function isGrammer() {
  let response = await fetch(VALIDATER_URL, {
    method: "post",
    body: JSON.stringify({
      word: chanceText,
    }),
  });

  let data = await response.json();
  isWordIsValid = data.validWord;
}

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
  chanceNodes = [];

  for (let i = start - 5; i < start; i++) {
    chanceText += textFields[i].textContent;
    chanceNodes.push(textFields[i]);
  }

  USER_GUESS_STRUCTURE = chanceText; //Array.from(chanceText)
}
