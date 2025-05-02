"use strict";

let personen = [],
  filmsammlung = [],
  filmevisible = [];


const getNextID = (sammlung) => {
  return sammlung.reduce((max, el) => Math.max(max, el.id), 0) + 1;
};

class Person {
  constructor(vName, nName) {
    this.vName = vName;
    this.nName = nName;
    this.id = getNextID(personen);
  }
}

class Film {
  constructor(titel, laufzeit, erschienen, sammlung = filmsammlung) {
    this.titel = titel;
    this.laufzeit = laufzeit;
    this.erschienen = erschienen;
    this.id = getNextID(sammlung);
  }
  get alter() {
    return new Date().getFullYear() - this.erschienen;
  }
}

class Kinofilm extends Film {
  constructor(
    titel,
    regie,
    cast,
    laufzeit,
    erschienen,
    sammlung = filmsammlung
  ) {
    super(titel, laufzeit, erschienen, sammlung);
    this.regie = regie;
    this.cast = cast;
  }
}

class Doku extends Film {
  constructor(titel, thema, laufzeit, erschienen, sammlung = filmsammlung) {
    super(titel, laufzeit, erschienen, sammlung);
    this.thema = thema;
  }
}

class Urlaubsfilm extends Film {
  constructor(titel, ort, laufzeit, erschienen, sammlung = filmsammlung) {
    super(titel, laufzeit, erschienen, sammlung);
    this.ort = ort;
  }
}
