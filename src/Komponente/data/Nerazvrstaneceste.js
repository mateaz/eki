import * as bosana_cesta from "../../data/nerazvrstaneceste/new/bosana.json";
import * as dinjiska_cesta from "../../data/nerazvrstaneceste/new/dinjiska.json";
import * as gorica_cesta from "../../data/nerazvrstaneceste/new/gorica.json";
import * as gradpag_cesta from "../../data/nerazvrstaneceste/new/gradpag.json";
import * as miskovici_cesta from "../../data/nerazvrstaneceste/new/miskovici.json";
import * as kosljun_cesta from "../../data/nerazvrstaneceste/new/kosljun.json";
import * as simuni_cesta from "../../data/nerazvrstaneceste/new/simuni.json";
import * as smokvica_cesta from "../../data/nerazvrstaneceste/new/smokvica.json";
import * as staravas_cesta from "../../data/nerazvrstaneceste/new/staravas.json";
import * as vlasici_cesta from "../../data/nerazvrstaneceste/new/vlasici.json";
import * as vrcici_cesta from "../../data/nerazvrstaneceste/new/vrcici.json";


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
    return data.properties;
});
 
let dinjiska_obj = dinjiska_cesta.default.features.map(data => {
    return data.properties;
});
 
let gorica_obj = gorica_cesta.default.features.map(data => {
    return data.properties;
});
 
let gradpag_obj = gradpag_cesta.default.features.map(data => {
    return data.properties;
});
 
let miskovici_obj = miskovici_cesta.default.features.map(data => {
    return data.properties;
});
 
let kosljun_obj = kosljun_cesta.default.features.map(data => {
    return data.properties;
});
 
let simuni_obj = simuni_cesta.default.features.map(data => {
    return data.properties;
});

let smokvica_obj = smokvica_cesta.default.features.map(data => {
    return data.properties;
});

let staravas_obj = staravas_cesta.default.features.map(data => {
    return data.properties;
});

let vlasici_obj = vlasici_cesta.default.features.map(data => {
    return data.properties;
});

let vrcici_obj = vrcici_cesta.default.features.map(data => {
    return data.properties;
});
 
export const obj_ceste = [...bosana_obj, ...dinjiska_obj, ...gorica_obj, ...gradpag_obj, ...miskovici_obj, ...kosljun_obj, ...simuni_obj, ...smokvica_obj, ...staravas_obj, ...vlasici_obj, ...vrcici_obj];