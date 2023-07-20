// Define all variables to point to HTML ID's
let startContainer = $('#starter-container');
let questionContainer = $('#question-container');
let endContainer = $('#end-container');
let highScoreContainer = $('#high-score-container');
let scoreContainer = $('#score-banner');
let correctEl = $('#correct');
let wrongEl = $('#wrong');


// Define all variables to point to the buttons of start quiz, go back, and clear high scores
let startBtn = $('#start-game');
let goBackBtn = $('#go-back');
let clearHighScoreBtn = $('#clear-high-scores');


// Define variables to point to questions, answers, timer
let questionsEl = $('#question');
let answersEl = $('#answer-buttons');


// Define base starting variables like score, time left, game over state
let timerEl = $('#timer');
let score = 0;
timerEl.text('0');
let gameover = "";
let timeLeft;


// Variables associated with highscores and define an array to store high scores
let viewHighScoreEl = $('#view-high-scores');
let listHighScoreEl = $('#high-score-list');
let initialsFormEl = $('#initials-form');
let highScores = [];
let submitScoreEl = $('#submit-score');


// We will be using an array to shuffle questions
let arrayShuffleQuestions = [];
let initQuestionIndex = 0;


// These are the variables associated with the GitHub API functionality
let usernameField = $('#username-input');
let passEl = $('#passed');
let failEl = $('#failed');
const collaboratorLogins = [];


// JokeAPI Variables
let hintButton = $('#hint-button');
let hintElement = $('#hint');


// ---------------------------------------------------------------------------------------------------------------------------------------------------
// This section contains the code and functions for the base quiz functionality
// The questions will be stored in an array with each index holding the object of question, answer, and choices
let questions = [
  {
    q: 'Where does the President of the United States live while in office?',
    a: 'B. The White House',
    choices: [
      { choice: 'A. Trump Tower' },
      { choice: 'B. The White House' },
      { choice: 'C. The Capitol Building' },
      { choice: 'D. The Naval Observatory' }
    ]
  },
  {
    q: 'How many days are in a year usually?',
    a: 'C. 365',
    choices: [
      { choice: 'A. 366' },
      { choice: 'B. 364' },
      { choice: 'C. 365' },
      { choice: 'D. 363' }
    ]
  },
  {
    q: 'Who is Batman`s crime-fighting partner?',
    a: 'A. Robin',
    choices: [
      { choice: 'A. Robin' },
      { choice: 'B. Batgirl' },
      { choice: 'C. Alfred' },
      { choice: 'D. Nightwing' }
    ]
  },
  {
    q: 'How many planets are in our solar system?',
    a: 'A. 8',
    choices: [
      { choice: 'A. 8' },
      { choice: 'B. 9' },
      { choice: 'C. 7' },
      { choice: 'D. 10' }
    ]
  },
  {
    q: 'What is the largest mammal in the world?',
    a: 'D. Blue Whale',
    choices: [
      { choice: 'A. African Elephant' },
      { choice: 'B. Polar Bear' },
      { choice: 'C. Giraffe' },
      { choice: 'D. Blue Whale' }
    ]
  },
  {
    q: 'How many continents are there in the world?',
    a: 'C. 7',
    choices: [
      { choice: 'A. 5' },
      { choice: 'B. 6' },
      { choice: 'C. 7' },
      { choice: 'D. 8' }
    ]
  },
  {
    q: 'What is the largest organ of the human body?',
    a: 'D. Skin',
    choices: [
      { choice: 'A. Brain' },
      { choice: 'B. Heart' },
      { choice: 'C. Liver' },
      { choice: 'D. Skin' }
    ]
  },
  {
    q: 'How many months have 28 days?',
    a: 'C. 12',
    choices: [
      { choice: 'A. 1' },
      { choice: 'B. 6' },
      { choice: 'C. 12' },
      { choice: 'D. 0' }
    ]
  },
  {
    q: '(True or False: On average, at least 1 person is killed by a drunk driver in the United States every hour.',
    a: 'True',
    choices: [
      { choice: 'A. True' },
      { choice: 'B. False' }
    ]
  },
  {
    q: 'Name 3 Countries Fast!',
    a: '',
    isWrittenResponse: true
  }
];


