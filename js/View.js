import { createMarkup } from "./utils/dom.js"

export default class View {
    
    constructor(controller) {
        this.controller = controller;
    }
    
    render = () => {
        const root = document.getElementById("root");
        const titleH1 = createMarkup("h1", "Affichage des communes de France", root, [{class: "text-center mt-5 pt-3 text-warning"}]);
        const divContainerDom = createMarkup ("div", "", root, [{id: "container-inputs"}, {class: "border border-warning rounded mt-5"}]);
        
        const divReg = createMarkup("div", "", divContainerDom, [{class: " mt-3"}]);
        const labelReg = createMarkup("label", "Région : ", divReg, [{class: "h4 text-white me-3"}, {for: "select-reg"}])
        const selectReg = createMarkup("select", "", divReg, [{id: "select-reg"}, {name: "select-reg"}, {class: "form-select form-control select-class text-warning"}]);
        
        const divDpt = createMarkup("div", "", divContainerDom, [{class: " mt-5"}]);
        const labelDpt = createMarkup("label", "Département : ", divDpt, [{class: "h4 text-white me-3"}, {for: "select-reg"}])
        const selectDpt = createMarkup("select", "", divDpt, [{id: "select-dpt"}, {name: "select-reg"}, {class: "form-select form-control select-class text-warning"}]);
        
        const divCmn = createMarkup("div", "", divContainerDom, [{class: " mt-5"}]);
        const labelCmn = createMarkup("label", "Commune : ", divCmn, [{class: "h4 text-white me-3"}, {for: "select-reg"}])
        const selectCmn = createMarkup("select", "", divCmn, [{id: "select-cmn"}, {name: "select-reg"}, {class: "form-select form-control select-class text-warning"}]);
        
        const divResult = createMarkup("div", "", divContainerDom, [{id: "div-result"}, {class: "border border-warning rounded mt-5 text-white "}]);
        const cmnName = createMarkup("h2", "Nom : ", divResult, [{id: "cmn-name"}, {class: "mt-3"}]);
        const cmnPop = createMarkup("h3", "Population : ", divResult, [{id: "cmn-pop"},{class: "mt-5"}]);
        const cmnCP = createMarkup("h4", "Code Postal : ", divResult, [{id: "cmn-cp"},{class: "mt-5"}]);
    }

    createOnChangeListeners = (callBack) => {
        const selectReg = document.getElementById("select-reg");
        selectReg.addEventListener("change", (event) => callBack("Reg", event));
        const selectDpt = document.getElementById("select-dpt");
        selectDpt.addEventListener("change", (event) => callBack("Dpt", event));
        const selectCmn = document.getElementById("select-cmn");
        selectCmn.addEventListener("change", (event) => callBack("Cmn", event));
    }

    fillAndRenderSelectReg = (regs) => {
        const selectReg = document.getElementById("select-reg");
        createMarkup("option", "-- Choisir une Région --", selectReg, [{value: "empty"}, {class: "options"}]);
        regs.forEach(r => {
            createMarkup("option", r.nom, selectReg, [{value: r.code}, {class: "options"}]);
        });
    }

    fillAndRenderSelectDpt = (dpts) => {
        const selectDpt = document.getElementById("select-dpt");
        createMarkup("option", "-- Choisir un Département --", selectDpt, [{value: "empty"}, {class: "options"}]);
        dpts.forEach(d => {
            createMarkup("option", d.nom, selectDpt, [{value: d.code}, {class: "options"}]);
        });
    }

    fillAndRenderSelectCmn = (cmns) => {
        const selectCmn = document.getElementById("select-cmn");
        createMarkup("option", "-- Choisir une Commune --", selectCmn, [{value: "empty"}, {class: "options"}]);
        cmns.forEach(c => {
            createMarkup("option", c.nom, selectCmn, [{value: c.code}, {class: "options"}]);
        });
    }

    resetSelectReg = () => {
        const selectReg = document.getElementById("select-reg");
        selectReg.innerHTML = "";
    }

    resetSelectDpt = () => {
        const selectDpt = document.getElementById("select-dpt");
        selectDpt.innerHTML = "";
    }

    resetSelectCmn = () => {
        const selectCmn = document.getElementById("select-cmn");
        selectCmn.innerHTML = "";
    }

    renderSelectedCmn = (cmn) => {
        const cmnName = document.getElementById("cmn-name");
        cmnName.innerHTML = "Nom : " + cmn.nom;
        const cmnPop = document.getElementById("cmn-pop");
        cmnPop.innerHTML = "Population : " + cmn.pop;
        const cmnCp = document.getElementById("cmn-cp");
        cmnCp.innerHTML = "Code Postal : " + cmn.cp;            
    }

    resetDisplayedCmn = () => {
        document.getElementById("cmn-name").innerHTML = "Nom : ";
        document.getElementById("cmn-pop").innerHTML = "Population : ";
        document.getElementById("cmn-cp").innerHTML = "Code Postal : ";
    }
}