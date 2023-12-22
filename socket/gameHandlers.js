const { game } = require("../game/gameManager");

module.exports = {
  register: (io, socket) => {
    socket.on("game:state", () => {
      io.emit("game:updated", game.toJson());
    });

    socket.on("game:start", (numberOfCards) => {
      if (!game.isRunning()) {
        game.start(numberOfCards);
        io.emit("game:updated", game.toJson());
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
        io.emit("game:updated", game.toJson());
      }
    });

    socket.on("game:genCards", () => {
      game.genCards();
      io.emit("game:updated", game.toJson());
    });
  },
};
