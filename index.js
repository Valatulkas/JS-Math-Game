
$(document).ready(function () {
  var currentQuestion;
  var score = 0;
  var timeRemaining = 10;
  var countDown;

  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var updateTimeRemaining = function (amount) {
    timeRemaining += amount;
    $('#time-left').text(timeRemaining);
  }

  var startGame = function () {
    if (!countDown) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      countDown = setInterval(function () {
        updateTimeRemaining(-1);
        if (timeRemaining === 0) {
          clearInterval(countDown);
          countDown = undefined;
        }
      }, 1000);
    }
  }

  var randomNum = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var numOne = randomNum(10);
    var numTwo = randomNum(10);

    question.answer = numOne + numTwo;
    question.equation = String(numOne) + '+' + String(numTwo);

    return question;
  }

  var createNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      createNewQuestion();
      $('#user-input').val('');
      updateTimeRemaining(+1);
      updateScore(+1);
    }
  }

  $('#userInput').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  })

  createNewQuestion();  

});
