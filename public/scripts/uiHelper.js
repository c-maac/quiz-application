const UI = {
  context: {
    question: undefined,
    getChoices: () => document.getElementsByClassName('choice'),
  },

  setupUi: (getQuestion, startCompetition, endCompetition) => {
    UI.context.question = document.getElementById('question');
    document.getElementById('button-competition').addEventListener('click', UI.openCompetitionModal);
    document.getElementById('button-custom-name').addEventListener('click', UI.populateNameFields);
    document.getElementById('button-next').addEventListener('click', getQuestion);
    document.getElementById('button-start').addEventListener('click', startCompetition);
    document.getElementById('button-end').addEventListener('click', endCompetition);
    document.getElementById('button-close-modal').addEventListener('click', UI.cleanModalData);
    document.getElementById('button-close-scoreboard').addEventListener('click', UI.closeScoreBoardModal);
  },

  setupQuestion: (question, answers, onSelected, playerName) => {
    // make all answers clickable
    document.body.classList.remove('answer-locked');

    // set question text
    UI.context.question.innerHTML = question;

    const choiceContainer = document.getElementById('box');
    choiceContainer.replaceChildren();

    // create child element for each choice
    for (let i = 0; i < answers.length; i += 1) {
      const element = document.createElement('div');
      element.className = 'choice';
      element.innerHTML = answers[i];
      element.addEventListener('click', () => {
        element.classList.add('selected');
        onSelected(i);
      });
      choiceContainer.appendChild(element);
    }

    if (playerName) document.getElementById('current-player').innerHTML = playerName;
  },

  lockAnswer: (correct) => {
    document.body.classList.add('answer-locked');
    UI.context.getChoices()[correct].classList.add('correct');
  },

  openCompetitionModal: () => {
    document.body.classList.add('setup-competition');
  },

  cleanModalData: () => {
    document.body.classList.remove('setup-competition');

    document.getElementById('player-count').disabled = false;
    document.getElementById('player-count').value = 2;
    document.getElementById('counter').value = 15;
    const rows = document.getElementsByClassName('player-row');
    while (rows.length) rows[0].parentElement.removeChild(rows[0]);
  },

  startCompetition: () => {
    document.body.classList.remove('setup-competition');
    document.body.classList.add('competition-active');

    const playerElements = document.getElementsByClassName('player-name') || [];
    const playerCount = document.getElementById('player-count').value;
    const timer = document.getElementById('counter').value;
    const playerNames = [];

    for (let i = 0; i < playerCount; i += 1) {
      const player = playerElements.item(i)?.value || `Player ${i + 1}`;
      playerNames.push(player);
    }

    return {
      playerCount, playerNames, timer,
    };
  },

  populateNameFields: () => {
    const numberOfPlayers = document.getElementById('player-count').value;
    const table = document.getElementById('modal-table');
    const rowCount = table.rows.length;

    if (!numberOfPlayers || numberOfPlayers < 2 || numberOfPlayers > 5) {
      alert('Player count should be between 2 and 5');
      return;
    }
    // if name fields are already populated then return
    if (rowCount > 4) return;

    document.getElementById('player-count').disabled = true;

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
  },

  populateScoreBoard: (_scoreBoard) => {
    const containerDiv = document.getElementById('scoreboard');
    const finalScores = _scoreBoard.reduce(
      (val, { player, isAnswerCorrect: correct }) => ({
        ...val,
        [player]: (val[player] ?? 0) + correct,
      }),
      {},
    );

    for (const [player, result] of Object.entries(finalScores)) {
      const h2Element = document.createElement('h2');
      const h1Element = document.createElement('h1');
      const div = document.createElement('div');
      div.classList.add('score');
      h2Element.innerText = result;
      h1Element.innerText = player;

      div.appendChild(h1Element);
      div.appendChild(h2Element);
      containerDiv.appendChild(div);
    }
  },

  closeScoreBoardModal: () => {
    const d = document.getElementsByClassName('score');
    while (d.length) d[0].parentElement.removeChild(d[0]);

    document.body.classList.remove('celebrate');
  },
};
