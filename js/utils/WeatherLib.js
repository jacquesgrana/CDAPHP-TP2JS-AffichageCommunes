export default class WeatherLib {

  /**
   * Méthode qui renvoit la description du temps 'sensible' selon le code passé en paramètre.
   * @param {number} code : code du temps 'sensible' prévu.
   * @returns {string} : description ccorrespondante.
   */
static getWeatherNameByCode = (code) => {
  let toReturn = "";
  switch (code) {
    case 0:
      toReturn = "Soleil";
      break;
    case 1:
      toReturn = "Peu nuageux";
      break;
    case 2:
      toReturn = "Ciel voilé";
      break;
    case 3:
      toReturn = "Nuageux";
      break;
    case 4:
      toReturn = "Très nuageux";
      break;
    case 5:
      toReturn = "Couvert";
      break;
    case 6:
      toReturn = "Brouillard";
      break;
    case 7:
      toReturn = "Brouillard givrant";
      break;

    case 10:
      toReturn = "Pluie faible";
      break;
    case 11:
      toReturn = "Pluie modérée";
      break;
    case 12:
      toReturn = "Pluie forte";
      break;
    case 13:
      toReturn = "Pluie faible verglaçante";
      break;
    case 14:
      toReturn = "Pluie modérée verglaçante";
      break;
    case 15:
      toReturn = "Pluie forte verglaçante";
      break;
    case 16:
      toReturn = "Bruine";
      break;

    case 20:
      toReturn = "Neige faible";
      break;
    case 21:
      toReturn = "Neige modérée";
      break;
    case 22:
      toReturn = "Neige forte";
      break;

    case 30:
      toReturn = "Pluie et neige mêlées faibles";
      break;
    case 31:
      toReturn = "Pluie et neige mêlées modérées";
      break;
    case 32:
      toReturn = "Pluie et neige mêlées fortes";
      break;

    case 40:
      toReturn = "Averses de pluie locales et faibles";
      break;
    case 41:
      toReturn = "Averses de pluie locales";
      break;
    case 42:
      toReturn = "Averses locales et fortes";
      break;
    case 43:
      toReturn = "Averses de pluie faibles";
      break;
    case 44:
      toReturn = "Averses de pluie";
      break;
    case 45:
      toReturn = "Averses de pluie fortes";
      break;
    case 46:
      toReturn = "Averses de pluie faibles et fréquentes";
      break;
    case 47:
      toReturn = "Averses de pluie fréquentes";
      break;
    case 48:
      toReturn = "Averses de pluie fortes et fréquentes";
      break;

    case 60:
      toReturn = "Averses de neige localisées et faibles";
      break;
    case 61:
      toReturn = "Averses de neige localisées";
      break;
    case 62:
      toReturn = "Averses de neige localisées et fortes";
      break;
    case 63:
      toReturn = "Averses de neige faibles";
      break;
    case 64:
      toReturn = "Averses de neige";
      break;
    case 65:
      toReturn = "Averses de neige fortes";
      break;
    case 66:
      toReturn = "Averses de neige faibles et fréquentes";
      break;
    case 67:
      toReturn = "Averses de neige fréquentes";
      break;
    case 68:
      toReturn = "Averses de neige fortes et fréquentes";
      break;

    case 70:
      toReturn = "Averses de pluie et neige mêlées localisées et faibles";
      break;
    case 71:
      toReturn = "Averses de pluie et neige mêlées localisées";
      break;
    case 72:
      toReturn = "Averses de pluie et neige mêlées localisées et fortes";
      break;
    case 73:
      toReturn = "Averses de pluie et neige mêlées faibles";
      break;
    case 74:
      toReturn = "Averses de pluie et neige mêlées";
      break;
    case 75:
      toReturn = "Averses de pluie et neige mêlées fortes";
      break;
    case 76:
      toReturn = "Averses de pluie et neige mêlées faibles et nombreuses";
      break;
    case 77:
      toReturn = "Averses de pluie et neige mêlées fréquentes";
      break;
    case 78:
      toReturn = "Averses de pluie et neige mêlées fortes et fréquentes";
      break;

    case 100:
      toReturn = "Orages faibles et locaux";
      break;
    case 101:
      toReturn = "Orages locaux";
      break;
    case 102:
      toReturn = "Orages forts et locaux";
      break;
    case 103:
      toReturn = "Orages faibles";
      break;
    case 104:
      toReturn = "Orages";
      break;
    case 105:
      toReturn = "Orages forts";
      break;
    case 106:
      toReturn = "Orages faibles et fréquents";
      break;
    case 107:
      toReturn = "Orages fréquents";
      break;
    case 108:
      toReturn = "Orages forts et fréquents";
      break;

    case 120:
      toReturn = "Orages faibles et locaux de neige ou grésil";
      break;
    case 121:
      toReturn = "Orages locaux de neige ou grésil";
      break;
    case 122:
      toReturn = "Orages forts et locaux de neige ou grésil";
      break;
    case 123:
      toReturn = "Orages faibles de neige ou grésil";
      break;
    case 124:
      toReturn = "Orages de neige ou grésil";
      break;
    case 125:
      toReturn = "Orages forts de neige ou grésil";
      break;
    case 126:
      toReturn = "Orages faibles et fréquents de neige ou grésil";
      break;
    case 127:
      toReturn = "Orages fréquents de neige ou grésil";
      break;
    case 128:
      toReturn = "Orages forts et fréquents de neige ou grésil";
      break;

    case 130:
      toReturn = "Orages faibles et locaux de pluie et neige mêlées ou grésil";
      break;
    case 131:
      toReturn = "Orages locaux de pluie et neige mêlées ou grésil";
      break;
    case 132:
      toReturn = "Orages fort et locaux de pluie et neige mêlées ou grésil";
      break;
    case 133:
      toReturn = "Orages faibles de pluie et neige mêlées ou grésil";
      break;
    case 134:
      toReturn = "Orages de pluie et neige mêlées ou grésil";
      break;
    case 135:
      toReturn = "Orages forts de pluie et neige mêlées ou grésil";
      break;
    case 136:
      toReturn = "Orages faibles et fréquents de pluie et neige mêlées ou grésil";
      break;
    case 137:
      toReturn = "Orages fréquents de pluie et neige mêlées ou grésil";
      break;
    case 138:
      toReturn = "Orages forts et fréquents de pluie et neige mêlées ou grésil";
      break;

    case 140:
      toReturn = "Pluies orageuses";
      break;
    case 141:
      toReturn = "Pluie et neige mêlées à caractère orageux";
      break;
    case 142:
      toReturn = "Neige à caractère orageux";
      break;

    case 210:
      toReturn = "Pluie faible intermittente";
      break;
    case 211:
      toReturn = "Pluie modérée intermittente";
      break;
    case 212:
      toReturn = "Pluie forte intermittente";
      break;

    case 220:
      toReturn = "Neige faible intermittente";
      break;
    case 221:
      toReturn = "Neige modérée intermittente";
      break;
    case 222:
      toReturn = "Neige forte intermittente";
      break;

    case 230:
      toReturn = "Pluie et neige mêlées faibles";
      break;
    case 231:
      toReturn = "Pluie et neige mêlées";
      break;
    case 232:
      toReturn = "Pluie et neige mêlées fortes";
      break;

    case 235:
      toReturn = "Averses de grêle";
      break;
  }
  return toReturn;
};


//wi-night-sleet

static getWeatherIconClassByCode = (code) => {
  let toReturn = "";
  if(code === 0) {
    toReturn = "wi-day-sunny";
  }
  else if(code === 1 || code === 2 || code === 3) {
    toReturn = "wi-cloud";
  }
  else if(code === 4 || code === 5) {
    toReturn = "wi-cloudy";
  }
  else if(code === 6 || code === 7) {
    toReturn = "wi-fog";
  }
  else if(code >= 10 && code <= 16) {
    toReturn = "wi-rain";
  }
  else if(code >= 20 && code <= 22) {
    toReturn = "wi-snow";
  }
  else if(code >= 30 && code <= 32) {
    toReturn = "wi-rain-mix";
  }
  else if(code >= 40 && code <= 48) {
    toReturn = "wi-showers";
  }
  else if(code >= 60 && code <= 68) {
    toReturn = "wi-snow";
  }
  else if(code >= 70 && code <= 78) {
    toReturn = "wi-rain-mix";
  }
  else if(code >= 100 && code <= 108) {
    toReturn = "wi-storm-showers";
  }
  else if(code >= 120 && code <= 128) {
    toReturn = "wi-thunderstorm";
  }
  else if(code >= 130 && code <= 138) {
    toReturn = "wi-thunderstorm";
  }
  else if(code >= 140 && code <= 142) {
    toReturn = "wi-thunderstorm";
  }
  else if(code >= 210 && code <= 212) {
    toReturn = "wi-sprinkle";
  }
  else if(code >= 220 && code <= 222) {
    toReturn = "wi-snow";
  }
  else if(code >= 230 && code <= 232) {
    toReturn = "wi-rain-mix";
  }
  else if(code === 235) {
    toReturn = "wi-hail";
  }
  else {
    toReturn = "wi-meteor"; //
  }
  return toReturn;
}

static getColorClassByTemps = (min, max) => {
  let toReturn = "";
  const temp = (min + max) / 2;
  if(temp < 0) {
    toReturn = "cold-temp";
  }
  else if(temp >= 0 && temp < 10) {
    toReturn = "little-cold-temp";
  }
  else if(temp >= 10 && temp < 20) {
    toReturn = "temp-temp";
  }
  else if(temp >= 20 && temp < 25) {
    toReturn = "little-hot-temp";
  }
  else if(temp >= 25 && temp < 30) {
    toReturn = "hot-temp";
  }
  else if(temp >= 30 && temp < 35) {
    toReturn = "very-hot-temp";
  } else {
    toReturn = "too-hot-temp";
  }
  return toReturn;
}

}



