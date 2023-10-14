import string

reflector_codes = {"A": "EJMZALYXVBWFCRQUONTSPIKHGD",
                   "B": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
                   "C": "FVPJIAOYEDRZXWGCTKUQSBNMHL",}

class Reflector:

    def __init__(self, code):
        self.main_dict = dict(zip(string.ascii_lowercase, reflector_codes[code].lower()))

    def reflect(self, letter):
        return self.main_dict[letter]