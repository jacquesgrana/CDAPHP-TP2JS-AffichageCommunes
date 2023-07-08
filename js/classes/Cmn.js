import Reg from "./Reg.js"

/**
 * Classe des communes.
 */
export default class Cmn extends Reg {

    #cp;
    #pop;
    constructor(nom, code, cp, pop) {
        super(nom, code);
        this.#cp = cp;
        this.#pop = pop;
    }

    /**
     * Getters et Setters.
     */
    get cp() {
        return this.#cp;
    }

    set cp(newCp) {
        this.#cp = newCp;
    }

    get pop() {
        return this.#pop;
    }

    set pop(newPop) {
        this.#pop = newPop;
    }
}