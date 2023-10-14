const reflectorCodes = {
  "A": "EJMZALYXVBWFCRQUONTSPIKHGD",
  "B": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
  "C": "FVPJIAOYEDRZXWGCTKUQSBNMHL",
};

class Reflector {
  constructor(code) {
    this.mainDict = {};
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < alphabet.length; i++) {
      this.mainDict[alphabet[i]] = reflectorCodes[code][i].toLowerCase();
    }
  }

  reflect(letter) {
    return this.mainDict[letter];
  }
}

module.exports = Reflector;