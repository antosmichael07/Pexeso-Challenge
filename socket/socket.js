const { Server } = require("socket.io");

const gameHandlers = require("./gameHandlers");

module.exports = {
  create: (httpServer) => {
    /* websocket */
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.onAnyOutgoing((...args) => {
        console.log("event is sent:", ...args);
      });
      
      socket.onAny((...args) => {
        console.log("event is received:", ...args);
      });

      gameHandlers.register(io, socket);
    });
  },
};
