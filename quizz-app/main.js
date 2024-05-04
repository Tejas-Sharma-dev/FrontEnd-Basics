
const quizData = [
    {
        category: "Science (Easy)",
        question: "What is the hottest planet in our solar system?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: 1, // Index of the answer choice (Venus)
    },
    {
        category: "History (Easy)",
        question: "What was the name of the first artificial satellite launched into space?",
        options: ["Explorer 1", "Sputnik 1", "Apollo 11", "Space Shuttle"],
        answer: 1, // Index of the answer choice (Sputnik 1)
    },
    {
        category: "Geography (Easy)",
        question: "Which is the tallest mountain in the world?",
        options: ["Mount Everest", "Mount Kilimanjaro", "Mount Fuji", "Mount McKinley"],
        answer: 0, // Index of the answer choice (Mount Everest)
    },
    {
        category: "Literature (Easy)",
        question: "Who wrote the famous novel 'Pride and Prejudice'?",
        options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "F. Scott Fitzgerald"],
        answer: 1, // Index of the answer choice (Jane Austen)
    },
    {
        category: "Current Events (Easy)",
        question: "What is the name of the social media platform known for its short-form videos?",
        options: ["YouTube", "Twitter", "TikTok", "Instagram"],
        answer: 2, // Index of the answer choice (TikTok)
    },
    {
        category: "Art (Easy)",
        question: "What is the most famous painting by Leonardo da Vinci?",
        options: ["The Scream", "The Mona Lisa", "The Birth of Venus", "Guernica"],
        answer: 1, // Index of the answer choice (The Mona Lisa)
    },
    {
        category: "Sports (Easy)",
        question: "How many players are on a basketball team on the court at a time?",
        options: [4, 5, 6, 7],
        answer: 1, // Index of the answer choice (5)
    },
    {
        category: "Animals (Easy)",
        question: "What is the national animal of India?",
        options: ["Lion", "Tiger", "Elephant", "Royal Bengal Tiger"],
        answer: 3, // Index of the answer choice (Royal Bengal Tiger)
    },
    {
        category: "Food & Drink (Easy)",
        question: "What is the main ingredient in pizza dough?",
        options: ["Rice", "Flour", "Corn", "Potatoes"],
        answer: 1, // Index of the answer choice (Flour)
    },
    {
        category: "Everyday Knowledge (Easy)",
        question: "What is the symbol for water?",
        options: ["H2O", "CO2", "O2", "N2"],
        answer: 0, // Index of the answer choice (H2O)
    },
];

let score = 0;

let currentQuestion = 0;

// question element 
const QuestionsEle = document.getElementById('Questions');

// option div element
const optionsContainerEle = document.getElementById('Options-Container');

// scoreDiv element
const ScoreDivEle = document.getElementById('ScoreDiv');


function shuffleOptions(options) {
    let noOfOptions = options.length - 1;
    for (let i = noOfOptions; i >= 0; i--) {
        let j = Math.floor(Math.random() * i + 1);
        [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
}


showcaseQuestions();

function showcaseQuestions() {

    const { question, options, answer } = quizData[currentQuestion];

    // updating question 
    QuestionsEle.textContent = question;

    // shuffling the options
    const shuffledOptions = shuffleOptions([...options]);

    // event listener for the options
    shuffledOptions.forEach((val) => {
        let optionELe = document.createElement('button');
        optionELe.className = 'option';
        optionELe.textContent = val;
        optionsContainerEle.append(optionELe);

        // adding event listener
        optionELe.addEventListener('click', () => {
            if (optionELe.textContent == options[answer]) {
                score++;
            } else {
                score = score - 0.25;
            }

            nextQuestion();
        })

    })

}

function nextQuestion() {
    ScoreDivEle.textContent = `Score: ${score}`;

    // incrementing
    currentQuestion++;

    // // remove old options
    optionsContainerEle.textContent = '';


    if (currentQuestion < quizData.length) {
        showcaseQuestions();
    } else if (currentQuestion == quizData.length) {
        // completion
        QuestionsEle.textContent = 'Quiz Completed!!!';
        optionsContainerEle.style.display = 'none';
        ScoreDivEle.textContent = `Score: ${score}`;
    }

}





