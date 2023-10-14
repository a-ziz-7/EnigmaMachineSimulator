const alphabet = 'abcdefghijklmnopqrstuvwxyz';

class Plugboard {
  constructor(changes = []) {
    this.mainDict = {};

    for (const letter of alphabet) {
      this.mainDict[letter] = letter;
    }

    for (const pair of changes) {
      this.mainDict[pair[0]] = pair[1];
      this.mainDict[pair[1]] = pair[0];
    }
  }

  pass(letter) {
    return this.mainDict[letter];
  }
}

module.exports = Plugboard;