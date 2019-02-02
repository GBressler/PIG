/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

function nextPlayer() {
    var currentPlayer = activePlayer;
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;
   //document.getElementById('current-' + currentPlayer).textContent = '0';
   //document.getElementByClassName('player-0-panel').classList.toggle('active');
   document.querySelector('.player-0-panel').classList.toggle('active');
   //document.getElementByClassName('player-1-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   document.querySelector('.dice').style.display = 'none';
}
//dice = Math.floor(Math.random() * 6) + 1;

  document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
     //1.  We need a random number
      var dice = Math.floor(Math.random() * 6) + 1;
    //2. Display result
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';
    //3. If dice does NOT equal 1, player accumulates score and rolls again
        if(dice !== 1) {
       //Accumulate Score
         roundScore += dice;
         document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
       //Next Player
          nextPlayer();
        }
      }
    });

document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
  //take player-current-score/current-# and add to score-#
  //score[activePlayer] = document.getElementById('current-' + activePlayer).innerH
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
 /* score[activePlayer] = document.getElementById('current-' + activePlayer).textContent = roundScore;
  var totalScore = document.getElementById('score-' + activePlayer).textContent = roundScore;
  totalScore += totalScore;*/
  //set player-current-score to 0
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
  //Check if player won
    if(scores[activePlayer] >= 100) {
      document.querySelector('#score-' + activePlayer).innerHTML = '<uppercase>you win!</uppercase>';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
   } else {
     //Next Player
      nextPlayer();
   }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
