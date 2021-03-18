import * as bosana_cesta from "../../data/nerazvrstaneceste/bosana.json";
import * as dinjiska_cesta from "../../data/nerazvrstaneceste/dinjiska.json";
import * as gorica_cesta from "../../data/nerazvrstaneceste/gorica.json";
import * as gradpag_cesta from "../../data/nerazvrstaneceste/gradpag.json";
import * as miskovici_cesta from "../../data/nerazvrstaneceste/miskovici.json";
import * as kosljun_cesta from "../../data/nerazvrstaneceste/kosljun.json";
import * as simuni_cesta from "../../data/nerazvrstaneceste/simuni.json";
import * as smokvica_cesta from "../../data/nerazvrstaneceste/smokvica.json";
import * as staravas_cesta from "../../data/nerazvrstaneceste/staravas.json";
import * as vlasici_cesta from "../../data/nerazvrstaneceste/vlasici.json";
import * as vrcici_cesta from "../../data/nerazvrstaneceste/vrcici.json";


export const bosana = bosana_cesta;
export const dinjiska = dinjiska_cesta;
export const gorica = gorica_cesta;
export const gradpag = gradpag_cesta;
export const miskovici = miskovici_cesta;
export const kosljun = kosljun_cesta;
export const simuni = simuni_cesta;
export const smokvica = smokvica_cesta;
export const staravas = staravas_cesta;
export const vlasici = vlasici_cesta;
export const vrcici = vrcici_cesta;

let bosana_obj = bosana_cesta.default.features.map(data => {
    return data;
});
 
let dinjiska_obj = dinjiska_cesta.default.features.map(data => {
    return data;
});
 
let gorica_obj = gorica_cesta.default.features.map(data => {
    return data;
});
 
let gradpag_obj = gradpag_cesta.default.features.map(data => {
    return data;
});
 
let miskovici_obj = miskovici_cesta.default.features.map(data => {
    return data;
});
 
let kosljun_obj = kosljun_cesta.default.features.map(data => {
    return data;
});
 
let simuni_obj = simuni_cesta.default.features.map(data => {
    return data;
});

let smokvica_obj = smokvica_cesta.default.features.map(data => {
    return data;
});

let staravas_obj = staravas_cesta.default.features.map(data => {
    return data;
});

let vlasici_obj = vlasici_cesta.default.features.map(data => {
    return data;
});

let vrcici_obj = vrcici_cesta.default.features.map(data => {
    return data;
});
 
export const obj_ceste = [...bosana_obj, ...dinjiska_obj, ...gorica_obj, ...gradpag_obj, ...miskovici_obj, ...kosljun_obj, ...simuni_obj, ...smokvica_obj, ...staravas_obj, ...vlasici_obj, ...vrcici_obj];