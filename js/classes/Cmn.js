import Reg from "./Reg.js"

/**
 * Classe des communes.
 */
export default class Cmn extends Reg {

    #cp;
    #pop;
    #latitude;
    #longitude;
    #altitude;
    constructor(nom, code, cp, pop, latitude, longitude, altitude) {
        super(nom, code);
        this.#cp = cp;
        this.#pop = pop;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#altitude = altitude;
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

    get latitude() {
        return this.#latitude;
    }

    set latitude(newLatitude) {
        this.#latitude = newLatitude;
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(newLongitude) {
        this.#longitude = newLongitude;
    }

    get altitude() {
        return this.#altitude;
    }

    set altitude(newAltitude) {
        this.#altitude = newAltitude;
    }
}

/*
"latitude": 48.112,
			"longitude": -1.6819,
			"altitude": 38,
*/