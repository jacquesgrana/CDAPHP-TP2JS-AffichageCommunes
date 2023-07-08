import Reg from "./classes/Reg.js";
import Dpt from "./classes/Dpt.js";
import Cmn from "./classes/Cmn.js";

export default class Model {
  #regs;
  #dpts;
  #cmns;

  #selectedRegCode;
  #selectedDptCode;
  #selectedCmnCode;
  #selectedCmn;

  constructor(controller) {
    this.controller = controller;
  }

  init = () => {
    this.#regs = [];
    this.#dpts = [];
    this.#cmns = [];
    this.#selectedRegCode = "empty";
    this.#selectedDptCode = "empty";
    this.#selectedCmnCode = "empty";
    this.#selectedCmn = {};
  };

  loadRegs = (fillSelectReg) => {
    fetch("https://geo.api.gouv.fr/regions", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.#regs = [];
        data.forEach((reg) => {
          this.#regs.push(new Reg(reg.nom, reg.code));
        });
        fillSelectReg(this.#regs);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  loadDpts = (fillSelectDpt, codeReg) => {
    fetch(`https://geo.api.gouv.fr/regions/${codeReg}/departements`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.#dpts = [];
        data.forEach((dpt) => {
          this.#dpts.push(new Dpt(dpt.nom, dpt.code));
        });
        fillSelectDpt(this.#dpts);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  loadCmns = (fillSelectCmn, codeDpt) => {
    fetch(`https://geo.api.gouv.fr/departements/${codeDpt}/communes`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.#cmns = [];
        data.forEach((cmn) => {
          this.#cmns.push(
            new Cmn(cmn.nom, cmn.code, cmn.codesPostaux[0], cmn.population)
          );
        });
        fillSelectCmn(this.#cmns);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  loadCmnToDisplay = (callback, code) => {
    this.#selectedCmnCode = code;
    fetch(`https://geo.api.gouv.fr/communes/${this.#selectedCmnCode}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.#selectedCmn = new Cmn(
            data.nom,
            data.code,
            data.codesPostaux[0],
            data.population
        );
        callback(this.#selectedCmn);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  /**
   * Getters et Setters.
   */
  get regs() {
    return this.#regs;
  }

  set regs(newRegs) {
    this.#regs = newRegs;
  }

  get dpts() {
    return this.#dpts;
  }

  set dpts(newDpts) {
    this.#dpts = newDpts;
  }

  get cmns() {
    return this.#cmns;
  }

  set cmns(newCmns) {
    this.#cmns = newCmns;
  }

  get selectedRegCode() {
    return this.#selectedRegCode;
  }

  set selectedRegCode(newSelectedRegCode) {
    this.#selectedRegCode = newSelectedRegCode;
  }

  get selectedDptCode() {
    return this.#selectedDptCode;
  }

  set selectedDptCode(newSelectedDptCode) {
    this.#selectedDptCode = newSelectedDptCode;
  }

  get selectedCmnCode() {
    return this.#selectedCmnCode;
  }

  set selectedCmnCode(newSelectedCmnCode) {
    this.#selectedCmnCode = newSelectedCmnCode;
  }

  get selectedCmn() {
    return this.#selectedCmn;
  }

  set selectedCmn(newSelectedCmn) {
    this.#selectedCmn = newSelectedCmn;
  }
}
