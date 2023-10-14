import string

alphabet = string.ascii_lowercase

class Plugboard:

    def __init__(self, changes=[]):
        self.main_dict = dict(zip(alphabet, alphabet))
        for pair in changes:
            self.main_dict[pair[0]] = pair[1]
            self.main_dict[pair[1]] = pair[0]

    def pass_(self, letter):
        return self.main_dict[letter]