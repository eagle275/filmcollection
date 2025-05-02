"use strict";

const stateContentloaded = 4;
const statusSuccess = 200;

let lang = 0, // 0 == "de"
  derror,
  bclose,
  filmselect,
  elHtml,
  elsort,
  regCancel,
  castCancel,
  reghinzu,
  casthinzu,
  elSpeichern,
  elFilter,
  elCast,
  elRegis,
  elConfig2,
  elConfig,
  overlay,
  hauptform,
  fedit,
  pThema,
  pOrt,
  rechts,
  dReg,
  dCast,
  ergebnis,
  elBody,
  butDE,
  butEN,
  butFR,
  butLight,
  butDark,
  butGreen,
  butBlue,
  butRed,
  colorScheme,
  config,
  filter = "Alle",
  sort = "ohne";

const trans = [
  {
    titel: "Titel:",
    erschienen: "Erschienen (Jahr):",
    laufzeit: "Laufzeit:",
    ort: "Ort:",
    thema: "Thema:",
    kinofilm: "Kinofilm",
    doku: "Dokumentarfilm",
    urlaub: "Urlaubsfilm",
    regie: "Regie:",
    cast: "Darsteller:",
    vorname: "Vorname",
    nachname: "Nachname",
    neuregie: "Neue(r) Regisseur/-in",
    neucast: "Neue(r) Schauspieler/-in",
    gefunden: "Vorhandener Film gefunden!",
    neufilm: "Neuer Film erfasst und gespeichert!",
    edit: "Änderungen gespeichert!",
    filmwahl: "Film auswählen:",
    filmart: "Art des Films:",
    bearbeiten: "Film Bearbeiten",
    meinefilme: "Meine Filme",
    beteiligte: "Beteiligte Personen",
    hinzu: "Hinzufügen",
    abbrechen: "Abbrechen",
    filmsammlung: "Meine Filmsammlung",
    mitAjax: "mit ein wenig Ajax",
    speichern: "Speichern",
    darstellung: "Darstellung",
    hintergrund: "Hintergrundfarbe",
    sprache: "Sprache",
    nixneu: "Keine Änderungen vorgenommen - Nicht gespeichert!",
    keineDaten: "Bitte alle Felder eintragen!",
    keinName: "Kein Vorname oder Nachname angegeben!",
    neuSelect: "Neuer Film",
    personadd: "Neue beteilgte Person hinzugefügt!",
    light: "Hell",
    dark: "Dunkel",
    green: "Grün",
    blue: "Blau",
    red: "Rot",
    filter: "Filter:",
    allefilme: "Alle Filme",
    sortier: "Sortierung:",
    ohnesortier: "unsortiert",
    author: "Author",
    config: "Konfig",
    close: "Schließen",
    error: "Fehler!",
  },
  {
    titel: "Titre:",
    erschienen: "Publié (année):",
    laufzeit: "Durée:",
    ort: "Emplacement:",
    thema: "Thème:",
    kinofilm: "Film de cinéma",
    doku: "Documentaire",
    urlaub: "Film de vacances",
    regie: "Direction:",
    cast: "Acteurs:",
    neuregie: "Nouveau directeur",
    neucast: "Nouvel acteur",
    vorname: "Prénom",
    nachname: "Nom de famille",
    gefunden: "Film existant trouvé !",
    neufilm: "Nouveau film capturé et enregistré !",
    edit: "Modifications enregistrées !",
    filmwahl: "Sélectionner un film:",
    filmart: "Type de film:",
    bearbeiten: "Modifier les données du film",
    meinefilme: "Mes films",
    beteiligte: "Personnes impliquées",
    hinzu: "Ajouter",
    abbrechen: "Annuler",
    filmsammlung: "Mon collection de films",
    mitAjax: "avec un peu d'Ajax",
    speichern: "Sauvegarder",
    darstellung: "Représentation",
    hintergrund: "couleur de fond",
    sprache: "Langue",
    nixneu: "Aucune modification apportée - non enregistrée !",
    keineDaten: "Veuillez remplir tous les champs !",
    keinName: "Aucun prénom ni nom spécifié !",
    neuSelect: "Nouveau film",
    personadd: "Nouvelle personne impliquée ajoutée !",
    light: "Brillant",
    dark: "Sombe",
    green: "Vert",
    blue: "Bleu",
    red: "Rouge",
    filter: "Filtre:",
    allefilme: "Tous les films",
    sortier: "Tri:",
    ohnesortier: "non trié",
    author: "créé par",
    config: "Choix",
    close: "Fermer",
    error: "Erreur!",
  },
  {
    titel: "Title:",
    erschienen: "Released (year):",
    laufzeit: "Length:",
    ort: "Location:",
    thema: "Theme:",
    kinofilm: "Cinema",
    doku: "Documentary",
    urlaub: "Vacation",
    regie: "Director:",
    cast: "Cast:",
    neuregie: "New Director",
    neucast: "New Actor/Actress",
    vorname: "First name",
    nachname: "Last name",
    gefunden: "Found existing movie!",
    neufilm: "Created and saved a new movie!",
    edit: "Saved changes!",
    filmwahl: "Select movie:",
    filmart: "Type of movie:",
    bearbeiten: "Edit movie data",
    meinefilme: "My movies",
    beteiligte: "People involved",
    hinzu: "Add",
    abbrechen: "Cancel",
    filmsammlung: "My Movie Collection",
    mitAjax: "with a little Ajax",
    speichern: "Save",
    darstellung: "Display",
    hintergrund: "Backgroundcolor",
    sprache: "Language",
    nixneu: "No changes made - not saved!",
    keineDaten: "Please fill all fields!",
    keinName: "No first name or last name specified!",
    neuSelect: "New Movie",
    personadd: "New involved person adden!",
    light: "Light",
    dark: "Dark",
    green: "Green",
    blue: "Blue",
    red: "Red",
    filter: "Filter:",
    allefilme: "All movies",
    sortier: "Sorting:",
    ohnesortier: "unsorted",
    author:"created by",
    config: "Options",
    close: "Close",
    error: "Error!"
  },
];

