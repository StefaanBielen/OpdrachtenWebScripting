// naam: Stefaan Bielen
'use strict';
class Persoon  {
    constructor(id, naam) {
        this.id = id;
        this.naam = naam;
    }

    set id(id) {
        if (id < 0) {
            throw new Error("ID mag niet kleiner zijn dan 0!");
        } else {
            this._id = id;
        }
    }
    get id() {
        return this._id;
    }

    set naam(naam) {
        if (typeof naam != 'string') {
            throw new Error("Name moet een string zijn!");
        } else {
            this._naam = naam;
        }
    }

    get naam() {
        return this._naam;
    }

    toString() {
        console.log(`[${this._id}] ${this._naam}`);
    }
}

class Loonwerker extends Persoon {
    constructor(id, naam, loonPerUur, aantalUrenGewerkt) {
        super(id, naam);
        this._loonPerUur = loonPerUur;
        this._aantalUrenGewerkt = aantalUrenGewerkt;
    }

    set loonPerUur(loonPerUur) {
        if (loonPerUur < 0) {
            throw new Error("Loon kan niet kleiner zijn als 0!")
        } else {
            this._loonPerUur = loonPerUur;
        }
    }
    get loonPerUur() {
        return this._loonPerUur;
    }

    set aantalUrenGewerkt(aantalUrenGewerkt) {
        if (aantalUrenGewerkt < 0) {
            throw new Error("Aantal uren gewerkt kan niet kleiner zijn als 0!")
        } else {
            this._aantalUrenGewerkt = aantalUrenGewerkt;
        }
    }

    berekenLoon() {
        return parseInt(this._aantalUrenGewerkt * this._loonPerUur);
    }

    toString() {
        return super.toString() + ` = ${this.berekenLoon()}`;
    }
}

class Manager extends Persoon {
    constructor(id, naam) {
        super(id, naam);
        this._loonWerkers = [];
    }

    voegLoonWerkerToe(loonWerker) {
        if (loonWerker instanceof Loonwerker) {
            this._loonWerkers.push(loonWerker);
        } else {
            throw new Error("Geen instantie van de klasse Loonwerker")
        }
    }
    berekenLoon() {
        let loonManager = 0;
        for (let werker of this._loonWerkers) {
            loonManager += werker.berekenLoon();
        }
        loonManager *= 0.2;
        return parseInt(loonManager);
    }
    toString() {
        return super.toString() + ` = ${this.berekenLoon()}`;
    }

}

let persoon = new Persoon(1,"mieke");
let manager=new Manager(2,"jan");
let werker1=new Loonwerker(3,"tim",11,13);
let werker2=new Loonwerker(4,"sofie",2,50);
manager.voegLoonWerkerToe(werker1);
manager.voegLoonWerkerToe(werker2);
console.log(persoon.toString());
// [1] mieke 
console.log(werker1.toString());
// [3] tim = 143
console.log(werker2.toString());
// [4] sofie = 100
console.log(manager.toString());
// [2] jan = 49 

