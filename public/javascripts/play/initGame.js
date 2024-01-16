var gameBoard = document.getElementById('game-board');

function initGame() {

    // Add the cards to the game board
    for (var i = 0; i < 28; i++) {
        var card_content = document.createElement('div');
        card_content.className = 'card-content';
        card_content.id = "card-" + i;
        card_content.addEventListener('click', onCardClick);
        gameBoard.appendChild(card_content);

        var card_face_front = document.createElement('div');
        card_face_front.className = 'card-face front';
        card_face_front.id = "front-" + i;
        card_content.appendChild(card_face_front);

        var card_face_back = document.createElement('div');
        card_face_back.className = 'card-face back';
        card_face_back.id = "back-" + i;
        card_content.appendChild(card_face_back);
    }
}

function onCardClick(event) {
    socket.emit("game:flipCard", Number(event.target.id.split("-")[1]), code, uniqueID)
}

initGame()