document.addEventListener('DOMContentLoaded', function () {
    let scores, currentScore, activePlayer, playing;
  
    const init = function () {
      scores = [0, 0];
      currentScore = 0;
      activePlayer = 0;
      playing = true;
  
      updateScores();
      hideDice();
      setActivePlayer();
      removeWinnerClass();
    };
  
    const switchPlayer = function () {
      currentScore = 0;
      activePlayer = 1 - activePlayer;
      updateScores();
      setActivePlayer();
    };
  
    const updateScores = function () {
      document.getElementById('score--0').textContent = scores[0];
      document.getElementById('score--1').textContent = scores[1];
      document.getElementById('current--0').textContent = activePlayer === 0 ? currentScore : 0;
      document.getElementById('current--1').textContent = activePlayer === 1 ? currentScore : 0;
    };
  
    const hideDice = function () {
      document.querySelector('.dice').style.display = 'none';
    };
  
    const setActivePlayer = function () {
      document.querySelector('.player--0').classList.toggle('player--active', activePlayer === 0);
      document.querySelector('.player--1').classList.toggle('player--active', activePlayer === 1);
    };
  
    const removeWinnerClass = function () {
      document.querySelector('.player--0').classList.remove('player--winner');
      document.querySelector('.player--1').classList.remove('player--winner');
      document.getElementById('name--0').textContent = 'Player 1';
      document.getElementById('name--1').textContent = 'Player 2'; 
    };
  
    document.querySelector('.btn--new').addEventListener('click', init);
  
    document.querySelector('.btn--roll').addEventListener('click', function () {
      if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;
        const diceImage = document.querySelector('.dice');
        diceImage.style.display = 'block';
        diceImage.src = `dice-${dice}.png`;
  
        if (dice !== 1) {
          currentScore += dice;
          updateScores();
        } else {
          switchPlayer();
        }
      }
    });
  
    document.querySelector('.btn--hold').addEventListener('click', function () {
      if (playing) {
        scores[activePlayer] += currentScore;
        updateScores();
  
        if (scores[activePlayer] > 100) {
          playing = false;
          document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
          document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
          hideDice();
        } else {
          switchPlayer();
        }
      }
    });
  
    init();
  });
  