
/* ==========================================
   🔤 WORD GUESS
   5 - 15 LETTER ENGLISH WORDS
   2-3 LETTERS ARE AUTOMATICALLY SHOWN
   ULUG'BEK.R
========================================== */


/* ==========================================
   WORD DATABASE
========================================== */

const words = [

  {
    word: "APPLE",
    hint: "A common red or green fruit."
  },

  {
    word: "HOUSE",
    hint: "A place where people live."
  },

  {
    word: "WATER",
    hint: "You drink this every day."
  },

  {
    word: "SCHOOL",
    hint: "A place where students learn."
  },

  {
    word: "PLANET",
    hint: "Earth is one of these."
  },

  {
    word: "GARDEN",
    hint: "A place where flowers and plants grow."
  },

  {
    word: "WINDOW",
    hint: "You can see outside through this."
  },

  {
    word: "COMPUTER",
    hint: "An electronic machine used for work and games."
  },

  {
    word: "KEYBOARD",
    hint: "You use this to type."
  },

  {
    word: "ELEPHANT",
    hint: "A very large animal with a trunk."
  },

  {
    word: "MOUNTAIN",
    hint: "A very high natural landform."
  },

  {
    word: "NOTEBOOK",
    hint: "You can write notes in this."
  },

  {
    word: "TEACHER",
    hint: "A person who helps students learn."
  },

  {
    word: "SUNSHINE",
    hint: "Light that comes from the sun."
  },

  {
    word: "CHOCOLATE",
    hint: "A sweet food made from cocoa."
  },

  {
    word: "TELEPHONE",
    hint: "A device used to communicate."
  },

  {
    word: "IMPORTANT",
    hint: "Something that matters a lot."
  },

  {
    word: "KNOWLEDGE",
    hint: "Information gained through learning."
  },

  {
    word: "ADVENTURE",
    hint: "An exciting or unusual experience."
  },

  {
    word: "BEAUTIFUL",
    hint: "Very attractive or pleasing."
  },

  {
    word: "FRIENDSHIP",
    hint: "A relationship between good friends."
  },

  {
    word: "UNDERSTAND",
    hint: "To know the meaning of something."
  },

  {
    word: "PLAYGROUND",
    hint: "A place where children play."
  },

  {
    word: "DISCOVERY",
    hint: "Finding something for the first time."
  },

  {
    word: "CREATIVITY",
    hint: "The ability to create new ideas."
  },

  {
    word: "CHALLENGE",
    hint: "Something difficult that tests your ability."
  },

  {
    word: "LANGUAGE",
    hint: "A system people use to communicate."
  },

  {
    word: "TREASURE",
    hint: "Something valuable that may be hidden."
  },

  {
    word: "SUNFLOWER",
    hint: "A tall yellow flower."
  },

  {
    word: "WONDERFUL",
    hint: "Extremely good or impressive."
  }

];


/* ==========================================
   GAME VARIABLES
========================================== */

let playerName = "";

let currentWord = "";
let currentHint = "";

let revealedIndexes = [];
let guessedLetters = [];

let attempts = 0;
let lives = 3;

let score = 0;

let timeLeft = 60;

let timer = null;

let gameOver = false;


/* ==========================================
   DOM
========================================== */

const $ = id =>
  document.getElementById(id);


const screens = {

  start: $("startScreen"),

  game: $("gameScreen"),

  result: $("resultScreen"),

  rating: $("ratingScreen")

};


/* ==========================================
   SCREEN
========================================== */

function showScreen(screen) {

  Object.values(screens)
    .forEach(s =>
      s.classList.remove("active")
    );

  screen.classList.add("active");
}


/* ==========================================
   START GAME
========================================== */

$("startBtn").addEventListener(
  "click",
  startGame
);


$("playerName").addEventListener(
  "keydown",
  e => {

    if (e.key === "Enter") {
      startGame();
    }

  }
);


function startGame() {

  const name =
    $("playerName")
      .value
      .trim();


  if (!name) {

    $("playerName").placeholder =
      "Please enter your name!";

    $("playerName").focus();

    return;
  }


  playerName = name;


  localStorage.setItem(
    "wordGuessPlayer",
    playerName
  );


  resetGame();


  showScreen(
    screens.game
  );


  startTimer();
}


