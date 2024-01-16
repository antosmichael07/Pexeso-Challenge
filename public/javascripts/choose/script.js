const socket = io()

socket.on("game:code", (resCode) => {
    window.location.href = "/room?code=" + resCode;
});

function clickedCreate() {

    socket.emit("game:gen")

}