"use strict";

const toggleDE = () => {
  lang = 0;
  localStorage.setItem("language", lang);
  buildPage();
  if (config !== undefined) {
    // verhindert Fehler, wenn die Methode direkt nach Seiten-Reload gestartet wird
    if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
    overlay.style.display = "none";
    disableForm(false);
    closeConfig();
  }
};

const toggleEN = () => {
  lang = 2;
  localStorage.setItem("language", lang);
  buildPage();
  if (config !== undefined) {
    // verhindert Fehler, wenn die Methode direkt nach Seiten-Reload gestartet wird
    if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
    overlay.style.display = "none";
    disableForm(false);
    closeConfig();
  }
};

const toggleFR = () => {
  lang = 1;
  localStorage.setItem("language", lang);
  buildPage();
  if (config !== undefined) {
    // verhindert Fehler, wenn die Methode direkt nach Seiten-Reload gestartet wird
    if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
    overlay.style.display = "none";
    disableForm(false);
    closeConfig();
  }
};

const toggleLight = () => {
  if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
  overlay.style.display = "none";
  disableForm(false);
  elHtml.className = "light";
  elBody.className = "light";
  dReg.className = "hidden";
  dReg.classList.add("light");
  dCast.className = "hidden";
  dCast.classList.add("light");
  derror.className = "hidden";
  derror.classList.add("light");
  localStorage.setItem("colorScheme", "light");
  closeConfig();
};

const toggleDark = () => {
  if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
  overlay.style.display = "none";
  disableForm(false);
  elHtml.className = "dark";
  elBody.className = "dark";
  dReg.className = "hidden";
  dReg.classList.add("dark");
  dCast.className = "hidden";
  dCast.classList.add("dark");
  derror.className = "hidden";
  derror.classList.add("dark");
  localStorage.setItem("colorScheme", "dark");
  closeConfig();
};

const toggleGreen = () => {
  if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
  overlay.style.display = "none";
  disableForm(false);
  elHtml.className = "green";
  elBody.className = "green";
  dReg.className = "hidden";
  dReg.classList.add("green");
  dCast.className = "hidden";
  dCast.classList.add("green");
  derror.className = "hidden";
  derror.classList.add("green");
  localStorage.setItem("colorScheme", "green");
  closeConfig();
};

const toggleBlue = () => {
  if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
  overlay.style.display = "none";
  disableForm(false);
  elHtml.className = "blue";
  elBody.className = "blue";
  dReg.className = "hidden";
  dReg.classList.add("blue");
  dCast.className = "hidden";
  dCast.classList.add("blue");
  derror.className = "hidden";
  derror.classList.add("blue");
  localStorage.setItem("colorScheme", "blue");
  closeConfig();
};

const toggleRed = (evt) => {
  if (!config.classList.contains("hidden")) config.classList.toggle("hidden");
  overlay.style.display = "none";
  disableForm(false);
  elHtml.className = "red";
  elBody.className = "red";
  dReg.className = "hidden";
  dReg.classList.add("red");
  dCast.className = "hidden";
  dCast.classList.add("red");
  derror.className = "hidden";
  derror.classList.add("red");
  localStorage.setItem("colorScheme", "red");
  closeConfig();
};

const toggleConfig = () => {
  config.classList.toggle("hidden");
  if (!config.classList.contains("hidden")) {
    activateConfig();
  } else {
    closeConfig();
  }
};

const ladePersonen = (evt) => {
  // magicNumbers ... const ...vordefinieren
  if (
    evt.currentTarget.readyState == stateContentloaded &&
    evt.currentTarget.status == statusSuccess
  ) {
    // console.log(parent);
    // 4 Antwort Verarbeiten
    // console.log(evt.currentTarget);
    let ajaxAntwort = evt.currentTarget.responseText;
    let ps = JSON.parse(ajaxAntwort);
    personenListenBauen(ps);
    localStorage.setItem("personen", JSON.stringify(personen));
    // console.log(personen);
  }
};

const ladeFilme = (evt) => {
  // magicNumbers ... const ...vordefinieren
  if (
    evt.currentTarget.readyState == stateContentloaded &&
    evt.currentTarget.status == statusSuccess
  ) {
    // console.log(parent);
    // 4 Antwort Verarbeiten
    // console.log(evt.currentTarget);
    let ajaxAntwort = evt.currentTarget.responseText;
    let fs = JSON.parse(ajaxAntwort);
    filmsammlungBauen(fs);
    localStorage.setItem("filme", JSON.stringify(filmsammlung));
    filterFilme(filter);
    filmListeBauen(filmevisible);
  }
};