/* ==========================================
   RESET GAME
========================================== */

function resetGame() {

  clearInterval(timer);


  const selected =
    words[
      Math.floor(
        Math.random() *
        words.length
      )
    ];


  currentWord =
    selected.word.toUpperCase();


  currentHint =
    selected.hint;


  guessedLetters = [];


  attempts = 0;


  lives = 3;


  score = 0;


  timeLeft = 60;


  gameOver = false;


  /*
    2 yoki 3 ta harfni ochamiz.
    Qisqa so‘zlarda 2 ta,
    uzunroq so‘zlarda 3 ta.
  */

  const lettersToShow =
    currentWord.length >= 8
      ? 3
      : 2;


  revealedIndexes =
    getRandomIndexes(
      currentWord.length,
      lettersToShow
    );


  $("gamePlayer").textContent =
    playerName;


  $("score").textContent =
    "0";


  $("attempts").textContent =
    "0";


  $("lives").textContent =
    "❤️❤️❤️";


  $("timer").textContent =
    "60";


  $("wordLength").textContent =
    currentWord.length;


  $("hint").textContent =
    "💡 " + currentHint;


  $("message").textContent =
    "Find the hidden letters!";


  $("message").className =
    "message info";


  $("guessInput").value =
    "";


  $("guessInput").disabled =
    false;


  $("guessBtn").disabled =
    false;


  $("history").innerHTML =
    "";


  createKeyboard();


  updateWord();


  updateProgress();
}


/* ==========================================
   RANDOM INDEXES
========================================== */

function getRandomIndexes(
  length,
  amount
) {

  const indexes = [];


  while (
    indexes.length < amount
  ) {

    const random =
      Math.floor(
        Math.random() * length
      );


    if (
      !indexes.includes(random)
    ) {

      indexes.push(random);
    }
  }


  return indexes;
}


/* ==========================================
   WORD DISPLAY
========================================== */

function updateWord() {

  let display = "";


  for (
    let i = 0;
    i < currentWord.length;
    i++
  ) {

    const letter =
      currentWord[i];


    if (
      revealedIndexes.includes(i) ||
      guessedLetters.includes(letter)
    ) {

      display +=
        letter + " ";

    } else {

      display +=
        "_ ";
    }
  }


  $("wordDisplay").textContent =
    display.trim();
}


/* ==========================================
   KEYBOARD
========================================== */

function createKeyboard() {

  const keyboard =
    $("keyboard");


  keyboard.innerHTML =
    "";


  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


  for (
    const letter of alphabet
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.className =
      "key";


    button.textContent =
      letter;


    button.addEventListener(
      "click",
      () =>
        guessLetter(
          letter,
          button
        )
    );


    keyboard.appendChild(
      button
    );
  }
}


/* ==========================================
   GUESS LETTER
========================================== */

function guessLetter(
  letter,
  button
) {

  if (gameOver)
    return;


  if (
    guessedLetters.includes(letter) ||
    revealedIndexes.some(
      index =>
        currentWord[index] === letter
    )
  ) {

    return;
  }


  guessedLetters.push(letter);


  attempts++;


  $("attempts").textContent =
    attempts;


  button.classList.add(
    "used"
  );


  if (
    currentWord.includes(letter)
  ) {

    button.classList.add(
      "correct"
    );


    showMessage(
      "✅ Correct letter! Keep going!",
      "success"
    );


    addHistory(
      "✓ " + letter
    );


    updateWord();


    checkComplete();


  } else {

    button.classList.add(
      "wrong"
    );


    lives--;


    updateLives();


    addHistory(
      "✕ " + letter
    );


    showMessage(
      "❌ Wrong letter! Try another one.",
      "error"
    );


    if (lives <= 0) {

      finishGame(
        false,
        "The word was: " +
        currentWord
      );

      return;
    }
  }
}


/* ==========================================
   GUESS WHOLE WORD
========================================== */

$("guessBtn").addEventListener(
  "click",
  guessWholeWord
);


$("guessInput").addEventListener(
  "keydown",
  e => {

    if (e.key === "Enter") {
      guessWholeWord();
    }

  }
);


