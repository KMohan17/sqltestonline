const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q. WHERE clause is used to filter ________?",
        choices: ["Rows", "Groups", "Columns", "Tables"],
        answer: "Rows"
    },
    {
        question: "Q. Which of the following is the correct order of clauses in a basic SQL statement?",
        choices: ["Select, Where", " Select, Where, From", "Select, From, Where", "From, Where"],
        answer: "Select, From, Where"
    },
    {
        question: "Q. Which of the following command is used to create a database in SQL?",
        choices: ["CREATE", "MAKE", "DEVELOP", "INSERT"],
        answer: "CREATE"
    },
    {
        question: "Q. To delete a database ___________ command is used",
        choices: ["Delete database database_name", "Delete database_name", "drop database database_name.", "drop database_name"],
        answer: "drop database database_name."
    },
     {
        question: "Q. How many types of constraints are present in SQL?",
        choices: ["4","5","7","6"],
        answer: "7"
    },
    {
        question: "Q.  In SQL, which of the following constraint cannot be applied at the table level?",
        choices: ["UNIQUE","PRIMARY KEY","CHECK","NOT NULL"],
        answer: "NOT NULL"
    },
    {
        question: "Q. What is a relation in RDBMS?",
        choices: ["Key","Table","Row","Data Types"],
        answer: "Table"
    },
    {
        question: "Q.  ________ deletes a data item from a database.",
        choices: ["Insert(RDBMS)","Drop(RDBMS)","Delete(RDBMS)","None of the mentioned"],
        answer: "Delete(RDBMS)"
    },
    {
        question: "Q.  What is the format of entering date into a database while inserting data into it?",
        choices: ["“YYYY-MM-DD”","YYYY-MM-DD","“DD-MM-YYYY”","‘YYYY-MM-DD’"],
        answer: "‘YYYY-MM-DD’"
    },
    {
        question: "Q. Which of the following cannot be used to modify the data in a database?",
        choices: ["delete","update","drop","insert"],
        answer: "drop"
    },
    
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 30;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 30;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this test!");
    nextBtn.textContent = "Start Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the test again");
            if(confirmUser){
                timeLeft = 30;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 30;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});