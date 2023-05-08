const API = {
   getQuestion: () => fetch('/questions')
  .then((res) => res.json())
  .then((data) => data.results[0])
  .then(({ question, correct_answer: answer, incorrect_answers: incorrectAnswers }) => ({
    choiceCount: incorrectAnswers.length + 1,
    question,
    incorrectAnswers,
    answer,
  }))
};

