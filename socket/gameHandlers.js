const { games } = require("../game/gameManager");
const { Pexeso } = require("../game/Pexeso");

module.exports = {
  register: (io, socket) => {
    socket.on("game:flipCard", (i, code, playerCode) => {
      if (games[code].playerCodes.length == 1) {
        return
      }
      var isCardAvailable = true
      if (games[code] && games[code].goneCards.length > 0) {
        for (var usedCard = 0; usedCard < games[code].goneCards.length; usedCard++) {
          if (games[code].goneCards[usedCard] == i) {
            isCardAvailable = false
            break
          }
        }
        
      }
      if (games[code] && games[code].playerCodes[games[code].playerTurn] == playerCode && isCardAvailable) {
        games[code].selectedCards.push(i)
        var isCardAPair = false
        if (games[code].selectedCards[0] && games[code].selectedCards[1] && games[code].selectedCards[0] == games[code].selectedCards[1]) {
          games[code].selectedCards = [games[code].selectedCards[0]]
          return
        }
        if (!games[code].isRunning) {
          games[code].isRunning = true;
          games[code].start(28)
        }
        if (games[code].selectedCards.length >= 2 && games[code].returnCard(games[code].selectedCards[0]) == games[code].returnCard(games[code].selectedCards[1])) {
          games[code].goneCards.push(games[code].selectedCards[0])
          games[code].goneCards.push(games[code].selectedCards[1])
          isCardAPair = true
          games[code].playerScores[games[code].playerTurn]++
          io.emit("game:playerNameList", code, games[code].playerNames, games[code].playerNames[games[code].playerTurn], games[code].playerScores)
          console.log(games[code])
        }
        if (games[code].selectedCards.length >= 2) {
          if (!isCardAPair) {
            if (games[code].playerCodes.length == games[code].playerTurn + 1) {
              games[code].playerTurn = 0;
            } else {
              games[code].playerTurn++;
            }
          }
          games[code].selectedCards = []
        }
        io.emit("game:cardFlipped", code, i, games[code].returnCard(i), games[code].playerNames[games[code].playerTurn]);
      }
    });

    socket.on("room:startNow", (code) => {
      if (games[code]) {
        io.emit("room:gameIsStarting", code)
      }
    })

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
      games[code].checkPlayerDisconnect(games, code)
      socket.emit("game:code", code);
    });

    socket.on("game:join", (code, name) => {
      if (games[code] && !games[code].isRunning) {
        games[code].playerNames.push(String(name))

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
        games[code].playerScores.push(0)
        io.emit("game:playerNameList", code, games[code].playerNames, games[code].playerNames[games[code].playerTurn], games[code].playerScores)
        socket.emit("game:joinReturn", playerCode);
      } else {
        socket.emit("game:joinReturn", "gs");
      }
    })

    socket.on("game:imStillHere", (code) => {
      if (games[code]) {
        games[code].timesDC++
      }
    })
  },
};
