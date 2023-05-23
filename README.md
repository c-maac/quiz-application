## Quiz Application
Quiz application is an interactive platform that offers engaging trivia questions for users to test their knowledge and compete with others.

## Features
**Battle Mode:** Users can engage in multiplayer quizzes on the same computer, enabling them to compete with each other in person.

**Score Tracking:** The application keeps track of each player's score, providing instant feedback.

**Customization Options:** Users have the ability to customize the quiz experience by setting the time limit for each question and entering player names.

## Built with

- [Node.js](https://nodejs.org)
- [Open Trivia Database API](https://opentdb.com/api_config.php)

## Installation

1. Ensure that you have Node.js installed on your machine. You can download and install the latest version of Node.js from the [official website](https://nodejs.org)
2. Clone the repository to your local machine and navigate to the project's directory
```
git clone https://github.com/c-maac/quiz-application.git

cd quiz-application
```
4. Install project dependencies
```
npm install
```
5. Once the installation is complete, you can start the application by running the following command
```
npm start
```
6. Instead of 'npm start', you can use nodemon for automatic server restarts during development
```
npm run dev
```

7. The application runs on port 3000 by default. If you want to use a different port, you can modify the configuration in the code or specify the desired port when starting the application
```
npm start --port <desired-port>
```
