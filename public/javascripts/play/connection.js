const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code')

const socket = io();
var uniqueID = ""
var flippedCards = []
var flippedCardsValue = []
var playerNameList = []

socket.on("game:joinReturn", (playerCode) => {
    if (playerCode == "gs") {
        alert("Game already started or not found")
        window.location.href = "/join";
    } else {
        uniqueID = playerCode
    }
})

socket.on("connect", () => {
    console.log("connected")
    socket.emit("game:join", code, prompt("Type your name:"))
});

socket.on("game:cardFlipped", (roomCode, cardID, cardValue, playerTurn) => {
    if (roomCode == code) {
        if (flippedCards.length >= 2) {
            var firstCard = document.getElementById("card-" + flippedCards[0])
            var secondCard = document.getElementById("card-" + flippedCards[1])
            firstCard.className = 'card-content';
            secondCard.className = 'card-content';
            if (flippedCardsValue[0] == flippedCardsValue[1]) {
                document.getElementById("front-" + flippedCards[0]).style.backgroundImage = "url('images/play/testRem3.png')"
                document.getElementById("front-" + flippedCards[1]).style.backgroundImage = "url('images/play/testRem3.png')"
            }
            flippedCardsValue = []
            flippedCards = []
        }
        var clickedCard = document.getElementById("card-" + cardID)
        clickedCard.className = 'card-content flip';
        document.getElementById("back-" + cardID).style.backgroundImage = "url('images/play/cards/" + (cardValue + 1) + ".png'), url('images/play/testRem4.png')";
        flippedCards.push(cardID)
        flippedCardsValue.push(cardValue)
        for (var i = 0; i < playerNameList.length; i++) {
            document.getElementById(playerNameList[i]).style.color = "#212529"
        }
        document.getElementById(playerTurn).style.color = "#E18818"
    }
})

socket.on("game:playerNameList", (roomCode, nameArray, whoIsPlaying, playerScores) => {
    if (roomCode == code) {
        playerNameList = nameArray
        var htmlInPlayerList = ""
        for (var i = 0; i < nameArray.length; i++) {
            htmlInPlayerList += '<div id="' + nameArray[i] + '">' + nameArray[i] + " - " + playerScores[i] + "</div>"
        }
        document.getElementById("players-list").innerHTML = htmlInPlayerList
        document.getElementById(whoIsPlaying).style.color = "#E18818"
    }
})

function imStillHere() {
    socket.emit("game:imStillHere", code)
    setTimeout(imStillHere, 20000)
}

imStillHere()