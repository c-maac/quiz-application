/* global UI, API */

const UiHelper = UI;
const QuestionApi = API;

/* eslint-disable no-underscore-dangle */
let _correctIndex;
let _numberOfPlayers;
let _timer;
let _currentPlayer;
let _competitionStarted;
let _numberOfQuestionsAsked = 0;
let _interval;
const _playerNames = [];
const _scoreBoard = [];
/* eslint-enable no-underscore-dangle */

function answerSelected(i) {
  UiHelper.lockAnswer(_correctIndex);

  if (_competitionStarted) {
    _scoreBoard.push({ player: _currentPlayer, isAnswerCorrect: i === _correctIndex });
  }
}

async function getQuestion() {
  document.body.classList.add('loading');
  const data = await QuestionApi.getQuestion();
  document.body.classList.remove('loading');

  // generate a random number which will be the index of the correct answer
  _correctIndex = Math.floor(Math.random() * (data.choiceCount));

  // create an array that contains all choices
  const choices = data.incorrectAnswers.slice();
  choices.splice(_correctIndex, 0, data.answer);

  if (_competitionStarted) {
    _currentPlayer = _playerNames[_numberOfQuestionsAsked % _numberOfPlayers];

    const timerElement = document.getElementById('timer');
    let timer = _timer;

    clearInterval(_interval);

    timerElement.innerHTML = timer;

    _interval = setInterval(() => {
      timer -= 1;
      timerElement.innerHTML = timer;
      if (timer < 1) {
        _scoreBoard.push({ player: _currentPlayer, isAnswerCorrect: false });
        document.body.classList.add('loading');
        clearInterval(_interval);
        getQuestion();
      }
    }, 1000);
  }

  UiHelper.setupQuestion(data.question, choices, answerSelected, _currentPlayer);
  _numberOfQuestionsAsked += 1;
}

function startCompetition() {
  const modalData = UiHelper.startCompetition();

  _playerNames.splice(0, _playerNames.length, ...modalData.playerNames);
  _numberOfPlayers = modalData.playerCount;
  _timer = modalData.timer;
  _numberOfQuestionsAsked = 0;
  _scoreBoard.splice(0, _scoreBoard.length);
  _competitionStarted = true;
  // to start, display the next question
  getQuestion().then();
}

function endCompetition() {
  _competitionStarted = false;

  UiHelper.cleanModalData();
  UiHelper.populateScoreBoard(_scoreBoard);
  document.body.classList.remove('competition-active');
  document.body.classList.add('celebrate');
}

window.onload = () => {
  UiHelper.setupUi(getQuestion, startCompetition, endCompetition);
  getQuestion().then();
};
