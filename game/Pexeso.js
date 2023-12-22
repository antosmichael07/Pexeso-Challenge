class Pexeso {
  #isRunning = false;
  #cards = [];

  constructor() {}

  isRunning() {
    return this.#isRunning;
  }

  start(numberOfCards) {
    if (numberOfCards % 2 == 0) {
      this.#isRunning = true;
      this.#cards = this.genCards(numberOfCards);
    }
  }

  end() {
    this.#isRunning = false;
  }

  toJson() {
    return {
      isRunning: this.isRunning(),
    };
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