const generateMarkup = () => {
  return `
  <div id="overlay"></div>
    <div>
      <h1>
        ${trans[lang].filmsammlung}<button class="button button4 config" id="config" style="margin-right:23px;">
          ${trans[lang].config}
        </button>
      </h1>
      <h3>${trans[lang].mitAjax}</h3>
      <div id="configButtons" class="hidden light">
        <button class="button button4 config" id="config2">${trans[lang].close}</button>
        <p>${trans[lang].sprache}</p>
        <button id="DE" class="picbutton"><img src="./assets/img/DE.png" alt="DE" width="70" height="32"/></button>
        <button id="EN" class="picbutton"><img src="./assets/img/EN.png" alt="EN" width="70" height="32"/></button>
        <button id="FR" class="picbutton"><img src="./assets/img/FR.png" alt="FR" width="70" height="32"/></button>
        <p>${trans[lang].darstellung}</p>
        <button id="light" class="button button4">${trans[lang].light}</button>
        <button id="dark" class="button button5">${trans[lang].dark}</button>
        <p>${trans[lang].hintergrund}</p>
        <button id="green" class="button">${trans[lang].green}</button>
        <button id="blue" class="button button2">${trans[lang].blue}</button>
        <button id="red" class="button button3">${trans[lang].red}</button>
      </div>
      <div id="neuerRegisseur" class="hidden light">
        <fieldset>
          <legend>${trans[lang].neuregie}</legend>
          <p>
            <label for="vName">${trans[lang].vorname}</label>
            <input type="text" id="vNameR" name="vName"/>
          </p>
          <p>
            <label for="nName">${trans[lang].nachname}</label>
            <input type="text" id="nNameR" name="nName"/>
          </p>
          <p class="help">
            <button id="regCancel" class="button button4 labelbutton">${trans[lang].abbrechen}</button>
            <button id="reghinzu" class="button button4 formbutton">${trans[lang].hinzu}</button>
          </p>
        </fieldset>
      </div>
      <div id="neuerSchauspieler" class="hidden light">
        <fieldset>
          <legend>${trans[lang].neucast}</legend>
          <p>
            <label for="vName">${trans[lang].vorname}</label>
            <input type="text" id="vNameS" name="vName"/>
          </p>
          <p>
            <label for="nName">${trans[lang].nachname}</label>
            <input type="text" id="nNameS" name="nName"/>
          </p>
          <p class="help">
            <button id="castCancel" class="button button4 labelbutton pushable"><span class="front">${trans[lang].abbrechen}</span></button>
            <button id="casthinzu" class="button button4 formbutton pushable"><span class="front">${trans[lang].hinzu}</span></button>
          </p>
        </fieldset>
      </div>
      <div id="fehler" class="hidden light">
        <fieldset>
          <legend>${trans[lang].error}</legend>
          <p class="big">
            <img src="./assets/img/error.png" width="64" height="64">${trans[lang].keinName}
          </p>
          <p>
            <button id="close" class="button button4 labelbutton">${trans[lang].close}</button>
          </p>
        </fieldset>
      </div>
    </div>
    <div class="flex-container">
      <div>
        <form id="filmwahl">
          <fieldset>
            <legend>${trans[lang].meinefilme}</legend>
            <p>
              <label for="filter">${trans[lang].filter}</label>
              <select id="filter" name="filter">
                <option value="Alle">${trans[lang].allefilme}</option>
                <option value="kinofilm">${trans[lang].kinofilm}</option>
                <option value="doku">${trans[lang].doku}</option>
                <option value="urlaub">${trans[lang].urlaub}</option>
              </select>
              <label for="sortier" id="sortlabel">${trans[lang].sortier}</label>
              <select id="sortier" name="sortier">
                <option value="ohne">${trans[lang].ohnesortier}</option>
                <option value="auf">A-&gt;Z</option>
                <option value="ab">Z-&gt;A</option>
              </select>
            </p>
            <p>
              <label for="film">${trans[lang].filmwahl}</label>
              <select id="film" size=10 name="film"></select>
              <b></b>
            </p>
          </fieldset>
        </form>
        <div id="fedit" class="hidden">
          <form id="filmedit">
            <div id="links">
            <fieldset>
              <legend>${trans[lang].bearbeiten}</legend>
              <p>
                <label>${trans[lang].filmart}</label>
                <span class="radio">
                  <input type="radio" name="film" id="kinofilm" value="kinofilm" />
                  <label for="kinofilm" class="radiolabel">${trans[lang].kinofilm}</label>
                </span>
                <span class="radio">
                  <input type="radio" name="film" id="doku" value="doku" />
                  <label for="doku" class="radiolabel">${trans[lang].doku}</label>
                </span>
                <span class="radio">
                  <input type="radio" name="film" id="urlaub" value="urlaub" />
                  <label for="urlaub" class="radiolabel">${trans[lang].urlaub}</label>
                </span>
              </p>
              <p>
                <label for="titel">${trans[lang].titel}</label>
                <input type="text" name="titel" id="titel" />
              </p>
              <p>
                <label for="laufzeit">${trans[lang].laufzeit}</label>
                <input type="number" name="laufzeit" id="laufzeit" />
              </p>
              <p>
                <label for="erschienen">${trans[lang].erschienen}</label>
                <input type="number" name="erschienen" id="erschienen" />
              </p>
              <p id="pThema" class="hidden" >
                <label for="thema">${trans[lang].thema}</label>
                <input type="text" name="thema" id="thema" />
              </p>
              <p id="pOrt" class="hidden" >
                <label for="ort">${trans[lang].ort}</label>
                <input type="text" name="ort" id="ort" />
              </p>
              <p>
                <button id="speichern" class="button button4 formbutton">${trans[lang].speichern}</button>
              </p>
              </fieldset>
            </div>
            <div id="rechts" class="hidden">
              <fieldset>
                <legend>${trans[lang].beteiligte}</legend>
              <p >
                <label for="regie">${trans[lang].regie}</label>
                <select id="regie" multiple></select>
                <button id="nReg" class="button button4 stretch">${trans[lang].neuregie}</button>
              </p>
              <p>
                <label for="cast">${trans[lang].cast}</label>
                <select id="cast" multiple></select>
                <button id="nCast" class="button button4 stretch">${trans[lang].neucast}</button>
              </p>
            </fieldset>
          </div>
          </form>
        </div>
      <footer>
        <span>${trans[lang].author}: Sven Leuschner<a href="mailto:sven.leuschner.magdeburg@gmail.com">sven.leuschner.magdeburg@gmail.com</a><a href="https://github.com/eagle275/" target="_blank">github</a></span>
      </footer>
      </div>
  `;
};

