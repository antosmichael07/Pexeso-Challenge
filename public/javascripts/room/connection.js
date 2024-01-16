
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code')

var roomCodeHTML = document.getElementById("roomCode")
roomCodeHTML.innerText = "Your room code: " + code
var numberOfPlayers = 0
const socket = io(); // Connect to the Socket.IO server

document.getElementById('roomCode').innerText = `Your room code: ${code}`;
    
socket.on("room:updatePlayerCount", (value, roomCode) => {
    if (roomCode == code) {
        numberOfPlayers = value
        document.getElementById("userIcons").innerHTML = ""
        for (let i = 0; i < numberOfPlayers; i++) {
            document.getElementById("userIcons").innerHTML += '<img src="images/room/user.png" class="user-icon"></img>'
        }
    }
});

socket.emit('room:join', code)

socket.on("room:gameIsStarting", (roomCode) => {
    if (roomCode == code) {
        window.location.href = "/play?code=" + code;
    }
})

function clickedAPlay() {
    socket.emit("room:startNow", code)
    window.location.href = "/play?code=" + code;
}

function imStillHere() {
    socket.emit("game:imStillHere", code)
    setTimeout(imStillHere, 20000)
}

imStillHere()