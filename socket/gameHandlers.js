const { games } = require("../game/gameManager");
const { Pexeso } = require("../game/Pexeso");

module.exports = {
  register: (io, socket) => {
    socket.on("game:start", (numberOfCards) => {
      if (!game.isRunning()) {
        game.start(numberOfCards);
      }
    });

    socket.on("game:flipCard", (i) => {
      if (game.isRunning()) {
        io.emit("game:card", game.returnCard(i));
      }
    });

    socket.on("game:end", () => {
      if (game.isRunning()) {
        game.end();
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
      io.emit("game:code", code);

      console.log(games);
    });

    socket.on("game:join", (code) => {
      if (games[code]) {
        games[code].numberOfPlayersWaiting++
        io.emit("room:updatePlayerCount", games[code].numberOfPlayersWaiting, code);
      }
    });
    socket.on("game:disconnect", (code) => {
      if (games[code]) {
        games[code].numberOfPlayersWaiting--
        io.emit("room:updatePlayerCount", games[code].numberOfPlayersWaiting, code);
      }
    });

    socket.on("join:isGameExist", (code, playerCode) => {
      if (games[code]) {
        io.emit("join:isGameExistReturn", "yes", playerCode);
      } else {
        io.emit("join:isGameExistReturn", "no", playerCode);
      }
    });
  },
};
