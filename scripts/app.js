let words;
let secretWord;
let splitSecretWord;
let validInput;
let wonGame = false;

// Row objekter
let rows = {
    row1: false,
    row2: false,
    row3: false,
    row4: false,
    row5: false,
    row6: false,
};

// Tjek om row i objektet står til false for at fortsætte
function selectRow() {
    for (let [key, value] of Object.entries(rows)) {
        if (value === false) {
            return key;
        }
    }
}

// Tjek om indtastet ord lever op til kravene
function inputValidation() {
    let inputFromHTML = document.getElementById("input").value.toLowerCase();
    let validInput = /^[a-z]+$/.test(inputFromHTML);

    if (!validInput) {
        alert("Dit input er ikke tilladt. Brug kun bogstaver.");
    } else if (inputFromHTML.length !== 5) {
        alert("Dit input er ikke 5 bogstaver langt.");
    } else if (!words.includes(inputFromHTML)) {
        alert("Dit ord er ikke i listen");
    } else if (
        validInput &&
        inputFromHTML.length === 5 &&
        words.includes(inputFromHTML)
    ) {
        return inputFromHTML;
    }
}

// Opdatering af GUI med farver på felterne
function uiUpdater(splitSecretWord) {
    validInput = inputValidation();
    let inputSplitArray = validInput.split("");
    let selectedRow = selectRow();
    let rowHTMLSelector = document.getElementById(selectedRow);
    let count = 0;

    for (element of rowHTMLSelector.getElementsByTagName("div")) {
        if (wonGame) {
            break;
        }
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
        document.getElementById("input").value = "";
        count++;
    }
    rows[selectedRow] = true;
    count = 0;
    checkIfWordIsCorrect();
}

// Tjek om det gættede ord er korrekt
function checkIfWordIsCorrect() {
    for (let [key, value] of Object.entries(rows)) {
        if (
            key === "row6" &&
            value === true &&
            validInput !== secretWord &&
            wonGame === false
        ) {
            alert("Du tabte");
        }
    }

    if (validInput === secretWord) {
        wonGame = true;
        alert("Du vandt");
        document.getElementById("input").disabled = true;
    }
}

// Reset siden og start med nyt ord
function resetGame() {
    location.reload();
}

// Indlæs fil med alle ord
fetch("/assets/wordle.txt")
    .then((response) => response.text())
    .then((data) => {
        words = data.split(" "); // Separer alle ord
        const randomWord = Math.floor(Math.random() * words.length); // Udvælg et tilfældigt ord
        console.log(words[randomWord]); // afslør det korrekte ord i console til test
        secretWord = words[randomWord];
        splitSecretWord = secretWord.split(""); // Split ordet i enkelte bogstaver
    });