const saveFilme = (evt) => {
  evt.preventDefault();
  let value = filmselect.selectedIndex;
  let elRegie = document.querySelector("#regie");
  let elCast = document.querySelector("#cast");
  let elTitel = document.querySelector("#titel");
  let elLaufzeit = document.querySelector("#laufzeit");
  let elErschienen = document.querySelector("#erschienen");
  let elOrt = document.querySelector("#ort");
  let elThema = document.querySelector("#thema");
  let selectedArt = document.querySelector('input[name="film"]:checked');
  let filmart;
  let film;
  let reg, cas;
  let filmcheck = filmsammlung.find((e) => e.titel === elTitel.value);
  if (oldSelection === "NEU") {
    // Neuer Film in Select-Box
    if (filmcheck === undefined) {
      // kein passender Film gefunden
      // Prüfen ob überhaupt Daten eingegeben wurden
      if (
        elTitel.value !== "" &&
        elLaufzeit.value !== "" &&
        elErschienen !== "" &&
        selectedArt
      ) {
        // je nach Filmart ein passendes Filmobject erzeugen
        filmart = selectedArt.id;
        switch (filmart) {
          case "doku":
            film = new Doku(
              elTitel.value,
              elThema.value,
              elLaufzeit.value,
              elErschienen.value,
              filmsammlung
            );
            break;
          case "urlaub":
            film = new Urlaubsfilm(
              elTitel.value,
              elOrt.value,
              elLaufzeit.value,
              elErschienen.value,
              filmsammlung
            );
            break;
          case "kinofilm":
            // beide Selekt-Boxen auswerten, da multi-Select
            reg = Array.from(elRegie.options)
              .filter((option) => option.selected)
              .map((option) => Number(option.value));

            cas = Array.from(elCast.options)
              .filter((option) => option.selected)
              .map((option) => Number(option.value));

            film = new Kinofilm(
              elTitel.value,
              reg,
              cas,
              elLaufzeit.value,
              elErschienen.value,
              filmsammlung
            );
            break;
        } // Filmsammlung um neuen Film erweitern und Speichern, Select box auf neuen Film setzen
        // console.log(film);
        filmsammlung.push(film);
        setzeDaten();
        filmeHolen();
        filmselect.selectedIndex = film.id;
        // console.log(filmart);
        ergebnis.innerText = trans[lang].neufilm; // "Neuer Film erfasst und gespeichert!";
      } else {
        // keine Daten eingegeben -> meckern
        ergebnis.innerText = trans[lang].keineDaten; // nicht alle Felder befüllt
      }
    } else {
      // trotz "Neuer Film" wurde ein bekannter Filmname eingegeben ->
      // diesen Film in die Eingabefelder zum Bearbeiten laden
      // zuerst die Filmliste prüfen und ggfs. Filter umstellen
      let optionValues = [...filmselect.options].map((o) => o.value);

      if (!optionValues.includes(filmcheck.id)) {
        filter = "Alle";
        elFilter.value = filter;
        filterFilme(filter);
      }

      filmselect.value = filmcheck.id;

      ergebnis.innerText = trans[lang].gefunden; // "Vorhandener Film gefunden!"; // ^^Erfolgsmeldung ausgeben
      // event-Object mit minimalen Daten füttern
      let ee = {
        pointerId: 0,
        target: {
          value: filmcheck.id,
        },
      };
      // Event-Listener per Hand aufrufen, um die Edit-Felder zu füllen
      filmSelectiert(ee);
    }
  } else {
    // Update eines bestehenden Filmes
    let oldFilm = filmsammlung.find((obj) => obj.id == Number(value));
    // console.log(oldFilm);
    reg = Array.from(elRegie.options)
      .filter((option) => option.selected)
      .map((option) => Number(option.value));

    cas = Array.from(elCast.options)
      .filter((option) => option.selected)
      .map((option) => Number(option.value));

    // Testausgaben ^^
    // console .log(reg, cas);
    // console.log(oldFilm.titel !== elTitel.value);
    // console.log(oldFilm.erschienen !== elErschienen.value);
    // console.log(oldFilm.laufzeit !== elLaufzeit.value);
    // console.log(
    //   oldFilm.constructor === Kinofilm &&
    //     (!compareArrays(oldFilm.regie, reg) ||
    //       !compareArrays(oldFilm.cast, cas))
    // );
    // console.log(
    //   oldFilm.constructor === Doku && oldFilm.thema !== elThema.value
    // );
    // console.log(
    //   oldFilm.constructor === Urlaubsfilm && oldFilm.ort !== elOrt.value
    // );
    if (
      oldFilm.titel !== elTitel.value ||
      oldFilm.erschienen !== elErschienen.value ||
      oldFilm.laufzeit !== elLaufzeit.value ||
      (oldFilm.constructor === Kinofilm &&
        (!compareArrays(oldFilm.regie, reg) ||
          !compareArrays(oldFilm.cast, cas))) ||
      (oldFilm.constructor === Doku && oldFilm.thema !== elThema.value) ||
      (oldFilm.constructor === Urlaubsfilm && oldFilm.ort !== elOrt.value)
    ) {
      // es wurde mindestens 1 Feld editiert
      filmart = selectedArt.id;
      switch (filmart) {
        case "doku":
          film = new Doku(
            elTitel.value,
            elThema.value,
            elLaufzeit.value,
            elErschienen.value,
            filmsammlung
          );
          break;
        case "urlaub":
          film = new Urlaubsfilm(
            elTitel.value,
            elOrt.value,
            elLaufzeit.value,
            elErschienen.value,
            filmsammlung
          );
          break;
        case "kinofilm":
          // beide Selekt-Boxen auswerten, da multi-Select
          film = new Kinofilm(
            elTitel.value,
            reg,
            cas,
            elLaufzeit.value,
            elErschienen.value,
            filmsammlung
          );
          break;
      }
      film.id = oldFilm.id;
      filmsammlung.splice(oldFilm.id - 1, 1, film);
      setzeDaten();
      filmeHolen();
      filmselect.selectedIndex = oldFilm.id;
      ergebnis.innerText = trans[lang].edit; // Änderungen gespeichert!";
    } else {
      filmselect.selectedIndex = oldFilm.id;
      ergebnis.innerText = trans[lang].nixneu; //keine Änderungen vorgenommen
    }
  }

  // Versuch, Daten mittels Put zum Server ...
  // let ajaxAnfrage = new XMLHttpRequest();
  // ajaxAnfrage.open('PUT','filmsammlung.json',false);
  // ajaxAnfrage.setRequestHeader('Content-Type','application/json');
  // ajaxAnfrage.addEventListener('load', () => {
  //   if (ajaxAnfrage.readyState==stateContentloaded) {
  //     const res=ajaxAnfrage.responseText;
  //     console.log(res)
  //   }
  // })
  // ajaxAnfrage.send(JSON.stringify(filmsammlung));
};

