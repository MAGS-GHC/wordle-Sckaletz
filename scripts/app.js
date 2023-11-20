let splitSecretWord;

function inputValidation() {
  let inputFromHTML = document.getElementById("input").value.toLowerCase();
  let validInput = /^[a-z]+$/.test(inputFromHTML);
  if (validInput && inputFromHTML.length === 5) {
    return inputFromHTML;
  } else {
    alert("test");
  }
}

function uiUpdater(splitSecretWord) {
  let validInput = inputValidation();
  let inputSplitArray = validInput.split("");
  let rowSelector = document.getElementById("row1");
  let count = 0;

  for (element of rowSelector.getElementsByTagName("div")) {
    let currentLetterInSecretWord = splitSecretWord[count];
    let currentLetterInGuessedWord = inputSplitArray[count];

    element.innerHTML = currentLetterInGuessedWord;

    if (currentLetterInSecretWord === currentLetterInGuessedWord) {
      element.style.backgroundColor = "rgb(0, 153, 0)";
    } else if (splitSecretWord.includes(currentLetterInGuessedWord)) {
      element.style.backgroundColor = "rgb(255, 215, 0)";
    } else {
      element.style.backgroundColor = "rgb(50, 50, 50)";
    }

    count++;
  }
  count = 0;
}

fetch("/assets/wordle.txt")
  .then((response) => response.text())
  .then((data) => {
    const words = data.split(" ");
    const randomWord = Math.floor(Math.random() * words.length);
    console.log(words[randomWord]);

    let word = words[randomWord];
    splitSecretWord = word.split("");
  });
