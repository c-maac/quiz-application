let correctAnswer;
let correctIndex;

async function getQuestions() {
  const response = await fetch('/questions');
  const data = await response.json();
  const choiceCount = data.results[0].incorrect_answers.length + 1;
  correctAnswer = data.results[0].correct_answer;

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

  // eslint-disable-next-line no-use-before-define
  addEventListeners();
}

function addEventListeners() {
  [...document.getElementsByClassName('choice')].forEach((el, i) => {
    el.addEventListener('click', () => {
      if (i === correctIndex) {
        alert('true!');
      } else {
        alert(`false correct answer is ${correctAnswer}`);
      }

      getQuestions();
    });
  });
}

window.onload = () => {
  getQuestions();
};
