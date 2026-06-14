// Keep track of scores
let wins = 0;
let losses = 0;
let ties = 0;

// All possible moves
const choices = ['rock', 'paper', 'scissors'];

function play(playerChoice) {
  // For now, AI picks randomly
  const aiChoice = choices[Math.floor(Math.random() * 3)];

  // Determine the winner
  const outcome = getOutcome(playerChoice, aiChoice);

  // Update score
  if (outcome === 'win') wins++;
  else if (outcome === 'lose') losses++;
  else ties++;

  // Update the screen
  document.getElementById('winCount').textContent = wins;
  document.getElementById('lossCount').textContent = losses;
  document.getElementById('tieCount').textContent = ties;

  document.getElementById('result').textContent =
    `You: ${playerChoice} | AI: ${aiChoice} → You ${outcome}!`;
}

function getOutcome(player, ai) {
  if (player === ai) return 'tie';

  const beats = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };

  if (beats[player] === ai) return 'win';
  return 'lose';
}