const { game } = require("../game/gameManager");

module.exports = {
  register: (io, socket) => {
    socket.on("game:state", () => {
      io.emit("game:updated", game.toJson());
    });

    socket.on("game:start", () => {
      if (!game.isRunning()) {
        game.start();
        io.emit("game:updated", game.toJson());
      }
    });

    socket.on("game:end", () => {
      if (game.isRunning()) {
        game.end();
        io.emit("game:updated", game.toJson());
      }
    });
  },
};