/*
0	Soleil
1	Peu nuageux
2	Ciel voilé
3	Nuageux
4	Très nuageux
5	Couvert
6	Brouillard
7	Brouillard givrant

10	Pluie faible
11	Pluie modérée
12	Pluie forte
13	Pluie faible verglaçante
14	Pluie modérée verglaçante
15	Pluie forte verglaçante
16	Bruine

20	Neige faible
21	Neige modérée
22	Neige forte

30	Pluie et neige mêlées faibles
31	Pluie et neige mêlées modérées
32	Pluie et neige mêlées fortes

40	Averses de pluie locales et faibles
41	Averses de pluie locales
42	Averses locales et fortes
43	Averses de pluie faibles
44	Averses de pluie
45	Averses de pluie fortes
46	Averses de pluie faibles et fréquentes
47	Averses de pluie fréquentes
48	Averses de pluie fortes et fréquentes

60	Averses de neige localisées et faibles
61	Averses de neige localisées
62	Averses de neige localisées et fortes
63	Averses de neige faibles
64	Averses de neige
65	Averses de neige fortes
66	Averses de neige faibles et fréquentes
67	Averses de neige fréquentes
68	Averses de neige fortes et fréquentes

70	Averses de pluie et neige mêlées localisées et faibles
71	Averses de pluie et neige mêlées localisées
72	Averses de pluie et neige mêlées localisées et fortes
73	Averses de pluie et neige mêlées faibles
74	Averses de pluie et neige mêlées
75	Averses de pluie et neige mêlées fortes
76	Averses de pluie et neige mêlées faibles et nombreuses
77	Averses de pluie et neige mêlées fréquentes
78	Averses de pluie et neige mêlées fortes et fréquentes

100	Orages faibles et locaux
101	Orages locaux
102	Orages fort et locaux
103	Orages faibles
104	Orages
105	Orages forts
106	Orages faibles et fréquents
107	Orages fréquents
108	Orages forts et fréquents

120	Orages faibles et locaux de neige ou grésil
121	Orages locaux de neige ou grésil
122	Orages forst et locaux de neige ou grésil
123	Orages faibles de neige ou grésil
124	Orages de neige ou grésil
125	Orages de neige ou grésil
126	Orages faibles et fréquents de neige ou grésil
127	Orages fréquents de neige ou grésil
128	Orages fréquents de neige ou grésil

130	Orages faibles et locaux de pluie et neige mêlées ou grésil
131	Orages locaux de pluie et neige mêlées ou grésil
132	Orages fort et locaux de pluie et neige mêlées ou grésil
133	Orages faibles de pluie et neige mêlées ou grésil
134	Orages de pluie et neige mêlées ou grésil
135	Orages forts de pluie et neige mêlées ou grésil
136	Orages faibles et fréquents de pluie et neige mêlées ou grésil
137	Orages fréquents de pluie et neige mêlées ou grésil
138	Orages forts et fréquents de pluie et neige mêlées ou grésil

140	Pluies orageuses
141	Pluie et neige mêlées à caractère orageux
142	Neige à caractère orageux

210	Pluie faible intermittente
211	Pluie modérée intermittente
212	Pluie forte intermittente

220	Neige faible intermittente
221	Neige modérée intermittente
222	Neige forte intermittente

230	Pluie et neige mêlées
231	Pluie et neige mêlées
232	Pluie et neige mêlées

235	Averses de grêle

*/