const domMarkers = () => {
  filmselect = document.querySelector("#film");
  elHtml = document.querySelector("html");
  elConfig = document.querySelector("#config");
  elConfig2 = document.querySelector("#config2");
  elRegis = document.querySelector("#nReg");
  elCast = document.querySelector("#nCast");
  elSpeichern = document.querySelector("#speichern");
  regCancel = document.querySelector("#regCancel");
  castCancel = document.querySelector("#castCancel");
  reghinzu = document.querySelector("#reghinzu");
  casthinzu = document.querySelector("#casthinzu");
  config = document.querySelector("#configButtons");
  overlay = document.querySelector("#overlay");
  hauptform = document.querySelector("#filmedit");
  fedit = document.querySelector("#fedit");
  pThema = document.querySelector("#pThema");
  pOrt = document.querySelector("#pOrt");
  rechts = document.querySelector("#rechts");
  dReg = document.querySelector("#neuerRegisseur");
  dCast = document.querySelector("#neuerSchauspieler");
  derror = document.querySelector("#fehler");
  ergebnis = document.querySelector("b");
  elFilter = document.querySelector("#filter");
  butDE = document.querySelector("#DE");
  butEN = document.querySelector("#EN");
  butFR = document.querySelector("#FR");
  butLight = document.querySelector("#light");
  butDark = document.querySelector("#dark");
  butGreen = document.querySelector("#green");
  butBlue = document.querySelector("#blue");
  butRed = document.querySelector("#red");
  elsort = document.querySelector("#sortier");
  bclose = document.querySelector("#close");
};

