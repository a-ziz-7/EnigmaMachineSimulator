const Plugboard = require('./plugboard'); // Adjust the path accordingly
const Rotor = require('./rotor'); // Adjust the path accordingly
const Reflector = require('./reflector'); // Adjust the path accordingly
const Enigma = require('./enigma'); // Adjust the path accordingly

function createEnigma(rotorOption = ["I", "II", "III"], keyOption = "AAA", reflectorOption = "B", plugs = []) {

    const plugboard = new Plugboard(plugs);

    const rotorI = new Rotor("I", "Q");
    const rotorII = new Rotor("II", "E");
    const rotorIII = new Rotor("III", "V");
    const rotorIV = new Rotor("IV", "J");
    const rotorV = new Rotor("V", "Z");

    const rotorDict = {
        "I": rotorI,
        "II": rotorII,
        "III": rotorIII,
        "IV": rotorIV,
        "V": rotorV,
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

    // keyOption = keyOption.toLowerCase();

    // machine.setKeys(keyOption);

    return machine;
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let used = true;

function startEnigma() {
    if (used) {
        const enigma = createEnigma();
        rl.question("Secret Text: ", (secret) => {
            let answerStr = "";
            for (const char of secret) {
                console.log(char);
                answerStr += enigma.encrypt(char);
            }
            console.log("Encrypted message: " + answerStr);
            if (enigma.rotors[2].left[0] === "a") {
                used = false;
            }
            startEnigma();
        });
    } else {
        rl.close();
    }
}

startEnigma();
