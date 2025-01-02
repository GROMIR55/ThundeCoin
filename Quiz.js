const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const answersElement = document.querySelector(".answers");
const questionsElement = document.getElementById("questions");
const questionNodes = questionsElement.querySelectorAll(".question-data");
const scoreElement = document.getElementById("score");
const endPicElement = document.getElementById("endPic");

let currentQuestionIndex = 0;
let timeLeft = 10;
let timer;
let score = 0;


const questions = Array.from(questionNodes).map((questionNode) => ({
    question: questionNode.dataset.question,
    image: questionNode.dataset.image,
    answers: Array.from(questionNode.children).map((answerNode) => ({
        text: answerNode.dataset.answer,
        correct: answerNode.dataset.correct === "true",
    })),
}));


function playSound(soundFile) {
    var audioPlayer = document.getElementById("sound-player");
    audioPlayer.src = soundFile;
    audioPlayer.play();
}

const questionImageElement = document.getElementById("question-image");

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    questionElement.textContent = questionData.question;

    questionImageElement.src = questionData.image;
    questionImageElement.alt = `Изображение для вопроса ${currentQuestionIndex + 1}`;

    answersElement.innerHTML = "";

    questionData.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.className = "answer-button";
        button.onclick = () => handleAnswer(answer.correct, button);
        answersElement.appendChild(button);
    });

    resetTimer();
}


function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = `Осталось времени: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft -= 1;
        timerElement.textContent = `Осталось времени: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(false);
        }
    }, 1000);
}

function handleAnswer(isCorrect, button = null) {
    clearInterval(timer);

    if (button) {
        if (isCorrect) {
            button.classList.add("correct");
            button.style.color = "white";
            score += 10;
            playSound('/Sounds/polskaya-korova.mp3');
        } else {
            button.classList.add("incorrect");
            button.style.color = "white";
            playSound('/Sounds/puk.mp3');
        }
    } else {
        playSound('/Sounds/puk.mp3');
    }

    scoreElement.textContent = `Счёт: ${score}`;

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}


function endQuiz() {
    questionElement.textContent = "Квиз завершён!";
    answersElement.innerHTML = "";
    timerElement.textContent = "";
    questionImageElement.src = endPicElement.textContent;
    scoreElement.textContent = `Ваш финальный счёт: ${score}`;
    playSound('/Sounds/polskaya-korova.mp3');
}

loadQuestion();