const applyEventListeners = () => {
  //EventListener zuweisen für die "Action"
  elsort.addEventListener("click", toggleSort);
  elFilter.addEventListener("click", toggleFilter);
  elConfig.addEventListener("click", toggleConfig);
  elConfig2.addEventListener("click", toggleConfig);
  elRegis.addEventListener("click", neuerRegisseur);
  elCast.addEventListener("click", neuerSchauspieler);
  elSpeichern.addEventListener("click", saveFilme);
  regCancel.addEventListener("click", abbrechenRegie);
  castCancel.addEventListener("click", abbrechenSchauspieler);
  reghinzu.addEventListener("click", regieSpeichern);
  casthinzu.addEventListener("click", castSpeichern);
  bclose.addEventListener("click",closeError);
};

// Hilfsfunktion - nach Sprachwechsel die Seite neu rendern,
// DOM Marker wieder aufbauen
// EventListener zuweisen
// Personen und Filme neu laden für die Select-Elemente
// abschließend - falls vorher ein Film "geöffnet" war, diesen wieder im Editier-Bereich öffnen
const buildPage = () => {
  let markup = generateMarkup();
  elBody.innerHTML = markup;
  domMarkers();
  applyEventListeners();
  getColor();
  personenHolen();
  filmeHolen();
  let webtitle = document.querySelector("html head title");
  webtitle.innerHTML = trans[lang].filmsammlung;
  if (oldSelection !== undefined) {
    if (oldSelection !== "NEU") {
      // console .log(Number(oldSelection));
      filmselect.selectedIndex = Number(oldSelection);
      let ee = {
        pointerId: 0,
        target: {
          value: Number(oldSelection),
        },
      };
      // Event-Listener per Hand aufrufen, um die Edit-Felder zu füllen
      filmSelectiert(ee);
    }
  }
};

