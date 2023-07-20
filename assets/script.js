// Define all variables to point to HTML ID's
let startContainer = $('#starter-container');
let questionContainer = $('#question-container');
let endContainer = $('#end-container');
let highScoreContainer = $('#high-score-container');
let scoreContainer = $('#score-banner');
let correctEl = $('#correct')
let wrongEl = $('#wrong')


// Define all variables to point to the buttons of start quiz, go back, and clear high scores
let startBtn = $('#start-game');
let goBackBtn = $('#go-back');
let clearHighScoreBtn = $('#clear-high-scores');




// Define variables to point to questions, answers, timer
let questionsEl = $('#question');
let answersEl = $('#answer-buttons')


// Define base starting variables like score, time left, game over state
let timerEl = $('#timer');
let score = 0;
timerEl.text('0');
let gameover="";
let timeLeft;


// Variables associated with highscores and define an array to store high scores
let viewHighScoreEl = $('#view-high-scores')
let listHighScoreEl = $('#high-score-list')
let initialsFormEl = $('#initials-form')
let highScores = [];
let submitScoreEl = $('#submit-score')

// We will be using an array to shuffle questions
let arrayShuffleQuestions = [];
let initQuestionIndex = 0;

// These are the variables associated with the GitHub API functionality
let usernameField = $('#username-input')
let passEl = $('#passed')
let failEl = $('#failed')
const collaboratorLogins = [];

// JokeAPI Variables
let hintButton = $("#hint-button");
let hintElement = $("#hint");


// ------------------------------------------------------------------------------------------------------------
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
let quizStartTime = function() {
  timeLeft = 60;



let timerCountDown = setInterval(function () {
  timerEl.text(timeLeft);
  timeLeft--;

  if(gameover) {
  clearInterval(timerCountDown)

  }

  if (timeLeft<0) {
    showScore()
    timerEl.text('0')
    clearInterval(timerCountDown)


  }

},1000)
}

// create function to start the game

let startGame = function() {
  startContainer.addClass('hide');
  startContainer.removeClass('show');
  questionContainer.addClass('show');
  questionContainer.removeClass('hide');
  arrayShuffleQuestions = questions.sort(() => Math.random()-0.5);
  quizStartTime()
  setQuestions()

}

let resetAnswers = function() {
  while (answersEl.children().length > 0) {
    answersEl.children().remove();

  }

}



// function to hide other containers and show the questions container
let displayQuestions = function(index) {
  questionsEl.text(index.q);
  for (let i=0;i<index.choices.length;i++) {
    let answerBtn = $('<button></button>');
    answerBtn.text(index.choices[i].choice);
    answerBtn.addClass('btn');
    answerBtn.addClass('answerbtn');
    answerBtn.on('click',answerCheck)
    answersEl.append(answerBtn);


  }


}

let setQuestions = function() {
  resetAnswers()
  displayQuestions(arrayShuffleQuestions[initQuestionIndex])

}

// display for if question is right or wrong

let answerCorrect = function() {
  correctEl.addClass('banner');
  correctEl.removeClass('hide');
  wrongEl.removeClass('banner');
  wrongEl.addClass('show');


}

let answerWrong = function() {
  wrongEl.addClass('banner');
  wrongEl.removeClass('hide');
  correctEl.addClass('hide');
  correctEl.removeClass('banner');
}

// function checks if the selected answer matches the answer in the shuffled questions object
let answerCheck = function(event) {
  let selectedanswer=event.target;
  if (arrayShuffleQuestions[initQuestionIndex].a===$(selectedanswer).text()){
    answerCorrect();
    score = score + 10;
  }
  else {
    answerWrong();
    score = score - 3;
    timeLeft = timeLeft - 5;
  }

  initQuestionIndex++
  if (initQuestionIndex < arrayShuffleQuestions.length ) {
    setQuestions();
  }

  else {
    gameover = "true";
    showScore();
  }


}

// function shows the score by hiding other containers
let showScore = function (){
  questionContainer.addClass('hide');
  questionContainer.removeClass('show');
  endContainer.addClass('show');
  endContainer.removeClass('hide');
  wrongEl.addClass('hide');
  wrongEl.removeClass('banner');
  correctEl.addClass('hide');
  correctEl.removeClass('banner');

  let displayScore = $('<p></p>');
  displayScore.text('Your score is ' + score + "!")
  $('#score-banner').append(displayScore)

}
// functions below create the high scores and save to local storage, allowing them to be loaded upon page reload
// let createHighScore = function(event) {
//   event.preventDefault();
//   let initials = $("#initials").val();
//   if (!initials) {
//     alert("Enter your initials!");
//     return;
//   }

