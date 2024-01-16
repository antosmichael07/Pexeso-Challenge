var code = "";
const socket = io();

const idInput = document.getElementById("input");
idInput.addEventListener("input", (e) => {
    const { value } = e.target
    code = value
})

socket.on("join:isGameExistReturn", (value) => {
    if (value == "yes") {
        window.location.href = "/room?code=" + code;
    } else {
        alert("Game not found");
    }
});

function clickedAPlay() {
    socket.emit("join:isGameExist", code);
}