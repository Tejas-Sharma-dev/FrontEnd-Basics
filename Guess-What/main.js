
const quiz_questions = [
    {
        question: "🦁🤴📖",
        answer: "Lion King",
        hint: "Animated film about a young lion's journey to reclaim his kingdom."
    },
    {
        question: "🕷️👨‍🔬🕸️",
        answer: "SpiderMan",
        hint: "A superhero with arachnid-like abilities who protects New York City."
    },
    {
        question: "🌊🏝️🗿",
        answer: "Moana",
        hint: "Disney film featuring a Polynesian princess and a demigod."
    },
    {
        question: "🧙‍♂️🏰📚",
        answer: "Harry Potter",
        hint: "The wise and eccentric headmaster of Hogwarts School of Witchcraft and Wizardry."
    },
    {
        question: "🍫🏭🍬",
        answer: "Willy Wonka",
        hint: "A magical chocolate factory owner in a beloved children's book."
    },
    {
        question: "🦸‍♀️🇰🇷💥",
        answer: "Squid Game",
        hint: "Main character of a South Korean survival drama series on Netflix."
    },
    {
        question: "🧙‍♂️💍🌋",
        answer: "Lord of the Rings",
        hint: "A hobbit tasked with destroying a powerful ring in a fantasy epic."
    },
    {
        question: "🕵️‍♂️🕰️🔍",
        answer: "Sherlock Holmes",
        hint: "A brilliant detective known for his deductive reasoning and his loyal companion."
    },
    {
        question: "🦇👨‍👧‍👦",
        answer: "Batman",
        hint: "A superhero movie"
    },
    {
        question: "🚀🌌👩‍🚀",
        answer: "Interstellar",
        hint: "A space-themed movie"
    },
    {
        question: "🍕🐢",
        answer: "Teenage Mutant Ninja Turtles",
        hint: "A group of crime-fighting turtles"
    },
    {
        question: "🦖🌴",
        answer: "Jurassic Park",
        hint: "A movie about dinosaurs"
    },
    {
        question: "👸🏰🐂",
        hint: "A Disney princess movie",
        answer: "Beauty and the Beast"
    },
    {
        question: "🎥🎂",
        hint: "A classic film about a boy's journey into adulthood",
        answer: "The Breakfast Club"
    },
    {
        question: "👩‍🍳🍝🇮🇹",
        hint: "An animated movie about a rat with culinary aspirations",
        answer: "Ratatouille"
    },
    {
        question: "🗽🍎",
        hint: "A city known for its Statue of Liberty and the Big Apple",
        answer: "New York City"
    },
    {
        question: "🌴🏖️",
        hint: "A tropical destination with stunning beaches",
        answer: "Hawaii"
    },
    {
        question: "🕌🐘",
        hint: "A country known for its rich cultural heritage, temples, and elephants",
        answer: "India"
    },
    {
        question: "🏔️🏰🍫",
        hint: "A country famous for its Alps, medieval castles, and chocolate",
        answer: "Switzerland"
    },
    {
        question: "🕌🐍",
        hint: "A city famous for its ancient pyramids and Sphinx",
        answer: "Cairo"
    }

]


const userInputEle = document.getElementById('user-text');

const startBtnEle = document.getElementById('start-btn');

const timerEle = document.getElementById('timer');

const questionEle = document.getElementById('question-header');

const instrContainerEle = document.getElementById('instruction-container');

const gameContainer = document.getElementById('game-section');

const hintHeaderEle = document.getElementById('hint-header');

const resultEle = document.getElementById('result');

const scoreEle = document.getElementById('score');

const gameEndEle = document.getElementById('game-end');

const scoreFeedbackEle = document.getElementById('scoreFeedback');

const playAgainBtnEle = document.getElementById('play-again-btn');

const commentList = {
    okish: `Keep guessing! You'll get the hang of these emojis in no time. (try hints🫢)`,
    good: `Nice job! You're on the right track. Keep it up! 🙂`,
    impressive: `Seriously impressive skills! You're practically an emoji whisperer! 😎`,
    perfect: `Wow! You aced the quiz! You know your emojis like the back of your hand! 🥳`,
}


let Timer = undefined;

const maxMinute = 2;

let seconds = 0;
let minutes = 0;

function formatTime(minutes, seconds) {
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function updateTimer() {
    seconds++;


    // reset seconds
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === maxMinute) {
        clearInterval(Timer);
        // stop game
        endGame();
    }

    const formattedTime = formatTime(minutes, seconds);
    timerEle.textContent = formattedTime;
}


startBtnEle.addEventListener('click', () => {

    // disable the instruction block
    instrContainerEle.setAttribute('style', 'display:none;');

    // enable game block
    gameContainer.setAttribute('style', 'display:');

    // sets cursor on text feild
    userInputEle.focus();

    // initial timer value
    timerEle.textContent = `00:00`;

    // start timer
    startTimer();

    // start game
    startGame();


})

let currentQuestion = 0;
let score = 0;

function startGame() {
    const { question } = quiz_questions[currentQuestion];
    questionEle.textContent = question;

}


userInputEle.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const userGuess = userInputEle.value;
        resetInput();
        resetHint();
        displayResult(userGuess, quiz_questions[currentQuestion].answer);
        nextQuestion();
    }
})

function endGame() {
    userInputEle.disabled = true;

    // hide game section
    gameContainer.setAttribute('style', 'display:none');

    // show result
    gameEndEle.setAttribute('style', 'display: ');

    showFeedback();

    scoreEle.textContent = score;


}

playAgainBtnEle.addEventListener('click', () => {
    // hide end
    gameEndEle.setAttribute('style', 'display:none');

    // enable game section
    gameContainer.setAttribute('style', 'display:');

    // resetting time and score
    seconds = 0;
    minutes = 0;
    score = 0;

    // enable the input
    userInputEle.disabled = false;

    // clear the content in text
    userInputEle.value = '';

    // sets cursor on text feild
    userInputEle.focus();

    // initial timer value
    timerEle.textContent = `00:00`;

    // start timer
    startTimer();

    // start game
    startGame();

})


function showFeedback() {
    // 1-3 okish
    // 4-6 good
    // 7-9 impressive
    // above 10 perfect
    if (score <= 3) {
        scoreFeedbackEle.textContent = commentList.okish;
    } else if (score <= 6) {
        scoreFeedbackEle.textContent = commentList.good;
    } else if (score <= 9) {
        scoreFeedbackEle.textContent = commentList.impressive;
    } else if (score >= 10) {
        scoreFeedbackEle.textContent = commentList.perfect;
    }
}



function resetInput() {
    userInputEle.value = '';
}


function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quiz_questions.length) {
        startGame();
    } else if (currentQuestion === quiz_questions.length) {
        // reset 
        currentQuestion = 0;
        startGame();
    }
}


function displayResult(actual, expected) {
    const actualTxt = actual.trim().toLowerCase();
    const expectedTxt = expected.trim().toLowerCase();

    setTimeout(() => {
        resultEle.textContent = ``;
    }, 600);

    if (actualTxt === expectedTxt) {
        resultEle.textContent = `Correct`;
        score++;
    } else {
        resultEle.textContent = `Incorrect`;
    }
}

function resetHint() {
    hintHeaderEle.textContent = '💡Hint';
}


hintHeaderEle.addEventListener('click', () => {
    hintHeaderEle.textContent = quiz_questions[currentQuestion].hint;
})



function startTimer() {
    Timer = setInterval(updateTimer, 1000);
}