function guessWholeWord() {

  if (gameOver)
    return;


  const guess =
    $("guessInput")
      .value
      .trim()
      .toUpperCase();


  if (!guess) {

    showMessage(
      "⚠️ Type the word!",
      "error"
    );

    return;
  }


  if (
    !/^[A-Z]+$/.test(guess)
  ) {

    showMessage(
      "⚠️ Use English letters only!",
      "error"
    );

    return;
  }


  attempts++;


  $("attempts").textContent =
    attempts;


  addHistory(
    guess
  );


  if (
    guess === currentWord
  ) {

    revealedIndexes =
      Array.from(
        {
          length:
            currentWord.length
        },
        (_, i) => i
      );


    updateWord();


    score =
      calculateScore();


    $("score").textContent =
      score;


    finishGame(
      true,
      "🎉 Correct! The word is " +
      currentWord
    );


  } else {

    lives--;


    updateLives();


    showMessage(
      "❌ Not correct. Try again!",
      "error"
    );


    $("guessInput").value =
      "";


    if (lives <= 0) {

      finishGame(
        false,
        "The word was: " +
        currentWord
      );
    }
  }
}


/* ==========================================
   CHECK COMPLETE
========================================== */

function checkComplete() {

  const complete =
    currentWord
      .split("")
      .every(
        letter =>
          revealedIndexes.includes(
            currentWord.indexOf(letter)
          ) ||
          guessedLetters.includes(letter)
      );


  /*
    Yana aniq tekshirish:
    har bir pozitsiya ochilganmi?
  */

  const allVisible =
    currentWord
      .split("")
      .every(
        (letter, index) =>
          revealedIndexes.includes(index) ||
          guessedLetters.includes(letter)
      );


  if (!allVisible)
    return;


  score =
    calculateScore();


  $("score").textContent =
    score;


  finishGame(
    true,
    "🎉 You discovered the word: " +
    currentWord
  );
}


/* ==========================================
   SCORE
========================================== */

function calculateScore() {

  const lengthBonus =
    currentWord.length * 100;


  /*
    Kam urinish = katta bonus
  */

  const attemptBonus =
    Math.max(
      100,
      1100 -
      attempts * 80
    );


  const timeBonus =
    timeLeft * 10;


  const lifeBonus =
    lives * 100;


  return Math.max(
    100,
    lengthBonus +
    attemptBonus +
    timeBonus +
    lifeBonus
  );
}


/* ==========================================
   LIVES
========================================== */

function updateLives() {

  let hearts = "";


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    hearts +=
      i < lives
        ? "❤️"
        : "🖤";
  }


  $("lives").textContent =
    hearts;
}


/* ==========================================
   MESSAGE
========================================== */

function showMessage(
  text,
  type = ""
) {

  $("message").textContent =
    text;


  $("message").className =
    "message " + type;
}


/* ==========================================
   HISTORY
========================================== */

function addHistory(text) {

  const item =
    document.createElement(
      "span"
    );


  item.textContent =
    text;


  $("history")
    .appendChild(item);
}


/* ==========================================
   TIMER
========================================== */

function startTimer() {

  clearInterval(timer);


  timer =
    setInterval(() => {

      if (gameOver)
        return;


      timeLeft--;


      $("timer").textContent =
        timeLeft;


      updateProgress();


      if (timeLeft <= 0) {

        clearInterval(timer);


        finishGame(
          false,
          "⏰ Time is up! Word: " +
          currentWord
        );
      }

    }, 1000);
}


/* ==========================================
   PROGRESS
========================================== */

function updateProgress() {

  const percentage =
    Math.max(
      0,
      (timeLeft / 60) * 100
    );


  $("timeProgress").style.width =
    percentage + "%";


  if (
    timeLeft <= 10
  ) {

    $("timeProgress")
      .classList.add("danger");

  } else {

    $("timeProgress")
      .classList.remove("danger");
  }
}


/* ==========================================
   FINISH GAME
========================================== */

