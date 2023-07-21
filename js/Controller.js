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
                this.#view.resetDisplayMeteo();
                this.#model.loadDpts(this.fillSelectDpt, this.#model.selectedRegCode);
            }
            else {
                console.log("controller : région non choisie :", this.#model.selectedRegCode);
                this.#view.resetSelectDpt();
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
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
                this.#view.resetDisplayMeteo();
                this.#model.loadCmns(this.fillSelectCmn, this.#model.selectedDptCode);
            }
            else {
                console.log("controller : dpt non choisi :", this.#model.selectedDptCode);
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayMeteo();
                this.#model.selectedCmnCode = "empty";
            }
        break;
        case "Cmn" :
            if(event.target.value != 'empty') {
                this.#model.selectedCmnCode = event.target.value;
                this.#model.loadCmnToDisplay(this.displaySelectedCmn, this.#model.selectedCmnCode);
                this.#view.resetMeteoDivIfnotEmpty();
                //this.#view.toggleBtnMeteoText();
            }
            else {
                this.#view.resetDisplayedCmn();
                this.#view.resetDisplayMeteo();
            }
        break;
    }
  }

  clickBtnMeteo = (event) => {
    console.log("controller 113 : clic bouton météo");
    event.preventDefault;
    console.log("controller 115 : this.#model.isMeteoDivOpened :", this.#model.isMeteoDivOpened);
    if(this.#model.isMeteoDivOpened) {
      this.#model.isMeteoDivOpened = false;
      this.#view.resetDisplayMeteo();
      this.#view.renderBtnMeteo();
      this.#view.toggleBtnMeteoText(this.#model.isMeteoDivOpened);
      this.#view.createClickListenerMeteoBtn(this.clickBtnMeteo);
      // TODO changer texte bouton
    }
    else {
      this.#model.isMeteoDivOpened = true;
      this.#model.loadEphemerid(this.displayEphemerid, this.#model.ephemeridDatas, this.#model.selectedCmnCode);
      this.#model.loadMeteo(this.displayMeteo, this.#model.meteoDatas, this.#model.selectedCmnCode)
      // TODO changer texte bouton
    }
    this.#view.toggleBtnMeteoText(this.#model.isMeteoDivOpened);
    
  }

  /**
   * Méthode qui fait afficher à la vue la commune "cmn".
   * @param {Cmn} cmnToDisplay 
   */
  displaySelectedCmn = (cmnToDisplay) => {
    this.#view.renderSelectedCmn(cmnToDisplay, this.clickBtnMeteo);
  }

  displayEphemerid = (ephemeridDatas) => {
    //this.#model.ephemeridDatas = ephemeridDatas;
    this.#model.selectedCmn.latitude = ephemeridDatas.city.latitude;
    this.#model.selectedCmn.longitude = ephemeridDatas.city.longitude;
    this.#model.selectedCmn.altitude = ephemeridDatas.city.altitude;
    
    console.log("controller : affichage de l'ephemeride");
    this.#view.renderEphemerid(ephemeridDatas);
    /*
    this.#view.renderBtnMeteo();
    this.#view.toggleBtnMeteoText(this.#model.isMeteoDivOpened);
    this.#view.createClickListenerMeteoBtn(this.clickBtnMeteo);*/
  }

  displayMeteo = (meteoDatas) => {
    this.#view.renderMeteo(meteoDatas);
    this.#view.renderBtnMeteo();
    this.#view.toggleBtnMeteoText(this.#model.isMeteoDivOpened);
    this.#view.createClickListenerMeteoBtn(this.clickBtnMeteo);
  }
  

}
