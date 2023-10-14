import string

alphabet = string.ascii_lowercase

class Enigma:

    def __init__(self, plugboard, rotors, reflector):
        self.plugboard = plugboard
        self.rotors = rotors
        self.reflector = reflector

    def set_keys(self, key):
        for i in range(3):
            self.rotors[i].rotate_to_pos_or_letter(letter=key[i])

    def encrypt(self, letter):
        if self.rotors[1].left[0] == self.rotors[1].notch and self.rotors[2].left[0] == self.rotors[2].notch:
            for i in range(3):
                self.rotors[i].rotate()
        elif self.rotors[1].left[0] == self.rotors[1].notch:
            for i in range(3):
                self.rotors[i].rotate()
        elif self.rotors[2].left[0] == self.rotors[2].notch:
            for i in range(1,3):
                self.rotors[i].rotate()
        else:
            for i in range(2,3):
                self.rotors[i].rotate()
        if letter not in string.ascii_letters:
            return ""
        letter = letter.lower()
        print("Original: " + letter)
        letter = self.plugboard.pass_(letter)
        print("After plugboard: " + letter)
        letter = self.rotor_pass(letter, True)
        print("After 3 forward passes in rotors: " + letter)
        letter = self.reflector.reflect(letter)
        print("After reflector: " + letter)
        letter = self.rotor_pass(letter, False)
        print("After 3 backward passes in rotors: " + letter)
        letter = self.plugboard.pass_(letter)
        print("After plugboard: " + letter)
        return letter

    def decrypt(self, letter):
        return self.encrypt(letter)

    def rotor_pass(self, letter, forward):
        signal = alphabet.find(letter)
        for i in range(3):
            if forward:
                index = 2-i
                signal = self.rotors[index].forward(signal)
            else:
                signal = self.rotors[i].backward(signal)
            print("Pass " + str(i) +": " + alphabet[signal])
        return alphabet[signal]