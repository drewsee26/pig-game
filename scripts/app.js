/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, gameScore

init()


//
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>'


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        document.getElementById('winning-score').disabled = true
        // 1. Get a random number
        var diceOne = Math.floor(Math.random() * 6) + 1
        var diceTwo = Math.floor(Math.random() * 6) + 1
        // 2. Display the result
        var diceOneDOM = document.querySelector('.dice-1')
        var diceTwoDOM = document.querySelector('.dice-2')
        diceOneDOM.style.display = 'block'
        diceTwoDOM.style.display = 'block'
        diceOneDOM.src = '../assets/images/dice-' + diceOne + '.png'
        diceTwoDOM.src = '../assets/images/dice-' + diceTwo + '.png'

        // 3. Update the round score IF the rolled number is NOT a 1
        if (diceOne !== 1 && diceTwo !== 1) {
            roundScore += (diceOne + diceTwo)
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            // Next player
            nextPlayer()
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){

        // 1. Add current score to active players Global scores
        scores[activePlayer] += roundScore
        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        // 3. Check if player won the game
        if (scores[activePlayer] >= gameScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'

            document.querySelector('.dice-1').style.display = 'none'
            document.querySelector('.dice-2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false

        } else {
            nextPlayer()
        }
    }
})

document.querySelector('.submit-score').addEventListener('click', function() {
    gameScore = document.querySelector('.custom-score').value
    document.getElementById('winning-score').disabled = true
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0


    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice-1').style.display = 'none'
    document.querySelector('.dice-2').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0]
    activePlayer = 0
    roundScore = 0
    gameScore = 100

    gamePlaying = true

    document.querySelector('.dice-1').style.display = 'none'
    document.querySelector('.dice-2').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.getElementById('winning-score').disabled = false
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')

    document.querySelector('.custom-score').value = ''


}
