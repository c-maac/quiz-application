console.log("script.js loaded")

getQuestions()

async function getQuestions() {
    const response = await fetch('/questions')
    const data = await response.json(response);
    console.log(data)
}