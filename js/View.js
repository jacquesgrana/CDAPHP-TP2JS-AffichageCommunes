import { createMarkup } from "./utils/dom.js";
import WeatherLib from "./utils/WeatherLib.js"

/**
 * Classe de la vue.
 */
export default class View {
  constructor() {}

  /**
   * Méthode qui affiche la page.
   */
  render = () => {
    const root = document.getElementById("root");
    const titleH1 = createMarkup("h1", "Communes de France", root, [
      { class: "text-center mt-5 pt-3 text-warning" },
    ]);
    const divContainerDom = createMarkup("div", "", root, [
      { id: "container-inputs" },
      { class: "border border-warning rounded mt-5" },
    ]);

    const divReg = createMarkup("div", "", divContainerDom, [
      { class: " mt-3" },
    ]);
    const labelReg = createMarkup("label", "Région : ", divReg, [
      { class: "h4 text-white me-3" },
      { for: "select-reg" },
    ]);
    const selectReg = createMarkup("select", "", divReg, [
      { id: "select-reg" },
      { name: "select-reg" },
      { class: "form-select form-control select-class text-warning" },
    ]);

    const divDpt = createMarkup("div", "", divContainerDom, [
      { class: " mt-5" },
    ]);
    const labelDpt = createMarkup("label", "Département : ", divDpt, [
      { class: "h4 text-white me-3" },
      { for: "select-reg" },
    ]);
    const selectDpt = createMarkup("select", "", divDpt, [
      { id: "select-dpt" },
      { name: "select-reg" },
      { class: "form-select form-control select-class text-warning" },
    ]);

    const divCmn = createMarkup("div", "", divContainerDom, [
      { class: " mt-5" },
    ]);
    const labelCmn = createMarkup("label", "Commune : ", divCmn, [
      { class: "h4 text-white me-3" },
      { for: "select-reg" },
    ]);
    const selectCmn = createMarkup("select", "", divCmn, [
      { id: "select-cmn" },
      { name: "select-reg" },
      { class: "form-select form-control select-class text-warning" },
    ]);

    const divResult = createMarkup("div", "", divContainerDom, [
      { id: "div-result" },
      { class: "border border-warning rounded mt-5 text-white " },
    ]);
    const cmnName = createMarkup("h2", "Nom : ", divResult, [
      { class: "mt-3" },
    ]);
    const spanCmnName = createMarkup("span", "", cmnName, [
      { class: "text-warning" },
      { id: "cmn-name" },
    ]);
    const cmnPop = createMarkup("h3", "Population : ", divResult, [
      { class: "mt-5" },
    ]);
    const spanCmnPop = createMarkup("span", "", cmnPop, [
      { class: "text-warning" },
      { id: "cmn-pop" },
    ]);
    const cmnCP = createMarkup("h4", "Code Postal : ", divResult, [
      { class: "mt-5" },
    ]);
    const spanCmnCP = createMarkup("span", "", cmnCP, [
      { class: "text-warning" },
      { id: "cmn-cp" },
    ]);
    const cmnInsee = createMarkup("h5", "Code Insee : ", divResult, [
      { class: "mt-5" },
    ]);
    const spanCmnInsee = createMarkup("span", "", cmnInsee, [
      { class: "text-warning" },
      { id: "cmn-insee" },
    ]);
    const divMeteo = createMarkup("div", "", divResult, [
      { class: "d-flex justify-content-center flex-column" },
      { id: "div-meteo" },
    ]);
  };

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
  };

  createClickListenerMeteoBtn = (callBack) => {
    const divMeteo = document.getElementById("div-meteo");
    if (divMeteo.innerHTML !== "") {
      const buttonMeteo = document.getElementById("btn-meteo");
      buttonMeteo.addEventListener("click", (event) => callBack(event));
    }
  };

  /**
   * Méthode qui rempli le select des régions avec les options issues du tableau "regs".
   * @param {[Reg]} regs
   */
  fillAndRenderSelectReg = (regs) => {
    const selectReg = document.getElementById("select-reg");
    createMarkup("option", "-- Choisir une Région --", selectReg, [
      { value: "empty" },
      { class: "options" },
    ]);
    regs.forEach((r) => {
      createMarkup("option", r.nom, selectReg, [
        { value: r.code },
        { class: "options" },
      ]);
    });
  };

  /**
   * Méthode qui rempli le select des départements avec les options issues du tableau "dpts".
   * @param {[Dpt]} dpts
   */
  fillAndRenderSelectDpt = (dpts) => {
    const selectDpt = document.getElementById("select-dpt");
    createMarkup("option", "-- Choisir un Département --", selectDpt, [
      { value: "empty" },
      { class: "options" },
    ]);
    dpts.forEach((d) => {
      createMarkup("option", d.nom, selectDpt, [
        { value: d.code },
        { class: "options" },
      ]);
    });
  };

  /**
   * Méthode qui rempli le select des communes avec les options issues du tableau "cmns".
   * @param {[Cmn]} cmns
   */
  fillAndRenderSelectCmn = (cmns) => {
    const selectCmn = document.getElementById("select-cmn");
    createMarkup("option", "-- Choisir une Commune --", selectCmn, [
      { value: "empty" },
      { class: "options" },
    ]);
    cmns.forEach((c) => {
      createMarkup("option", c.nom, selectCmn, [
        { value: c.code },
        { class: "options" },
      ]);
    });
  };

  /**
   * Méthode qui vide le contenu du select des régions.
   */
  resetSelectReg = () => {
    const selectReg = document.getElementById("select-reg");
    selectReg.innerHTML = "";
  };

  /**
   * Méthode qui vide le contenu du select des départements.
   */
  resetSelectDpt = () => {
    const selectDpt = document.getElementById("select-dpt");
    selectDpt.innerHTML = "";
  };

  /**
   * Méthode qui vide le contenu du select des communes.
   */
  resetSelectCmn = () => {
    const selectCmn = document.getElementById("select-cmn");
    selectCmn.innerHTML = "";
    // TODO : vider div meteo
  };

  /**
   * Méthode qui affiche la commune "cmn" dans la div du bas qui affiche la commune choisie.
   * @param {Cmn} cmn
   */
  renderSelectedCmn = (cmn, callBack) => {
    const cmnName = document.getElementById("cmn-name");
    cmnName.innerHTML = cmn.nom;
    const cmnPop = document.getElementById("cmn-pop");
    cmnPop.innerHTML = cmn.pop;
    const cmnCp = document.getElementById("cmn-cp");
    cmnCp.innerHTML = +cmn.cp;
    const cmnInsee = document.getElementById("cmn-insee");
    cmnInsee.innerHTML = cmn.code; //cmn-insee
    this.renderBtnMeteo();
    this.createClickListenerMeteoBtn(callBack);
    this.enableMeteo();
  };

  renderEphemerid = (ephemeridDatas) => {
    console.log("view : render ephemerid datas : ", ephemeridDatas);
    const divMeteo = document.getElementById("div-meteo");
    //console.log("view 220 : divMeteo.innerHTML :", divMeteo.innerHTML);
    divMeteo.innerHTML = "";
    const titleGeo = createMarkup("h5", "Données géographiques", divMeteo, [
      { class: "mt-5 mb-3 text-warning" },
    ]);
    const divGeo = createMarkup("div", "", divMeteo, [
      {
        class: "d-flex justify-content-center flex-column align-items-start",
      },
    ]);
    const latitude = createMarkup("p", "Latitude (°) : ", divGeo, [{class: "mx-4"}]);
    const spanLatitude = createMarkup(
      "span",
      `${ephemeridDatas.city.latitude}`,
      latitude,
      [{ class: "text-warning" }, { id: "latitude" }]
    );
    const longitude = createMarkup("p", "Longitude (°) : ", divGeo, [{class: "mx-4"}]);
    const spanCmnInsee = createMarkup(
      "span",
      `${ephemeridDatas.city.longitude}`,
      longitude,
      [{ class: "text-warning" }, { id: "longitude" }]
    );
    const altitude = createMarkup("p", "Altitude (m) : ", divGeo, [{class: "mx-4"}]);
    const spanAltitude = createMarkup(
      "span",
      `${ephemeridDatas.city.altitude}`,
      altitude,
      [{ class: "text-warning" }, { id: "altitude" }]
    );
    const titleEphem = createMarkup("h5", "Ephéméride", divMeteo, [
      { class: "mt-3 mb-3 text-warning" },
    ]);
    const divEphem = createMarkup("div", "", divMeteo, [
      {
        class: "d-flex justify-content-center flex-column align-items-start",
      },
    ]);
    const diffDurationDay = createMarkup(
      "p",
      "Variation du jour (minute) : ",
      divEphem, [{class: "mx-4"}]
    );
    const spanDiffDD = createMarkup(
      "span",
      `${ephemeridDatas.ephemeride.diff_duration_day}`,
      diffDurationDay,
      [{ class: "text-warning" }, { id: "diff-duration-day" }]
    );
    const durationDay = createMarkup(
      "p",
      "Durée du jour (heure:minute) : ",
      divEphem, [{class: "mx-4"}]
    );
    const spanDurationD = createMarkup(
      "span",
      `${ephemeridDatas.ephemeride.duration_day}`,
      durationDay,
      [{ class: "text-warning" }, { id: "duration-day" }]
    );
    const sunrise = createMarkup(
      "p",
      "Lever du jour (heure:minute) : ",
      divEphem, [{class: "mx-4"}]
    );
    const spanSunrise = createMarkup(
      "span",
      `${ephemeridDatas.ephemeride.sunrise}`,
      sunrise,
      [{ class: "text-warning" }, { id: "sunrise" }]
    );
    const sunset = createMarkup("p", "Fin du jour (heure:minute) : ", divEphem, [{class: "mx-4"}]);
    const spanSunset = createMarkup(
      "span",
      `${ephemeridDatas.ephemeride.sunset}`,
      sunset,
      [{ class: "text-warning" }, { id: "sunset" }]
    );
  }

  renderMeteo = (meteoDatas) => {
    console.log("view 303 : render meteo datas : ", meteoDatas);
    const divMeteo = document.getElementById("div-meteo");
    //console.log("view 220 : divMeteo.innerHTML :", divMeteo.innerHTML);
    //divMeteo.innerHTML = "";
    const titleMeteo = createMarkup("h5", "Données météorologiques", divMeteo, [
      { class: "mt-3 mb-3 text-warning" },
    ]);
    const divMeteoMeteo = createMarkup("div", "", divMeteo, [
      {
        class: "d-flex justify-content-center flex-column align-items-start",
      },
    ]);
    const weather = createMarkup("p", "Temps : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanWeather = createMarkup(
      "span",
      `${WeatherLib.getWeatherNameByCode(meteoDatas.forecast.weather)}`,
      weather,
      [{ class: "text-warning" }, { id: "weather" }]
    );
    const tempMin = createMarkup("p", "Température min. (°C) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanTempMin = createMarkup(
      "span",
      `${meteoDatas.forecast.tmin}`,
      tempMin,
      [{ class: "text-warning" }, { id: "temp-min" }]
    );
    const tempMax = createMarkup("p", "Température max. (°C) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanTempMax = createMarkup(
      "span",
      `${meteoDatas.forecast.tmax}`,
      tempMax,
      [{ class: "text-warning" }, { id: "temp-max" }]
    );
    const sunHours = createMarkup("p", "Heures d'ensoleillement (heure) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanSunHours = createMarkup(
      "span",
      `${meteoDatas.forecast.sun_hours}`,
      sunHours,
      [{ class: "text-warning" }, { id: "sun-hours" }]
    );
    const probaRain = createMarkup("p", "Probabilité de pluie (%) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanProbaRain = createMarkup(
      "span",
      `${meteoDatas.forecast.probarain}`,
      probaRain,
      [{ class: "text-warning" }, { id: "proba-rain" }]
    );
    const probaFrost = createMarkup("p", "Probabilité de gel (%) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanProbaFrost = createMarkup(
      "span",
      `${meteoDatas.forecast.probafrost}`,
      probaFrost,
      [{ class: "text-warning" }, { id: "proba-frost" }]
    );
    const probaFog = createMarkup("p", "Probabilité de brouillard (%) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanProbaFog = createMarkup(
      "span",
      `${meteoDatas.forecast.probafog}`,
      probaFog,
      [{ class: "text-warning" }, { id: "proba-fog" }]
    );

    const probaWind70 = createMarkup("p", "Probabilité de vent > 70 km/h (%) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanProbaWind70 = createMarkup(
      "span",
      `${meteoDatas.forecast.probawind70}`,
      probaWind70,
      [{ class: "text-warning" }, { id: "proba-wind-70" }]
    );
    const probaWind100 = createMarkup("p", "Probabilité de vent > 100 km/h (%) : ", divMeteoMeteo, [{class: "mx-4"}]);
    const spanProbaWind100 = createMarkup(
      "span",
      `${meteoDatas.forecast.probawind100}`,
      probaWind100,
      [{ class: "text-warning" }, { id: "proba-wind-100" }]
    );
  }

  /**
{
    "city": {
        "insee": "35238",
        "cp": 35000,
        "name": "Rennes",
        "latitude": 48.112,
        "longitude": -1.6819,
        "altitude": 38
    },
    "update": "2020-10-29T12:40:08+0100",
    "forecast": {
        "insee": "35238",
        "cp": 35000,
        "latitude": 48.112,
        "longitude": -1.6819,
        "day": 0,
        "datetime": "2020-10-29T01:00:00+0100",
        "wind10m": 15,
        "gust10m": 49,
        "dirwind10m": 230,
        "rr10": 0.2,
        "rr1": 0.3,
        "probarain": 40,
        "weather": 4,
        "tmin": 11,
        "tmax": 17,
        "sun_hours": 1,
        "etp": 1,
        "probafrost": 0,
        "probafog": 0,
        "probawind70": 0,
        "probawind100": 0,
        "gustx": 49
    }
}
   */

  /**
   * Méthode qui remet à l'état initial la div du bas qui affiche la commune choisie.
   */
  resetDisplayedCmn = () => {
    document.getElementById("cmn-name").innerHTML = "";
    document.getElementById("cmn-pop").innerHTML = "";
    document.getElementById("cmn-cp").innerHTML = "";
    document.getElementById("cmn-insee").innerHTML = "";
    this.disableMeteo();
  };

  enableMeteo = () => {
    const btnMeteo = document.getElementById("btn-meteo");
    if (btnMeteo) btnMeteo.removeAttribute("disabled");
  };

  disableMeteo = () => {
    const btnMeteo = document.getElementById("btn-meteo");
    if (btnMeteo) btnMeteo.setAttribute("disabled", true);
  };

  resetDisplayMeteo = () => {
    const divMeteo = document.getElementById("div-meteo");
    divMeteo.innerHTML = "";
  };

  resetMeteoDivIfnotEmpty = () => {
    const divMeteo = document.getElementById("div-meteo");
    if (divMeteo.innerHTML) this.resetDisplayMeteo();
  };

  renderBtnMeteo = () => {
    const divMeteo = document.getElementById("div-meteo");
    //console.log('view : divMeteo.innerHTML', divMeteo.innerHTML.toString());

    const buttonMeteo = createMarkup(
      "button",
      "Afficher les données supplémentaires",
      divMeteo,
      [
        { class: "btn btn-warning mt-4 px-4" },
        { id: "btn-meteo" },
        { type: "button" },
      ]
    );
  };

  toggleBtnMeteoText = (isMeteoDivOpened) => {
    console.log("view 350 : appel fonction toggleBtn");
    const btnMeteo = document.getElementById("btn-meteo");
    if (isMeteoDivOpened) {
      btnMeteo.textContent = "Masquer les données supplémentaires";
    } else {
      btnMeteo.textContent = "Afficher les données supplémentaires";
    }
  };
}
