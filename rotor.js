const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const rotorCodes = {
  "I":   "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  "II":  "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  "III": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  "IV":  "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  "V":   "VZBRGITYUPSDNHLXAWMJQOFECK",
};

class Rotor {
  constructor(numberLatin, notch) {
    this.left = alphabet;
    this.right = rotorCodes[numberLatin].toLowerCase();
    this.notch = notch;
  }

  forward(signal) {
    const letter = this.right[signal];
    signal = this.left.indexOf(letter);
    return signal;
  }

  backward(signal) {
    const letter = this.left[signal];
    signal = this.right.indexOf(letter);
    return signal;
  }

  rotate() {
    this.left = this.left.slice(1) + this.left[0];
    this.right = this.right.slice(1) + this.right[0];
  }

  rotateToPosOrLetter(pos = null, letter = null) {
    let amount = 0;

    if (pos !== null) {
      amount = pos;
    } else if (letter !== null) {
      amount = alphabet.indexOf(letter);
    }

    for (let i = 0; i < amount; i++) {
      this.rotate();
    }
  }

  toString() {
    let result = "";
    for (let i = 0; i < this.left.length; i++) {
      result += this.left[i] + " -> " + this.right[i] + "\n";
    }
    return result;
  }
}

module.exports = Rotor;
