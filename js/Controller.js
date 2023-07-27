import View from "./View.js";
import Model from "./Model.js";

/**
 * Classe du controleur.
 */
export default class Controller {
  #view;
  #model;

  constructor() {
    this.#view = new View();
    this.#model = new Model();
  }

  /**
   * Méthode d'initialisation
   */
  init = () => {
    this.#model.init();
    this.#model.loadRegs(this.fillSelectReg);
  };

   /**
   * Méthode qui lance l'application.
   */
  run = () => {
    this.#view.render();
    this.#view.createOnChangeListeners(this.onChangeSelect);
    //this.#view.createClickListenerMeteoBtn(this.clickBtnMeteo);
  };

  /**
   * Méthode qui rempli le select des régions à partir du tableau "regs".
   * @param {[Reg]} regs 
   */
  fillSelectReg = (regs) => {
    this.#view.fillAndRenderSelectReg(regs);
  };

  /**
   * Méthode qui rempli le select des départements à partir du tableau "dpts".
   * @param {[Dpt]} dpts 
   */
  fillSelectDpt = (dpts) => {
    this.#view.fillAndRenderSelectDpt(dpts);
  };

  /**
   * Méthode qui rempli le select des communes à partir du tableau "cmns".
   * @param {[Cmn]} cmns 
   */
  fillSelectCmn = (cmns) => {
    this.#view.fillAndRenderSelectCmn(cmns);
  };

  /**
   * Méthode qui gère l'évement "change" des selects selon le select choisi.
   * @param {string} choice 
   * @param {event} event 
   */
  onChangeSelect = (choice, event) => {
    switch (choice) {
        case "Reg" :
            if(event.target.value != 'empty') {
                this.#model.selectedRegCode = event.target.value;
                this.#view.resetSelectDpt();
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayEphem();
                this.#view.resetDisplayMeteo();
                this.#model.isNotDomTom = this.getIsNotDomTom(this.#model.selectedRegCode);
                this.#model.loadDpts(this.fillSelectDpt, this.#model.selectedRegCode);
            }
            else {
                this.#view.resetSelectDpt();
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayEphem();
                this.#view.resetDisplayMeteo();
                this.#model.selectedDptCode = "empty";
                this.#model.selectedCmnCode = "empty";
            }
        break;
        case "Dpt" :
            if(event.target.value != 'empty') {
                this.#model.selectedDptCode = event.target.value;
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayEphem();
                this.#view.resetDisplayMeteo();
                this.#model.loadCmns(this.fillSelectCmn, this.#model.selectedDptCode);
            }
            else {
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayEphem();
                this.#view.resetDisplayMeteo();
                this.#model.selectedCmnCode = "empty";
            }
        break;
        case "Cmn" :
            if(event.target.value != 'empty') {
                this.#model.selectedCmnCode = event.target.value;
                this.#model.loadCmnToDisplay(this.displaySelectedCmn, this.#model.selectedCmnCode);
                this.#view.resetDisplayEphem();
                this.#view.resetDisplayMeteo();
            }
            else {
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayEphem();
                this.#view.resetDisplayMeteo();
            }
        break;
    }
  }

  /**
   * Méthode qui renvoie vrai si la région est métropolitaine, faux si dom-tom.
   * @param {string} regionCode 
   * @returns 
   */
  getIsNotDomTom = (regionCode) => {
    let toReturn = true;
    if(regionCode === "01" || regionCode === "02" || regionCode === "03" || regionCode === "04" || regionCode === "06") {
      toReturn = false;
    }
    else {
      toReturn = true;
    }
    return toReturn;
  }

  /**
   * Méthode qui fait afficher à la vue la commune "cmn".
   * @param {Cmn} cmnToDisplay 
   */
  displaySelectedCmn = (cmnToDisplay) => {
    this.#view.renderSelectedCmn(cmnToDisplay);
    if(this.#model.isNotDomTom) {
      this.#model.loadEphemerid(this.displayEphemerid, this.#model.ephemeridDatas, this.#model.selectedCmnCode);
      this.#model.loadMeteo(this.displayMeteo, this.#model.meteoDatas, this.#model.selectedCmnCode);
      /*
      setTimeout(() => {
        this.#model.loadMeteo(this.displayMeteo, this.#model.meteoDatas, this.#model.selectedCmnCode);
      }, 500);
      */
    }
  }

  /**
   * Méthode qui lance l'affichage de l'éphéméride.
   * @param {json} ephemeridDatas : données à afficher.
   */
  displayEphemerid = (ephemeridDatas) => {
    this.#model.selectedCmn.latitude = ephemeridDatas.city.latitude;
    this.#model.selectedCmn.longitude = ephemeridDatas.city.longitude;
    this.#model.selectedCmn.altitude = ephemeridDatas.city.altitude;
    this.#view.renderEphemerid(ephemeridDatas);
  }

  /**
   * Méthode qui lance l'affichage de l'éphéméride.
   * @param {json} meteoDatas : données à afficher.
   */
  displayMeteo = (meteoDatas) => {
    this.#view.renderMeteo(meteoDatas);
  }
  

}
