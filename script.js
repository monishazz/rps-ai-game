let wins = 0;
let losses = 0;
let ties = 0;

const choices = ['rock', 'paper', 'scissors'];

// Remembers every move you've ever made, in order
let history = [];

// "Memory": for each move, counts what you played NEXT
// Example: memory.rock.scissors = 3 means
// "3 times, after playing rock, you then played scissors"
let memory = {
  rock: { rock: 0, paper: 0, scissors: 0 },
  paper: { rock: 0, paper: 0, scissors: 0 },
  scissors: { rock: 0, paper: 0, scissors: 0 }
};

function play(playerChoice) {
  const aiChoice = predictAndCounter();

  // BEFORE storing this move, update memory using
  // "what came after my last move"
  if (history.length > 0) {
    const lastMove = history[history.length - 1];
    memory[lastMove][playerChoice]++;
  }

  history.push(playerChoice);

  const outcome = getOutcome(playerChoice, aiChoice);
  if (outcome === 'win') wins++;
  else if (outcome === 'lose') losses++;
  else ties++;

  document.getElementById('winCount').textContent = wins;
  document.getElementById('lossCount').textContent = losses;
  document.getElementById('tieCount').textContent = ties;

  document.getElementById('result').textContent =
    `You: ${playerChoice} | AI: ${aiChoice} → You ${outcome}!`;
}

function predictAndCounter() {
  // First move ever — no data, just guess randomly
  if (history.length === 0) {
    return choices[Math.floor(Math.random() * 3)];
  }

  const lastMove = history[history.length - 1];
  const counts = memory[lastMove];

  // Find which move you played most often after lastMove
  let predicted = 'rock';
  let maxCount = counts.rock;
  if (counts.paper > maxCount) { predicted = 'paper'; maxCount = counts.paper; }
  if (counts.scissors > maxCount) { predicted = 'scissors'; maxCount = counts.scissors; }

  // No history for this case yet — guess randomly
  if (maxCount === 0) {
    return choices[Math.floor(Math.random() * 3)];
  }

  // Play the move that BEATS the predicted move
  const counters = { rock: 'paper', paper: 'scissors', scissors: 'rock' };
  return counters[predicted];
}

function getOutcome(player, ai) {
  if (player === ai) return 'tie';
  const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  if (beats[player] === ai) return 'win';
  return 'lose';
}