import string

alphabet = string.ascii_lowercase
rotor_codes = {"I":   "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
               "II":  "AJDKSIRUXBLHWTMCQGZNPYFVOE",
               "III": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
               "IV":  "ESOVPZJAYQUIRHXLNFTGKDCMWB",
               "V":   "VZBRGITYUPSDNHLXAWMJQOFECK",}

class Rotor:

    def __init__(self, number_latin, notch):
        self.left = alphabet
        self.right = rotor_codes[number_latin].lower()
        self.notch = notch

    def forward(self, signal):
        letter = self.right[signal]
        signal = self.left.find(letter)
        return signal

    def backward(self, signal):
        letter = self.left[signal]
        signal = self.right.find(letter)
        return signal

    def rotate(self):
        self.left = self.left[1:] + self.left[0]
        self.right = self.right[1:] + self.right[0]

    def rotate_to_pos_or_letter(self, pos=None, letter=None):
        if pos is not None:
            amount = pos
        elif letter is not None:
            amount = alphabet.index(letter)
        else:
            amount = 0
        for i in range(amount):
            self.rotate()

    def __str__(self):
        x = ""
        for i in zip(self.left, self.right):
            x += (i[0] + " -> " + i[1] + "\n")
        return x