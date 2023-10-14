const alphabet = 'abcdefghijklmnopqrstuvwxyz';

class Enigma {
  constructor(plugboard, rotors, reflector) {
    this.plugboard = plugboard;
    this.rotors = rotors;
    this.reflector = reflector;
  }

  setKeys(key) {
    for (let i = 0; i < 3; i++) {
      this.rotors[i].rotateToPosOrLetter({ letter: key[i] });
    }
  }

  encrypt(letter) {
    if (
      this.rotors[1].left[0] === this.rotors[1].notch &&
      this.rotors[2].left[0] === this.rotors[2].notch
    ) {
      for (let i = 0; i < 3; i++) {
        this.rotors[i].rotate();
      }
    } else if (this.rotors[1].left[0] === this.rotors[1].notch) {
      for (let i = 0; i < 3; i++) {
        this.rotors[i].rotate();
      }
    } else if (this.rotors[2].left[0] === this.rotors[2].notch) {
      for (let i = 1; i < 3; i++) {
        this.rotors[i].rotate();
      }
    } else {
      for (let i = 2; i < 3; i++) {
        this.rotors[i].rotate();
      }
    }
    if (!letter.match(/[a-zA-Z]/)) {
      return '';
    }
    letter = letter.toLowerCase();
    letter = this.plugboard.pass(letter);
    letter = this.rotorPass(letter, true);
    letter = this.reflector.reflect(letter);
    letter = this.rotorPass(letter, false);
    letter = this.plugboard.pass(letter);
    return letter;
  }

  decrypt(letter) {
    return this.encrypt(letter);
  }

  rotorPass(letter, forward) {
    let signal = alphabet.indexOf(letter);
    for (let i = 0; i < 3; i++) {
      if (forward) {
        const index = 2 - i;
        signal = this.rotors[index].forward(signal);
      } else {
        signal = this.rotors[i].backward(signal);
      }
    }
    return alphabet[signal];
  }
}

module.exports = Enigma;
