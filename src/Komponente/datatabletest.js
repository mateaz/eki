import * as neraz_ceste from '../data/centroidiceste/centroidi.json';
 
export const columns = [
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

export const datatest = neraz_ceste.features.map((data) => {
    return data;
})