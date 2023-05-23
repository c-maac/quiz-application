// eslint-disable-next-line no-unused-vars
const API = {
  getQuestion: () => fetch('/questions')
    .then((res) => res.json())
    .then((data) => {
      if (data.response_code !== 0) console.error('Unable to fetch question');
      return data.results[0];
    })
    .then(({ question, correct_answer: answer, incorrect_answers: incorrectAnswers }) => ({
      choiceCount: incorrectAnswers.length + 1,
      question,
      incorrectAnswers,
      answer,
    })),
};
