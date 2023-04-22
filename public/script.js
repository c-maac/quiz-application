let correctIndex;
let numberOfPlayers;
let populateNameFieldsFlag = false;
let competitionStarted = false;
let numberOfQuestionsAsked = 0;
const playerNames = [];

// event listeners for answers
function addEventListeners() {
  [...document.getElementsByClassName('choice')].forEach((el, i) => {
    el.addEventListener('click', () => {
      const correctElement = document.getElementsByClassName('choice')[correctIndex];
      correctElement.style.backgroundColor = 'green';
      correctElement.style.color = 'white';
      correctElement.style.borderColor = 'green';

      if (i !== correctIndex) {
        const selectedElement = document.getElementsByClassName('choice')[i];
        selectedElement.style.backgroundColor = 'red';
        selectedElement.style.color = 'white';
        selectedElement.style.borderColor = 'red';
      }
      // make all answers unclickable to prevent re-choose
      document.getElementById('container').style.pointerEvents = 'none';
    });
  });
}

function updateCompetitionBoard() {
  document.getElementById('current-player').innerHTML = playerNames[numberOfQuestionsAsked % numberOfPlayers];
  numberOfQuestionsAsked += 1;
}

async function getQuestion() {
  const response = await fetch('/questions');
  const data = await response.json();
  const choiceCount = data.results[0].incorrect_answers.length + 1;
  const correctAnswer = data.results[0].correct_answer;

  // make all answers clickable
  document.getElementById('container').style.pointerEvents = 'auto';

  // generate a random number which will be the index of the correct answer
  correctIndex = Math.floor(Math.random() * (choiceCount));

  // create an array that contains all choices
  const choices = data.results[0].incorrect_answers.slice();
  choices.splice(correctIndex, 0, correctAnswer);

  const elements = [];
  // create child element for each choice
  for (let i = 0; i < choiceCount; i += 1) {
    const element = document.createElement('div');
    element.className = 'choice';
    element.innerHTML = choices[i];
    elements.push(element);
  }

  // replace all children from box
  const choiceContainer = document.getElementById('box');
  choiceContainer.replaceChildren(...elements);

  // set question text
  document.getElementById('question').innerHTML = data.results[0].question;

  addEventListeners();

  if (competitionStarted) updateCompetitionBoard();
}

function openModal() {
  const modal = document.getElementsByClassName('modal-container').item(0);
  modal.style.display = 'block';
}

function populateNameFields() {
  // do not re-populate player name fields
  if (populateNameFieldsFlag) return;
  populateNameFieldsFlag = !populateNameFieldsFlag;

  const table = document.getElementById('modal-table');
  const rowCount = table.rows.length;
  numberOfPlayers = document.getElementById('player-count').value;

  for (let i = numberOfPlayers; i > 0; i -= 1) {
    const row = table.insertRow(rowCount - 1);
    row.className = 'player-row';

    const cell1 = row.insertCell(0);
    const element1 = document.createTextNode(`Player ${i}`);
    cell1.appendChild(element1);

    const cell2 = row.insertCell(1);
    const element2 = document.createElement('input');
    element2.setAttribute('type', 'text');
    element2.className = 'player-name';
    cell2.appendChild(element2);
  }
}

function startCompetition() {
  const players = document.getElementsByClassName('player-name');
  competitionStarted = true;

  for (let i = 0; i < numberOfPlayers; i += 1) {
    const player = players.item(i).value || `Player ${i + 1}`;
    playerNames.push(player);
  }

  document.getElementsByClassName('modal-container').item(0).style.display = 'none';
  document.getElementById('button-competition').style.display = 'none';
  document.getElementById('competition-box').style.display = 'flex';

  // to start display the next question
  getQuestion();
}

window.onload = () => {
  getQuestion();
  document.getElementById('button-next').addEventListener('click', () => getQuestion());
  document.getElementById('button-competition').addEventListener('click', () => openModal());
  document.getElementById('button-custom-name').addEventListener('click', () => populateNameFields());
  document.getElementById('button-start').addEventListener('click', () => startCompetition());
};
