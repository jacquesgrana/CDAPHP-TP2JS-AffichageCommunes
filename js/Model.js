import Reg from "./classes/Reg.js";
import Dpt from "./classes/Dpt.js";
import Cmn from "./classes/Cmn.js";

/**
 * Classe du modèle.
 */
export default class Model {
  #regs;
  #dpts;
  #cmns;
  #endPointGeoApi = "https://geo.api.gouv.fr";
  #endPointMeteoConcept = "https://api.meteo-concept.com";
  #tokenMeteoConcept = "06a3e3f2f54d0caa80e3915bca02c559b6d425804cd52155164e57c6d48bd43e";
  #selectedRegCode;
  #selectedDptCode;
  #selectedCmnCode;
  #selectedCmn;

  #ephemeridDatas = {};
  #meteoDatas = {};
  #isMeteoDivOpened = false;
  #isNotDomTom = true;

  constructor() {
  }

  /**
   * Méthode d'initialisation.
   */
  init = () => {
    this.#regs = [];
    this.#dpts = [];
    this.#cmns = [];
    this.#selectedRegCode = "empty";
    this.#selectedDptCode = "empty";
    this.#selectedCmnCode = "empty";
    this.#selectedCmn = {};
  };

  /**
   * Méthode qui récupère la liste des régions par une requête sur geo.api.gouv.fr 
   * et appelle la fonction de callback qui remplie le select correspondant à partir 
   * des données récupérées.
   * @param {function} fillSelectReg : callback du controleur.
   */
  loadRegs = (fillSelectReg) => {
    fetch(`${this.#endPointGeoApi}/regions`, {
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

  /**
   * Méthode qui récupère la liste des départements d'une reqion par une requête sur 
   * geo.api.gouv.fr et appelle la fonction de callback qui rempli le select correspondant 
   * à partir des données récupérées.
   * @param {function} fillSelectDpt : callback du controleur.
   * @param {number} codeReg : code de la région.
   */
  loadDpts = (fillSelectDpt, codeReg) => {
    fetch(`${this.#endPointGeoApi}/regions/${codeReg}/departements`, {
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

  /**
   * Méthode qui récupère la liste des communes d'un département par une requête sur
   * geo.api.gouv.fr et appelle la fonction de callback qui rempli le select correspondant 
   * à partir des données récupérées.
   * @param {function} fillSelectCmn : callback du controleur.
   * @param {number} codeDpt : code du département.
   */
  loadCmns = (fillSelectCmn, codeDpt) => {
    fetch(`${this.#endPointGeoApi}/departements/${codeDpt}/communes`, {
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

   /**
   * Méthode qui récupère une commune d'un département par une requête sur 
   * geo.api.gouv.fr et appelle la fonction de callback qui rempli la div 
   * qui affiche la commune.
   * @param {function} callback : callback du controleur.
   * @param {number} code : code insee de la commune.
   */
  loadCmnToDisplay = (callback, code) => {
    this.#selectedCmnCode = code;
    fetch(`${this.#endPointGeoApi}/communes/${this.#selectedCmnCode}`, {
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
            data.population,
            undefined,
            undefined,
            undefined
        );
        callback(this.#selectedCmn);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  };

  /**
   * Méthode qui récupère l'éphéméride depuis api.meteo-concept.com suivant 
   * le code insee de la commune et le stocke dans le modèle.
   * @param {*} callBack : callback du controleur.
   * @param {*} ephemeridDatas : données à mettre à jour ************** garder?
   * @param {*} cmnInsee : code insee de la commune
   */
  loadEphemerid = (callBack, ephemeridDatas, cmnInsee) => {
    const headers = new Headers();
    //headers.append('Authorization', `Bearer ${this.#tokenMeteoConcept}`);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    //const url = `${this.#endPointMeteoConcept}/api/ephemeride/1?insee=${cmnInsee}`;
    const url = `${this.#endPointMeteoConcept}/api/ephemeride/1?token=${this.#tokenMeteoConcept}&insee=${cmnInsee}`;
    
    fetch(url, {
      headers: headers,
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      this.#ephemeridDatas = data;
      ephemeridDatas = data;
      callBack(this.#ephemeridDatas);
    })
    .catch(error => {
      console.error("error :", error);
    });
  }

  /**
   * Méthode qui récupère l'éphéméride depuis api.meteo-concept.com suivant 
   * le code insee de la commune et le stocke dans le modèle.
   * @param {*} callBack 
   * @param {*} meteoDatas 
   * @param {*} cmnInsee 
   */
  loadMeteo = (callBack, meteoDatas, cmnInsee) => {
      // https://api.meteo-concept.com/api/forecast/daily/0?token=MON_TOKEN&insee=35238
    const headers = new Headers();
    //headers.append('Authorization', `Bearer ${this.#tokenMeteoConcept}`);
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    //const url = `${this.#endPointMeteoConcept}/api/ephemeride/1?insee=${cmnInsee}`;
    const url = `${this.#endPointMeteoConcept}/api/forecast/daily/0?token=${this.#tokenMeteoConcept}&insee=${cmnInsee}`;

    fetch(url, {
      headers: headers,
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      this.#meteoDatas = data;
      meteoDatas = data;
      callBack(this.#meteoDatas);
    })
    .catch(error => {
      console.error("error :", error);
    });
  }

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

  get ephemeridDatas() {
    return this.#ephemeridDatas;
  }

  set ephemeridDatas(newValue) {
    this.#ephemeridDatas = newValue;
  }

  get meteoDatas() {
    return this.#meteoDatas;
  }

  set meteoDatas(newValue) {
    this.#meteoDatas = newValue;
  }

  get isMeteoDivOpened() {
    return this.#isMeteoDivOpened;
  }

  set isMeteoDivOpened(newValue) {
    this.#isMeteoDivOpened = newValue;
  }

  get isNotDomTom() {
    return this.#isNotDomTom;
  }

  set isNotDomTom(newValue) {
    this.#isNotDomTom = newValue;
  }
}