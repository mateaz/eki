import * as neraz_ceste from '../data/centroidiceste/centroidi.json';
//import * as neraz_ceste from '../data/nerazvrstaneceste/testneraz.json';

//import * as eki from '../data/javnepovrsinebezprometa/centroidi/javnepovrsinebezprometa.json'; //testiranje, kasnije idu svi podaci vamo iz cijelog KI
//import * as eki from '../data/javnepovrsinebezprometa/centroidi/test.json'; //testiranje, kasnije idu svi podaci vamo iz cijelog KI
//import * as eki from '../data/javnepovrsinebezprometa/centroidi/bboxbicikl.json'; //testiranje, kasnije idu svi podaci vamo iz cijelog KI
import {obj_eki} from "../Komponente/data/Javnepovrsinebezprometa";

export const columnsnerazceste = [
    {   name: "Oznaka",
        selector: "OZNAKA",
        sortable: true
    },
    {   name: "Naziv ulice",
        selector: "UL_IME",
        sortable: true
    },
    {   name: "Naziv naselja",
        selector: "NA_IME",
        sortable: true,
    },
    {   name: "Naziv županije",
        selector: "ZU_IME",
        sortable: true,
    },
    {   name: "Zastor",
        selector: "ZASTOR",
        sortable: true,
    },
];

export const nerazceste = neraz_ceste.features.map((data) => {
    return data;
})

export const columnseki = [
    {   name: "Vrsta",
        selector: "Vrsta",
        sortable: true
    },
    {   name: "Oznaka",
        selector: "Oznaka",
        sortable: true
    },
    {   name: "Naziv",
        selector: "Naziv",
        sortable: true,
    },
    {   name: "Naselje",
        selector: "Naselje",
        sortable: true,
    },
    {   name: "Kat. općina",
        selector: "Kat opcina",
        sortable: true,
    },
    {   name: "Kat. čestica",
        selector: "kcbr",
        sortable: true,
    },
    {   name: "Broj zkc",
        selector: "zkc",
        sortable: true,
    },
    {   name: "Vlasništvo",
        selector: "Vlasnistvo",
        sortable: true,
    },
];

export const ekipodaci = obj_eki;