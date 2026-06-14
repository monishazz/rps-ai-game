let wins = 0;
let losses = 0;
let ties = 0;

const choices = ['rock', 'paper', 'scissors'];
const emojiMap = { rock: '🪨', paper: '📄', scissors: '✂️' };
const winMessages = [
  "🎉 Nice! You got me this time!",
  "Whoa, didn't see that coming!",
  "Lucky guess... or was it? 🤔",
  "Okay okay, you've got skills 👏",
  "Fine. FINE. You win this one."
];

const loseMessages = [
  "😂 LOL so predictable",
  "Are you even trying to win?",
  "Saw that coming from a mile away",
  "My training data called it 🤖",
  "Same move again? Really?",
  "I could do this all day, human",
  "Is that your final answer? 😏",
  "Too easy."
];

const tieMessages = [
  "🤝 Great minds think alike",
  "Snap! Same wavelength",
  "We're evenly matched... for now"
];

function getRandomMessage(outcome) {
  const messages = { win: winMessages, lose: loseMessages, tie: tieMessages };
  const list = messages[outcome];
  return list[Math.floor(Math.random() * list.length)];
}

function launchFireworks() {
  const colors = ['#ff6b6b', '#4ade80', '#fbbf24', '#00d9ff', '#a78bfa', '#f472b6'];
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * 2 * Math.PI;
    const distance = 100 + Math.random() * 150;
    particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 900);
  }
}


let history = [];

let memory = {
  rock: { rock: 0, paper: 0, scissors: 0 },
  paper: { rock: 0, paper: 0, scissors: 0 },
  scissors: { rock: 0, paper: 0, scissors: 0 }
};

function play(playerChoice) {
  const { aiMove, predicted, confident } = predictAndCounter();

  if (history.length > 0) {
    const lastMove = history[history.length - 1];
    memory[lastMove][playerChoice]++;
  }
  history.push(playerChoice);

  const outcome = getOutcome(playerChoice, aiMove);
  if (outcome === 'win') wins++;
  else if (outcome === 'lose') losses++;
  else ties++;

  document.getElementById('winCount').textContent = wins;
  document.getElementById('lossCount').textContent = losses;
  document.getElementById('tieCount').textContent = ties;

  document.getElementById('playerEmoji').textContent = emojiMap[playerChoice];
  document.getElementById('aiEmoji').textContent = emojiMap[aiMove];

  const resultEl = document.getElementById('result');
  resultEl.className = outcome;
  resultEl.textContent = getRandomMessage(outcome);

  if (outcome === 'win') {
    launchFireworks();
  }

  const predictionEl = document.getElementById('prediction');
  if (confident) {
    predictionEl.textContent =
      `🧠 AI guessed you'd play ${predicted} ${emojiMap[predicted]} → played ${aiMove} ${emojiMap[aiMove]} to counter`;
  } else {
    predictionEl.textContent = `🧠 Not enough data yet — AI guessed randomly`;
  }

  addHistoryItem(outcome);
}

function predictAndCounter() {
  const counters = { rock: 'paper', paper: 'scissors', scissors: 'rock' };

  if (history.length === 0) {
    return { aiMove: choices[Math.floor(Math.random() * 3)], predicted: null, confident: false };
  }

  const lastMove = history[history.length - 1];
  const counts = memory[lastMove];

  let predicted = 'rock';
  let maxCount = counts.rock;
  if (counts.paper > maxCount) { predicted = 'paper'; maxCount = counts.paper; }
  if (counts.scissors > maxCount) { predicted = 'scissors'; maxCount = counts.scissors; }

  if (maxCount === 0) {
    return { aiMove: choices[Math.floor(Math.random() * 3)], predicted: null, confident: false };
  }

  return { aiMove: counters[predicted], predicted: predicted, confident: true };
}

function getOutcome(player, ai) {
  if (player === ai) return 'tie';
  const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  if (beats[player] === ai) return 'win';
  return 'lose';
}

function addHistoryItem(outcome) {
  const bar = document.getElementById('historyBar');
  const item = document.createElement('div');
  item.className = `history-item ${outcome}`;
  item.textContent = { win: '✓', lose: '✗', tie: '–' }[outcome];
  bar.appendChild(item);
  if (bar.children.length > 15) bar.removeChild(bar.firstChild);
}