//   initialsFormEl[0].reset();

//   let HighScore = {
//     initials: initials,
//     score: score
//   };

//   // Push and sort scores
//   highScores.push(HighScore);
//   highScores.sort((a, b) => {
//     return b.score - a.score;
//   });

//   // Clear visible list to resort
//   listHighScoreEl.empty();

//   // Create elements in order of high scores
//   for (var i = 0; i < highScores.length; i++) {
//     var highscoreEl = $("<li>").addClass("high-score");
//     highscoreEl.html(highScores[i].initials + " - " + highScores[i].score);
//     listHighScoreEl.append(highscoreEl);
//   }

//   saveHighScore();
//   displayHighScores();
// };


// let saveHighScore = function(){
//   localStorage.setItem("highScore", JSON.stringify(highScores))


// }

// let loadHighScore = function() {
//   let loadedHighScore = localStorage.getItem('highScore')
//   if (!loadedHighScore) {
//     return false;
//   }

//   loadedHighScore = JSON.parse(loadedHighScore)
//   loadedHighScore.sort(function(a, b) {
//     return b.score - a.score;
//   });

//   highScores = loadedHighScore

//   for (let i=0; i< highScores.length;i++) {
//     let highScoreEl = $('<li></li>')
//     highScoreEl.addClass('high-score')
//     highScoreEl.text(highScores[i].initials + " - " + highScores[i].score)
//     listHighScoreEl.append(highScoreEl)
//   }


// }

let displayHighScores = function() {
  highScoreContainer.addClass('show');
  highScoreContainer.removeClass('hide');
  gameover = "true"

  if (endContainer.hasClass('show')) {
    endContainer.removeClass('show').addClass('hide');
  }
  
  if (startContainer.hasClass('show')) {
    startContainer.removeClass('show').addClass('hide');
  }
  
  if (questionContainer.hasClass('show')) {
    questionContainer.removeClass('show').addClass('hide');
  }
  
  if (correctEl.hasClass('show')) {
    correctEl.removeClass('show').addClass('hide');
  }
  
  if (wrongEl.hasClass('show')) {
    wrongEl.removeClass('show').addClass('hide');
  }


}
// clears the scores both on the page and in local storage
// let clearScores = function() {
//   highScores= [];

//   listHighScoreEl.empty();
//   saveHighScore();

//   }



// resets the page back to the initial start
let resetToStart = function() {
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



}

// loads the stored high scores and holds all the event listeners for the buttons
// loadHighScore()
startBtn.on("click", startGame);
submitScoreEl.on('click',createHighScore)
viewHighScoreEl.on('click',displayHighScores)
goBackBtn.on('click',resetToStart)
clearHighScoreBtn.on('click',clearScores)






// ------------------------------------------------------------------------------------------------------------
// This part of the code pulls the collaborators from the Github repository this will be used to compare against the entered
// Github username to determine if they pass or not

const token = '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'
gitHubURL = "https://api.github.com/repos/BaBread/RealWinners/collaborators"

$.ajax({
    url: gitHubURL,
    method: "GET",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }
  })
  .done(function(collaborators) {
    // Extract the login names of the collaborators and store in the array
    collaborators.forEach(function(collaborator) {
      collaboratorLogins.push(collaborator.login);
    });
    
    // Display the list of collaborators
    console.log("Collaborators:", collaboratorLogins);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.error("Error fetching collaborators from GitHub API:", errorThrown);
  });


  let checkCollaborator = function() { 
    let isMatch = collaboratorLogins.includes(usernameField.val());

    if (isMatch) {
        passEl.addClass('show')
        passEl.removeClass('hide')
        failEl.addClass('hide')
        failEl.removeClass('show')

    }

    else {
        passEl.addClass('hide')
        passEl.removeClass('show')
        failEl.addClass('show')
        failEl.removeClass('hide')

    }



  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // This part of the code pulls the JokeAPI 

$(document).ready(function() {
    
  
    // function that handles the click event
    function handleClick() {
      // ajax request to the jokes api with safemode enabled for sfw jokes
      $.ajax({
        url: "https://v2.jokeapi.dev/joke/Misc,Programming?format=xml&safe-mode&type=single",
        method: "GET",
        success: function(response) {
          hintElement.text(response.joke);
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
          hintElement.text("Failed to fetch joke from the API.");
        }
      });
    }
  
    // adds event listener for the click event on the hint button
    hintButton.on("click", handleClick);
  });