const activateConfig = () => {
  overlay.style.display = "block";
  disableForm(true);
  butDE.addEventListener("click", toggleDE);
  butEN.addEventListener("click", toggleEN);
  butFR.addEventListener("click", toggleFR);
  butLight.addEventListener("click", toggleLight);
  butDark.addEventListener("click", toggleDark);
  butGreen.addEventListener("click", toggleGreen);
  butBlue.addEventListener("click", toggleBlue);
  butRed.addEventListener("click", toggleRed);
};

const closeConfig = () => {
  overlay.style.display = "none";
  disableForm(false);
  butDE.removeEventListener("click", toggleDE);
  butEN.removeEventListener("click", toggleEN);
  butFR.removeEventListener("click", toggleFR);
  butLight.removeEventListener("click", toggleLight);
  butDark.removeEventListener("click", toggleDark);
  butGreen.removeEventListener("click", toggleGreen);
  butBlue.removeEventListener("click", toggleBlue);
  butRed.removeEventListener("click", toggleRed);
};

const personenHolen = () => {
  personen = [];
  if (localStorage.hasOwnProperty("personen")) {
    let storedPersonen = localStorage.getItem("personen");

    let ps = JSON.parse(storedPersonen);

    personenListenBauen(ps);
  } else {
    let ajaxAnfrage = new XMLHttpRequest();
    // 2 Methode, Ziel, Async /false = synchron
    ajaxAnfrage.open("GET", "./assets/data/personen.json", true);
    ajaxAnfrage.onreadystatechange = ladePersonen;
    // 3 Senden
    ajaxAnfrage.send();
  }
};

const personenListenBauen = (pDaten) => {
  let parent1 = document.querySelector("#regie");
  Array.from(parent1).forEach((option) => {
    parent1.removeChild(option);
  });
  parent1.innerHTML = "";
  let parent2 = document.querySelector("#cast");
  Array.from(parent2).forEach((option) => {
    parent2.removeChild(option);
  });
  parent2.innerHTML = "";

  for (let person of pDaten) {
    let neu = document.createElement("option");
    neu.setAttribute("value", person.id);
    neu.innerText = person.vName + " " + person.nName;
    let n2 = neu.cloneNode(true);
    parent1.append(neu);
    parent2.append(n2);
    personen.push(new Person(person.vName, person.nName));
  }
};

const filmeHolen = () => {
  filmsammlung = [];
  if (localStorage.getItem("filme") === null) {
    // localStorage enthält keine filme -> per Ajax anfragen
    let ajaxAnfrage = new XMLHttpRequest();
    // 2 Methode, Ziel, Async /false = synchron
    ajaxAnfrage.open("GET", "./assets/data/filmsammlung.json", true);
    ajaxAnfrage.onreadystatechange = ladeFilme;
    // 3 Senden
    ajaxAnfrage.send();
  } else {
    // Filme sind im LocalStorage -> laden und verarbeiten
    let storedFilme = localStorage.getItem("filme");
    let fs = JSON.parse(storedFilme);
    filmsammlungBauen(fs);
    filterFilme(filter);
    filmListeBauen(filmevisible);
  }
};

const filmsammlungBauen = (filmdaten) => {
  for (let film of filmdaten) {
    if (typeof film.ort !== "undefined") {
      filmsammlung.push(
        new Urlaubsfilm(film.titel, film.ort, film.laufzeit, film.erschienen)
      );
    } else if (typeof film.thema !== "undefined") {
      filmsammlung.push(
        new Doku(film.titel, film.thema, film.laufzeit, film.erschienen)
      );
    } else {
      filmsammlung.push(
        new Kinofilm(
          film.titel,
          film.regie,
          film.cast,
          film.laufzeit,
          film.erschienen
        )
      );
    }
  }
};

