document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cardSequence = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    let firstCard = null;
    let secondCard = null;
    let turnTimeout = null;

    function createCard(value) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden');
        cardElement.textContent = value;
        cardElement.addEventListener('click', flipCard);
        return cardElement;
    }

    function flipCard() {
        if (turnTimeout || this === firstCard || this.classList.contains('matched')) return;
        this.classList.remove('hidden');
        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.textContent === secondCard.textContent) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetTurn();
            if (document.querySelectorAll('.hidden').length === 0) endGame();
        } else {
            turnTimeout = setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                resetTurn();
            }, 1000);
        }
    }

    function resetTurn() {
        firstCard = null;
        secondCard = null;
        clearTimeout(turnTimeout);
        turnTimeout = null;
    }

    function endGame() {
        alert('Game Over! You matched all cards!');
        // Reset game logic could be implemented here
    }

    cardSequence.forEach(value => gameBoard.appendChild(createCard(value)));
});