/**
 * Classe des régions.
 */
export default class Reg {
    #nom
    #code

    constructor(nom, code) {
        this.#code = code;
        this.#nom = nom;
    }

    /**
     * Getters et Setters
     */
    get nom() {
        return this.#nom;
    }

    set nom(newNom) {
        this.#nom = newNom;
    }

    get code() {
        return this.#code;
    }

    set code(newCode) {
        this.#code = newCode;
    }
}