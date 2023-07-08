import View from "./View.js";
import Model from "./Model.js";

export default class Controller {
  #view;
  #model;

  constructor() {
    this.#view = new View(this);
    this.#model = new Model(this);
  }

  init = () => {
    this.#model.init();
    this.#model.loadRegs(this.fillSelectReg);
  };

  run = () => {
    this.#view.render();
    this.#view.createOnChangeListeners(this.onChangeSelect);

  };

  fillSelectReg = (regs) => {
    this.#view.fillAndRenderSelectReg(regs);
  };

  fillSelectDpt = (dpts) => {
    this.#view.fillAndRenderSelectDpt(dpts);
  };

  fillSelectCmn = (cmns) => {
    this.#view.fillAndRenderSelectCmn(cmns);
  };

  onChangeSelect = (choice, event) => {
    switch (choice) {
        case "Reg" :
            if(event.target.value != 'empty') {
                this.#model.selectedRegCode = event.target.value;
                this.#view.resetSelectDpt();
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#model.loadDpts(this.fillSelectDpt, this.#model.selectedRegCode);
            }
            else {
                console.log("controller : région non choisie :", this.#model.selectedRegCode);
                this.#view.resetSelectDpt();
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#model.selectedDptCode = "empty";
                this.#model.selectedCmnCode = "empty";
            }
        break;
        case "Dpt" :
            if(event.target.value != 'empty') {
                this.#model.selectedDptCode = event.target.value;
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#model.loadCmns(this.fillSelectCmn, this.#model.selectedDptCode);
            }
            else {
                console.log("controller : dpt non choisi :", this.#model.selectedDptCode);
                this.#view.resetSelectCmn();
                this.#view.resetDisplayedCmn();
                this.#model.selectedCmnCode = "empty";
            }
        break;
        case "Cmn" :
            if(event.target.value != 'empty') {
                this.#model.selectedCmnCode = event.target.value;
                this.#model.loadCmnToDisplay(this.displaySelectedCmn, this.#model.selectedCmnCode);
                
                //this.#view.renderSelectedCmn(cmnToDisplay);
            }
            else {
                this.#view.resetDisplayedCmn();
            }
        break;
    }
  }

  displaySelectedCmn = (cmnToDisplay) => {
    this.#view.renderSelectedCmn(cmnToDisplay);
  }
}