const filmSelectiert = (evt) => {
  let value = evt.target.value;
  // console .log(evt);
  if (
    evt.pointerId == 0 // && (value === "NEU" || (value != oldSelection && value !== "NEU"))
  ) {
    // console.log(evt);
    oldSelection = value;
    // console.log(value);
    let elRegie = document.querySelector("#regie");
    let elCast = document.querySelector("#cast");
    let elTitel = document.querySelector("#titel");
    let elLaufzeit = document.querySelector("#laufzeit");
    let elErschienen = document.querySelector("#erschienen");
    let elOrt = document.querySelector("#ort");
    let elThema = document.querySelector("#thema");
    let filmart;
    if (value !== "NEU") {
      let film = filmsammlung.find((obj) => obj.id == Number(value));
      // console.log(film);
      if (film) {
        fedit.classList.remove("hidden");
        elTitel.value = film.titel;
        elLaufzeit.value = film.laufzeit;
        elErschienen.value = film.erschienen;
        if (typeof film.ort !== "undefined") {
          pOrt.classList.remove("hidden");
          pThema.classList.add("hidden");
          rechts.classList.add("hidden");
          filmart = document.querySelector("#urlaub");
          elOrt.value = film.ort;
          elThema.value = "";
          filmart.checked = true;
        } else if (typeof film.thema !== "undefined") {
          pThema.classList.remove("hidden");
          rechts.classList.add("hidden");
          pOrt.classList.add("hidden");
          filmart = document.querySelector("#doku");
          elThema.value = film.thema;
          elOrt.value = "";
          filmart.checked = true;
        } else {
          pOrt.classList.add("hidden");
          pThema.classList.add("hidden");
          rechts.classList.remove("hidden");
          filmart = document.querySelector("#kinofilm");
          filmart.checked = true;
          elThema.value = "";
          elOrt.value = "";
          for (const option of document.querySelectorAll("#regie option")) {
            const value = Number.parseInt(option.value);
            if (film.regie.indexOf(value) !== -1) {
              option.setAttribute("selected", "selected");
            } else option.removeAttribute("selected");
          }
          for (const option of document.querySelectorAll("#cast option")) {
            const value = Number.parseInt(option.value);

            if (film.cast.indexOf(value) !== -1) {
              option.setAttribute("selected", "selected");
            } else option.removeAttribute("selected");
          }
        }
      }
    } else {
      fedit.classList.remove("hidden");
      rechts.classList.add("hidden");
      pOrt.classList.add("hidden");
      pThema.classList.add("hidden");
      elTitel.value = "";
      elLaufzeit.value = "";
      elErschienen.value = "";
      elThema.value = "";
      elOrt.value = "";
      let sel = document.querySelector('input[name="film"]:checked');
      if (sel) sel.checked = false;
      let elKino = document.querySelector("#kinofilm");
      elKino.addEventListener("click", (evt) => {
        // evt.preventDefault();
        pOrt.classList.add("hidden");
        pThema.classList.add("hidden");
        rechts.classList.remove("hidden");
        filmart = document.querySelector("#kinofilm");
        filmart.checked = true;
        elThema.value = "";
        elOrt.value = "";
        for (const option of document.querySelectorAll("#regie option")) {
          option.removeAttribute("selected");
        }
        for (const option of document.querySelectorAll("#cast option")) {
          option.removeAttribute("selected");
        }
      });
      let elDoku = document.querySelector("#doku");
      elDoku.addEventListener("click", (evt) => {
        // evt.preventDefault();
        pOrt.classList.add("hidden");
        pThema.classList.remove("hidden");
        rechts.classList.add("hidden");
        filmart = document.querySelector("#doku");
        filmart.checked = true;
        elThema.value = "";
        elOrt.value = "";
      });
      let elurlaub = document.querySelector("#urlaub");
      elurlaub.addEventListener("click", (evt) => {
        // evt.preventDefault();
        pOrt.classList.remove("hidden");
        pThema.classList.add("hidden");
        rechts.classList.add("hidden");
        filmart = document.querySelector("#urlaub");
        filmart.checked = true;
        elThema.value = "";
        elOrt.value = "";
      });
    }
  }
};

