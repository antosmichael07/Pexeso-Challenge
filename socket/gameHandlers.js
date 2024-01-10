const { games } = require("../game/gameManager");
const { Pexeso } = require("../game/Pexeso");

module.exports = {
  register: (io, socket) => {
    socket.on("game:flipCard", (i, code, playerCode) => {
      if (games[code] && games[code].playerCodes[games[code].playerTurn] == playerCode) {
        io.emit("game:cardFlipped", code, i, games[code].returnCard(i));
        games[code].isRunning = true;
        if (games[code].playerCodes.length == games[code].playerTurn + 1) {
          games[code].playerTurn = 0;
        } else {
          games[code].playerTurn++;
        }
      }
    });

    socket.on("room:join", (code) => {
      if (games[code]) {
        games[code].numberOfPlayersWaiting++
        io.emit("room:updatePlayerCount", games[code].numberOfPlayersWaiting, code);
      }
    });

    socket.on("join:isGameExist", (code) => {
      if (games[code]) {
        socket.emit("join:isGameExistReturn", "yes");
      } else {
        socket.emit("join:isGameExistReturn", "no");
      }
    });

    socket.on("game:gen", () => {
      var code = "";
      do {
        var possible = "0123456789";
  
        for (var i = 0; i < 6; i++) {
          code += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      } while (games[code])
      games[code] = new Pexeso();
      socket.emit("game:code", code);
    });

    socket.on("game:join", (code) => {
      if (games[code] && !games[code].isRunning) {
        var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var playerCode = "";
        var continueLoop = false;
  
        do {
          for (var i = 0; i < 8; i++) {
            playerCode += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          for (var i = 0; i < games[code].playerCodes; i++) {
            if (games[code].playerCodes[i] == playerCode) {
              continueLoop = true;
            }
          }
        } while (continueLoop)
        games[code].playerCodes.push(playerCode);
        socket.emit("game:joinReturn", playerCode);
      } else {
        socket.emit("game:joinReturn", "gs");
      }
    })

    socket.on("game:start", (code) => {
      if (games[code]) {
        games[code].start(28);
      }
    });
  },
};
