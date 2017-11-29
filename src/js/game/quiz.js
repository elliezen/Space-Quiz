let data;
let width;
let activeIndex = -1;

const div = document.createElement('div');
const questionEl = div.cloneNode(false);
const answerEls = [];

function shuffleArray(array) {
  let i = array.length - 1;
  let j;
  let temp;
  for (i; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export let handleAnswer = false;
export let isCorrect;
export let stopGame = false;

function askNextQuestion() {
  handleAnswer = false;
  if (++activeIndex === data.length) stopGame = true;

  const activeData = data[activeIndex];
  questionEl.innerHTML = activeData.question;
  shuffleArray(activeData.answers);
  activeData.answers.forEach((answer, i) => {
    const answerEl = answerEls[i];
    answerEl.innerHTML = answer;
    answerEl.style.left = Math.floor(Math.random() * width);
  });

  // start css text animation
}

function checkAnswer(event) {
  isCorrect = event.target.innerHTML === data[activeIndex].correct;
  handleAnswer = true;
  askNextQuestion();
}

export function init({ quizData, canvasWidth }) {
  data = shuffleArray(quizData);
  width = canvasWidth;

  // find maximum number of answers
  const maxAnswers = Math.max.apply(null, data.map(q => q.answers.length));
  for (let i = 0; i < maxAnswers; i++) {
    const answerEl = div.cloneNode(false);
    answerEl.addEventListener('mouseenter', checkAnswer);
    answerEls.push(answerEl);
  }
}
