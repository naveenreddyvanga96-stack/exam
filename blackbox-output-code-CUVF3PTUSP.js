let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.classList.add('option');
    optionEl.textContent = option;
    optionEl.addEventListener('click', () => selectAnswer(index));
    optionsEl.appendChild(optionEl);
  });
  selectedAnswer = null;
  nextBtn.style.display = 'none';
}

function selectAnswer(index) {
  selectedAnswer = index;
  document.querySelectorAll('.option').forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });
  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  if (selectedAnswer === questions[currentQuestionIndex].answer) score++;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById('exam-container').style.display = 'none';
  resultsEl.style.display = 'block';
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
}

loadQuestion();  // Start the exam