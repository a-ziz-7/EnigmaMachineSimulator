from plugboard import Plugboard
from rotor import Rotor
from reflector import Reflector
from enigma import Enigma

def create_enigma(rotor_option=["I", "II", "III"], key_option="AAA", reflector_option="B", plugs=[]):
    plugboard = Plugboard(changes=plugs)

    rotor_I = Rotor(number_latin="I", notch="Q")
    rotor_II = Rotor(number_latin="II", notch="E")
    rotor_III = Rotor(number_latin="III", notch="V")
    rotor_IV = Rotor(number_latin="IV", notch="J")
    rotor_V = Rotor(number_latin="V", notch="Z")

    rotor_dict = {"I": rotor_I, "II": rotor_II, "III": rotor_III,
                  "IV": rotor_IV, "V": rotor_V}

    final_rotors = [rotor_dict[rotor_option[0]], rotor_dict[rotor_option[1]], rotor_dict[rotor_option[2]]]
    print("Final rotors: " + str(final_rotors))

    reflector_A = Reflector("A")
    reflector_B = Reflector("B")
    reflector_C = Reflector("C")

    reflector_dict = {"A":reflector_A, "B": reflector_B, "C":reflector_C}

    final_reflector = reflector_dict[reflector_option]

    machine = Enigma(plugboard, final_rotors, final_reflector)

    key_option = key_option.lower()

    machine.set_keys(key_option)

    return machine

if __name__ == '__main__':
    enigma = create_enigma()
    secret = input("Secret Text: ")
    answer_str = ""
    for i in secret:
        answer_str += enigma.encrypt(i)
    print("Encrypted message: " + answer_str)