// Set timer function for quiz
let quizStartTime = function () {
  timeLeft = 60;


  let timerCountDown = setInterval(function () {
    timerEl.text(timeLeft);
    timeLeft--;


    if (gameover) {
      clearInterval(timerCountDown);
    }


    if (timeLeft < 0) {
      showScore();
      timerEl.text('0');
      clearInterval(timerCountDown);
    }


    if (!arrayShuffleQuestions[initQuestionIndex].isWrittenResponse) {
      initQuestionIndex++;
      if (initQuestionIndex < arrayShuffleQuestions.length) {
        setQuestions();
      } else {
        gameover = "true";
        showScore();
      }
    }


    // Check if the current question is the country question and adjust the timer accordingly
    if (arrayShuffleQuestions[initQuestionIndex].isWrittenResponse && timeLeft <= 10) {
      timerEl.text('10');
    }
  }, 1000);
};


// Function checks if the selected answer matches the answer in the shuffled questions object
let answerCheck = function (event) {
  let selectedanswer = event.target;
  if (arrayShuffleQuestions[initQuestionIndex].a === $(selectedanswer).text()) {
    answerCorrect();
    score = score + 10;
  } else {
    answerWrong();
    score = score - 3;
    timeLeft = timeLeft - 5;
  }


  if (!arrayShuffleQuestions[initQuestionIndex].isWrittenResponse) {
    initQuestionIndex++;
    if (initQuestionIndex < arrayShuffleQuestions.length) {
      setQuestions();
    } else {
      gameover = "true";
      showScore();
    }
  }
};


// Create function to start the game
let startGame = function () {
  startContainer.addClass('hide');
  startContainer.removeClass('show');
  questionContainer.addClass('show');
  questionContainer.removeClass('hide');
  arrayShuffleQuestions = questions.sort(() => Math.random() - 0.5);
  quizStartTime();
  setQuestions();
};


let resetAnswers = function () {
  answersEl.empty();
};


// Function to hide other containers and show the questions container
let displayQuestions = function (index) {
  questionsEl.text(index.q);


  if (index.isWrittenResponse) {
    let answerInput = $('<input>');
    answerInput.attr('type', 'text');
    answerInput.attr('id', 'country-answer');
    answersEl.append(answerInput);
  } else {
    for (let i = 0; i < index.choices.length; i++) {
      let answerBtn = $('<button></button>');
      answerBtn.text(index.choices[i].choice);
      answerBtn.addClass('btn');
      answerBtn.addClass('answerbtn');
      answerBtn.on('click', answerCheck);
      answersEl.append(answerBtn);
    }
  }
};


let setQuestions = function () {
  resetAnswers();
  displayQuestions(arrayShuffleQuestions[initQuestionIndex]);
};


// Display for if question is right or wrong
let answerCorrect = function () {
  correctEl.addClass('banner');
  correctEl.removeClass('hide');
  wrongEl.removeClass('banner');
  wrongEl.addClass('show');
};


let answerWrong = function () {
  wrongEl.addClass('banner');
  wrongEl.removeClass('hide');
  correctEl.addClass('hide');
  correctEl.removeClass('banner');
};


// Function shows the score by hiding other containers
let showScore = function () {
  questionContainer.addClass('hide');
  questionContainer.removeClass('show');
  endContainer.addClass('show');
  endContainer.removeClass('hide');
  wrongEl.addClass('hide');
  wrongEl.removeClass('banner');
  correctEl.addClass('hide');
  correctEl.removeClass('banner');


  let displayScore = $('<p></p>');
  displayScore.text('Your score is ' + score + '!');
  $('#score-banner').append(displayScore);
};


let resetToStart = function () {
  startContainer.addClass('show').removeClass('hide');
  highScoreContainer.addClass('hide').removeClass('show');
  questionContainer.addClass('hide').removeClass('show');
  endContainer.addClass('hide').removeClass('show');
  scoreContainer.addClass('hide').removeClass('show');
  correctEl.addClass('hide').removeClass('show');
  wrongEl.addClass('hide').removeClass('show');
  gameover = "";
  timerEl.text('0');
  score = 0;
};


startBtn.on('click', startGame);
goBackBtn.on('click', resetToStart);

