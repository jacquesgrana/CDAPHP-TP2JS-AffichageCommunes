import { createMarkup } from "./utils/dom.js"

/**
 * Classe de la vue.
 */
export default class View {
    
    constructor() {
    }
    
    /**
     * Méthode qui affiche la page.
     */
    render = () => {
        const root = document.getElementById("root");
        const titleH1 = createMarkup("h1", "Communes de France", root, [{class: "text-center mt-5 pt-3 text-warning"}]);
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
        const cmnName = createMarkup("h2", "Nom : ", divResult, [{class: "mt-3"}]);
        const spanCmnName = createMarkup("span", "", cmnName, [{class: "text-warning"}, {id: "cmn-name"}]);
        const cmnPop = createMarkup("h3", "Population : ", divResult, [{class: "mt-5"}]);
        const spanCmnPop = createMarkup("span", "", cmnPop, [{class: "text-warning"}, {id: "cmn-pop"}]);
        const cmnCP = createMarkup("h4", "Code Postal : ", divResult, [{class: "mt-5"}]);
        const spanCmnCP = createMarkup("span", "", cmnCP, [{class: "text-warning"}, {id: "cmn-cp"}]);
    }

    /**
     * Méthode qui créé les listeners de l'événement "change" sur les trois select.
     * @param {function} callBack : callback du controleur.
     */
    createOnChangeListeners = (callBack) => {
        const selectReg = document.getElementById("select-reg");
        selectReg.addEventListener("change", (event) => callBack("Reg", event));
        const selectDpt = document.getElementById("select-dpt");
        selectDpt.addEventListener("change", (event) => callBack("Dpt", event));
        const selectCmn = document.getElementById("select-cmn");
        selectCmn.addEventListener("change", (event) => callBack("Cmn", event));
    }

    /**
     * Méthode qui rempli le select des régions avec les options issues du tableau "regs".
     * @param {[Reg]} regs 
     */
    fillAndRenderSelectReg = (regs) => {
        const selectReg = document.getElementById("select-reg");
        createMarkup("option", "-- Choisir une Région --", selectReg, [{value: "empty"}, {class: "options"}]);
        regs.forEach(r => {
            createMarkup("option", r.nom, selectReg, [{value: r.code}, {class: "options"}]);
        });
    }

    /**
     * Méthode qui rempli le select des départements avec les options issues du tableau "dpts".
     * @param {[Dpt]} dpts 
     */
    fillAndRenderSelectDpt = (dpts) => {
        const selectDpt = document.getElementById("select-dpt");
        createMarkup("option", "-- Choisir un Département --", selectDpt, [{value: "empty"}, {class: "options"}]);
        dpts.forEach(d => {
            createMarkup("option", d.nom, selectDpt, [{value: d.code}, {class: "options"}]);
        });
    }

    /**
     * Méthode qui rempli le select des communes avec les options issues du tableau "cmns".
     * @param {[Cmn]} cmns 
     */
    fillAndRenderSelectCmn = (cmns) => {
        const selectCmn = document.getElementById("select-cmn");
        createMarkup("option", "-- Choisir une Commune --", selectCmn, [{value: "empty"}, {class: "options"}]);
        cmns.forEach(c => {
            createMarkup("option", c.nom, selectCmn, [{value: c.code}, {class: "options"}]);
        });
    }

    /**
     * Méthode qui vide le contenu du select des régions.
     */
    resetSelectReg = () => {
        const selectReg = document.getElementById("select-reg");
        selectReg.innerHTML = "";
    }

    /**
     * Méthode qui vide le contenu du select des départements.
     */
    resetSelectDpt = () => {
        const selectDpt = document.getElementById("select-dpt");
        selectDpt.innerHTML = "";
    }

    /**
     * Méthode qui vide le contenu du select des communes.
     */
    resetSelectCmn = () => {
        const selectCmn = document.getElementById("select-cmn");
        selectCmn.innerHTML = "";
    }

    /**
     * Méthode qui affiche la commune "cmn" dans la div du bas qui affiche la commune choisie.
     * @param {Cmn} cmn 
     */
    renderSelectedCmn = (cmn) => {
        const cmnName = document.getElementById("cmn-name");
        cmnName.innerHTML = cmn.nom;
        const cmnPop = document.getElementById("cmn-pop");
        cmnPop.innerHTML = cmn.pop;
        const cmnCp = document.getElementById("cmn-cp");
        cmnCp.innerHTML = + cmn.cp;            
    }

    /**
     * Méthode qui remet à l'état initial la div du bas qui affiche la commune choisie.
     */
    resetDisplayedCmn = () => {
        document.getElementById("cmn-name").innerHTML = "";
        document.getElementById("cmn-pop").innerHTML = "";
        document.getElementById("cmn-cp").innerHTML = "";
    }
}