const filmListeBauen = (filmdaten) => {
  let parent = document.querySelector("#film");

  Array.from(parent).forEach((option) => {
    parent.removeChild(option);
  });
  parent.innerHTML = "";

  parent.removeEventListener("click", filmSelectiert);
  parent.addEventListener("click", filmSelectiert);
  let neu = document.createElement("option");
  neu.setAttribute("value", "NEU");
  neu.innerText = trans[lang].neuSelect;
  parent.append(neu);
  for (let film of filmdaten) {
    let nf = document.createElement("option");
    nf.setAttribute("value", film.id);
    nf.innerText = film.titel;
    parent.append(nf);
  }
};

let oldSelection = "null";

const setzeDaten = () => {
  localStorage.setItem("personen", JSON.stringify(personen));
  localStorage.setItem("filme", JSON.stringify(filmsammlung));
};

// Hilfsfunktion zum Vergleich von Arrays - Regie und Cast
const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const disableForm = (disable) => {
  const elements = hauptform.elements;
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = disable;
  }
  elConfig.disabled = disable;
};

const getColor = () => {
  if (localStorage.getItem("colorScheme") === null) {
    colorScheme = "light";
  } else {
    colorScheme = localStorage.getItem("colorScheme");
  }
  switch (colorScheme) {
    case "light":
      toggleLight();
      break;
    case "dark":
      toggleDark();
      break;
    case "green":
      toggleGreen();
      break;
    case "blue":
      toggleBlue();
      break;
    case "red":
      toggleRed();
      break;
  }
};

const getLanguage = () => {
  if (localStorage.getItem("language") === null) {
    lang = 0;
  } else {
    lang = Number(localStorage.getItem("language"));
  }

  switch (lang) {
    case 0:
      toggleDE();
      break;
    case 2:
      toggleEN();
      break;
    case 1:
      toggleFR();
      break;
  }
};

const sortiereListe = (sort) => {
  // console.log(filmevisible);
  let oldValue = filmselect.value;
  let film = null;
  if (oldValue !== undefined && oldValue !== "NEU")
    film = filmevisible.find((obj) => obj.id == oldValue);
  switch (sort) {
    case "ohne":
      break;
    case "auf":
      filmevisible = filmevisible.toSorted((a, b) =>
        a.titel > b.titel ? 1 : -1
      );
      break;
    case "ab":
      filmevisible = filmevisible.toSorted((a, b) =>
        a.titel > b.titel ? -1 : 1
      );
      break;
  }
  // console.log(filmevisible);
  filmListeBauen(filmevisible);
  filmselect.value = oldValue;
};

let oldfilter = "Alle";

const filterFilme = (filter) => {
  let oldValue = filmselect.value; //alten Film merken
  filmevisible = []; // angezeigte Liste leeren
  let ee;
  for (let film of filmsammlung) {
    // und neu aufbauen
    switch (filter) {
      case "Alle":
        filmevisible.push(film);
        break;
      case "kinofilm":
        if (film.constructor === Kinofilm) filmevisible.push(film);
        break;
      case "doku":
        if (film.constructor === Doku) filmevisible.push(film);
        break;
      case "urlaub":
        if (film.constructor === Urlaubsfilm) filmevisible.push(film);
        break;
    }
  }
  if (oldfilter !== filter) {
    oldfilter = filter;
    let oldFilm = filmevisible.find((obj) => obj.id == oldValue);
    // schauen, ob der alte Film auch in der neuen angezeigten Liste vorhanden ist
    if (oldFilm) {
      filmselect.value = oldValue;
      ee = {
        pointerId: 0,
        target: {
          value: oldValue,
        },
      };
      filmSelectiert(ee);
    } else {
      if (!fedit.classList.contains("hidden")) fedit.classList.add("hidden");
      filmselect.value = "NEU";
    }
  }
  // console.log(filmsammlung);
  // console.log(filmevisible);
  sortiereListe(sort); // Liste sortieren
};

const init = () => {
  // body ... dort wird der Markup eingefügt
  elBody = document.querySelector("body");

  // initialisieren Sprache
  getLanguage();

  // initialisieren Farbe
  getColor();
};

document.addEventListener("DOMContentLoaded", init);
