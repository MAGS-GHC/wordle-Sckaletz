fetch("/assets/wordle.txt")
  .then((response) => response.text())
  .then((data) => {
    const words = data.split(" ");
    const randomWord = Math.floor(Math.random() * words.length);
    console.log(randomWord, words[randomWord]);
  });

const word = "about";

function inputValidation() {
  let inputFromHTML = document.getElementById("input").value.toLowerCase();
  let validInput = /^[a-z]+$/.test(inputFromHTML);
  if (validInput && inputFromHTML.length === 5) {
    return inputFromHTML;
  } else {
    alert("test");
  }
}

function uiUpdater() {
  let splitSecretWord = word.split("");
  let validInput = inputValidation();
  let inputSplitArray = validInput.split("");
  let rowSelector = document.getElementById("row1");
  let count = 0;

  for (element of rowSelector.getElementsByTagName("div")) {
    element.innerHTML = inputSplitArray[count];

    if (splitSecretWord[count] === inputSplitArray[count]) {
      element.style.backgroundColor = "green";
    } else {
      element.style.backgroundColor = "red";
    }

    count++;
  }
  count = 0;
}
