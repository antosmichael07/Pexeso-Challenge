class Pexeso {
  #cards = [];

  constructor() {
    this.numberOfPlayersWaiting = 0;
    this.playerCodes = [];
    this.playerTurn = 0;
    this.isRunning = false;
    this.playerScores = []
    this.goneCards = []
    this.selectedCards = []
    this.playerNames = []
    this.timesDC = 0
    this.lastTimesDC = 0
    this.skipDC = 1
  }

  checkPlayerDisconnect(gamesObject, code) {
    if (gamesObject[code].lastTimesDC == gamesObject[code].timesDC && gamesObject[code].skipDC == 0) {
      delete gamesObject[code]
      return
    }
    gamesObject[code].skipDC = 0
    gamesObject[code].lastTimesDC = gamesObject[code].timesDC
    setTimeout(gamesObject[code].checkPlayerDisconnect, 60000, gamesObject, code)
  }

  start(numberOfCards) {
    if (numberOfCards % 2 == 0) {
      this.#cards = this.genCards(numberOfCards);
    }
  }

  genCards(numberOfCards) {
    var possibleCards = [];
    for (let i = 0; i < numberOfCards / 2; i++) {
      possibleCards.push(i);
      possibleCards.push(i);
    }
    console.log(possibleCards);
    var tempCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      tempCards.push(possibleCards.splice(Math.floor(Math.random() * possibleCards.length), 1)[0]);
    }
    console.log(tempCards);
    return tempCards;
  }

  returnCard(i) {
    return this.#cards[i];
  }
}

module.exports = {
  Pexeso,
};
