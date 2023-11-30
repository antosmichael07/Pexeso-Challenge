class Pexeso {
  #isRunning = false;

  constructor() {}

  isRunning() {
    return this.#isRunning;
  }

  start() {
    this.#isRunning = true;
  }

  end() {
    this.#isRunning = false;
  }

  toJson() {
    return {
      isRunning: this.isRunning(),
    };
  }
}

module.exports = {
  Pexeso,
};