function finishGame(
  won,
  text
) {

  if (gameOver)
    return;


  gameOver = true;


  clearInterval(timer);


  $("guessInput").disabled =
    true;


  $("guessBtn").disabled =
    true;


  $("resultIcon").textContent =
    won ? "🏆" : "💥";


  $("resultTitle").textContent =
    won
      ? "CONGRATULATIONS!"
      : "GAME OVER";


  $("resultText").textContent =
    text;


  $("finalScore").textContent =
    score;


  $("finalAttempts").textContent =
    attempts;


  $("finalTime").textContent =
    timeLeft;


  const oldRecord =
    Number(
      localStorage.getItem(
        "wordGuessRecord"
      ) || 0
    );


  let record =
    oldRecord;


  if (
    score > oldRecord
  ) {

    record =
      score;


    localStorage.setItem(
      "wordGuessRecord",
      score
    );
  }


  $("finalRecord").textContent =
    record;


  saveRating(won);


  showScreen(
    screens.result
  );
}


/* ==========================================
   SAVE RATING
========================================== */

function saveRating(won) {

  const board =
    JSON.parse(
      localStorage.getItem(
        "wordGuessRating"
      ) || "[]"
    );


  board.push({

    name:
      playerName,

    score:
      score,

    attempts:
      attempts,

    time:
      timeLeft,

    word:
      currentWord,

    won:
      won,

    date:
      new Date()
        .toLocaleDateString("en-US")

  });


  board.sort(
    (a, b) =>
      b.score - a.score
  );


  localStorage.setItem(
    "wordGuessRating",
    JSON.stringify(
      board.slice(0, 50)
    )
  );
}


/* ==========================================
   LEADERBOARD
========================================== */

function renderRating() {

  const board =
    JSON.parse(
      localStorage.getItem(
        "wordGuessRating"
      ) || "[]"
    );


  const container =
    $("leaderboard");


  container.innerHTML =
    "";


  if (
    board.length === 0
  ) {

    container.innerHTML = `
      <div class="rank">
        <span class="rank-name">
          No scores yet.
        </span>
      </div>
    `;

    return;
  }


  board
    .slice(0, 20)
    .forEach(
      (item, index) => {

        const row =
          document.createElement(
            "div"
          );


        row.className =
          "rank";


        let medal;


        if (index === 0)
          medal = "🥇";

        else if (index === 1)
          medal = "🥈";

        else if (index === 2)
          medal = "🥉";

        else
          medal = index + 1;


        row.innerHTML = `

          <span class="rank-number">
            ${medal}
          </span>

          <span class="rank-name">

            ${escapeHTML(item.name)}

            <small
              style="
                display:block;
                color:#707895;
                font-size:10px;
                margin-top:3px;
              "
            >
              ${item.attempts} tries
            </small>

          </span>

          <span class="rank-score">
            ${item.score}
          </span>

        `;


        container.appendChild(
          row
        );
      }
    );
}


/* ==========================================
   NAVIGATION
========================================== */

$("againBtn").addEventListener(
  "click",
  () => {

    resetGame();

    showScreen(
      screens.game
    );

    startTimer();
  }
);


$("homeBtn").addEventListener(
  "click",
  () => {

    clearInterval(timer);

    showScreen(
      screens.start
    );
  }
);


$("backBtn").addEventListener(
  "click",
  () => {

    clearInterval(timer);

    showScreen(
      screens.start
    );
  }
);


$("ratingBtn").addEventListener(
  "click",
  () => {

    renderRating();

    showScreen(
      screens.rating
    );
  }
);


$("ratingBack").addEventListener(
  "click",
  () => {

    showScreen(
      screens.game
    );
  }
);


/* ==========================================
   CLEAR LEADERBOARD
========================================== */

$("clearRating").addEventListener(
  "click",
  () => {

    if (
      confirm(
        "Clear all leaderboard scores?"
      )
    ) {

      localStorage.removeItem(
        "wordGuessRating"
      );


      renderRating();
    }
  }
);


/* ==========================================
   SAFE HTML
========================================== */

function escapeHTML(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}


/* ==========================================
   LOAD SAVED PLAYER
========================================== */

const savedPlayer =
  localStorage.getItem(
    "wordGuessPlayer"
  );


if (savedPlayer) {

  $("playerName").value =
    savedPlayer;
}


/* ==========================================
   LOAD RECORD
========================================== */

const savedRecord =
  localStorage.getItem(
    "wordGuessRecord"
  ) || 0;


$("startRecord").textContent =
  savedRecord;