const neuerRegisseur = (evt) => {
  evt.preventDefault();
  overlay.style.display = "block";
  disableForm(true);
  dReg.classList.remove("hidden");
};

const regieSpeichern = (evt) => {
  evt.preventDefault();
  let elvNameR = document.querySelector("#vNameR");
  let elnNameR = document.querySelector("#nNameR");
  if (elvNameR.value !== "" && elnNameR.value !== "") {
    personen.push(new Person(elvNameR.value, elnNameR.value));
    setzeDaten();
    personenHolen();
    overlay.style.display = "none";
    disableForm(false);
    dReg.classList.add("hidden");
    ergebnis.innerText = trans[lang].personadd;

    let currfilm = filmselect.value;
    // event-Object mit minimalen Daten füttern
    let ee = {
      pointerId: 0,
      target: {
        value: currfilm,
      },
    };
    // Event-Listener per Hand aufrufen, um die Edit-Felder zu füllen
    filmSelectiert(ee);
  } else {
    derror.classList.remove("hidden"); // alert(trans[lang].keinName);
  }
};

const abbrechenRegie = (evt) => {
  evt.preventDefault();
  overlay.style.display = "none";
  disableForm(false);
  dReg.classList.add("hidden");
};

const neuerSchauspieler = (evt) => {
  evt.preventDefault();
  overlay.style.display = "block";
  disableForm(true);
  dCast.classList.remove("hidden");
};

const abbrechenSchauspieler = (evt) => {
  evt.preventDefault();
  overlay.style.display = "none";
  disableForm(false);
  dCast.classList.add("hidden");
};

const castSpeichern = (evt) => {
  evt.preventDefault();
  let elvNameC = document.querySelector("#vNameS");
  let elnNameC = document.querySelector("#nNameS");
  if (elvNameC.value !== "" && elnNameC.value !== "") {
    personen.push(new Person(elvNameC.value, elnNameC.value));
    setzeDaten();
    personenHolen();
    overlay.style.display = "none";
    disableForm(false);
    dCast.classList.add("hidden");
    ergebnis.innerText = trans[lang].personadd;

    let currfilm = filmselect.value;
    // event-Object mit minimalen Daten füttern
    let ee = {
      pointerId: 0,
      target: {
        value: currfilm,
      },
    };
    // Event-Listener per Hand aufrufen, um die Edit-Felder zu füllen
    filmSelectiert(ee);
  } else {
    derror.classList.remove("hidden"); // alert(trans[lang].keinName);
  }
};

const closeError = (evt) => {
  evt.preventDefault();
  derror.classList.add("hidden");
};

const toggleFilter = (evt) => {
  evt.preventDefault();
  filter = evt.target.value;
  filterFilme(filter);
};

const toggleSort = (evt) => {
  evt.preventDefault();
  sort = evt.target.value;
  filterFilme(filter);
};
