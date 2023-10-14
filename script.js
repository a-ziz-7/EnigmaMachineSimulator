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

const rotorCodes = {
    "I": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    "II": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    "III": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    "IV": "ESOVPZJAYQUIRHXLNFTGKDCMWB",
    "V": "VZBRGITYUPSDNHLXAWMJQOFECK",
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

    rotateToPos(pos = null) {
        let amount = 0;
        if (pos !== null) {
            amount = pos;
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

class Enigma {
    constructor(plugboard, rotors, reflector) {
        this.plugboard = plugboard;
        this.rotors = rotors;
        this.reflector = reflector;
    }

    setKeys(key) {
        for (let i = 0; i < key.length; i++) {
            this.rotors[i].rotateToPos(key[i]);
            // console.log(this.rotors[i])
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

function createEnigma(rotorOption, keyOption, reflectorOption = "B", plugs = []) {

    const plugboard = new Plugboard(plugs);

    const rotorI = new Rotor("I", "Q");
    const rotorII = new Rotor("II", "E");
    const rotorIII = new Rotor("III", "V");
    const rotorIV = new Rotor("IV", "J");
    const rotorV = new Rotor("V", "Z");

    const rotorDict = {
        0: rotorI,
        1: rotorII,
        2: rotorIII,
        3: rotorIV,
        4: rotorV,
    };

    const finalRotors = [
        rotorDict[rotorOption[0]],
        rotorDict[rotorOption[1]],
        rotorDict[rotorOption[2]],
    ];

    const reflectorA = new Reflector("A");
    const reflectorB = new Reflector("B");
    const reflectorC = new Reflector("C");

    const reflectorDict = {
        "A": reflectorA,
        "B": reflectorB,
        "C": reflectorC,
    };

    const finalReflector = reflectorDict[reflectorOption];

    const machine = new Enigma(plugboard, finalRotors, finalReflector);

    machine.setKeys(keyOption);

    return machine;
}

function startEnigma(string) {
    const rotor1 = document.getElementById("rot1");
    const rotor2 = document.getElementById("rot2");
    const rotor3 = document.getElementById("rot3");

    const key1 = document.getElementById("key1").value;
    const key2 = document.getElementById("key2").value;
    const key3 = document.getElementById("key3").value;
    // const s = 'abcdefghijklmnopqrstuvwxyz';
    // console.log([key1, key2, key3]);
    
    const plugg = document.getElementById("plugs");
    const allPlugs = plugg.value;
    let i = 0;
    const arr = [];
    while (i < allPlugs.length){
        arr.push(allPlugs.slice(i,i+2));
        i += 3
    }

    const enigma = createEnigma(
        rotorOption = [rotor1.value, rotor2.value, rotor3.value],
        keyOption = [key1, key2, key3],
        reflectorOption = "B", 
        plugs = arr);
    let answerStr = "";
    for (const char of string) {
        answerStr += enigma.encrypt(char);
    }
    answerStr = (answerStr).toUpperCase()
    // console.log(enigma.rotors[2])
    return answerStr;
}


function lightUpButton(button) {
    button.classList.add("temp-light");

    setTimeout(() => {
        button.classList.remove("temp-light");
    }, 250);
}

function appendToMessage(letter) {
    const messageField = document.getElementById("messageField");

    if (messageField.value == "Enter Your Message") {
        messageField.value = "";
        outputField.value = "";
    }
    messageField.value += letter;
    const result = startEnigma(messageField.value);
    outputField.value = result;
    const lightButton = document.querySelector(`.light[data-letter="${result.charAt(result.length - 1)}"]`);
    if (lightButton) {
        lightUpButton(lightButton);
    }
}

function enterClick() {
    const messageField = document.getElementById("messageField");
    if (messageField.value == "Enter Your Message") {
        return;
    }
    const result = startEnigma(messageField.value);
    outputField.value = result;
}

function lampBoardError() {
    alert("This is a lampboard!!!")
}

function clearMessageField() {
    const messageField = document.getElementById("messageField");
    const outputField = document.getElementById("outputField");
    if (messageField.value == "Enter Your Message") {
        pass;
    } else {
        messageField.value = "";
        outputField.value = "";
    }
}

function resetDefault() {
    const rotor1 = document.getElementById("rot1");
    const rotor2 = document.getElementById("rot2");
    const rotor3 = document.getElementById("rot3");

    const key1 = document.getElementById("key1");
    const key2 = document.getElementById("key2");
    const key3 = document.getElementById("key3");

    const plug = document.getElementById("plugs");

    rotor1.value = 0;
    rotor2.value = 1;
    rotor3.value = 2;

    key1.value = 0;
    key2.value = 0;
    key3.value = 0;

    plug.value = "";
}