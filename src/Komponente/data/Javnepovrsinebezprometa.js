import * as trga from "../../data/javnepovrsinebezprometa/trg.json";
import * as mostovia from "../../data/javnepovrsinebezprometa/mostovi.json";
import * as plazea from "../../data/javnepovrsinebezprometa/plaze.json";
import * as bicikliste_stazea from "../../data/javnepovrsinebezprometa/biciklisticke_i_pjesacke_staze.json";
import * as pjeskacke_zone_setalistaa from "../../data/javnepovrsinebezprometa/pjesacke_zone_setalista.json";
import * as pjeskacke_zonea from "../../data/javnepovrsinebezprometa/pjesacke_zone.json";
import * as plocnicia from "../../data/javnepovrsinebezprometa/plocnici_precaci_nogostupi.json";



export const trg = trga;
export const mostovi = mostovia;
export const plaze = plazea;
export const bicikliste_staze = bicikliste_stazea;
export const pjeskacke_zone_setalista = pjeskacke_zone_setalistaa;
export const pjeskacke_zone = pjeskacke_zonea;
export const plocnici = plocnicia;


let trg_obj = trg.default.features.map(data => {
   return data.properties;
});

let mostovi_obj = mostovi.default.features.map(data => {
    return data.properties;
});

let plaze_obj = plaze.default.features.map(data => {
    return data.properties;
});

let biciklisticke_staze_obj = bicikliste_staze.default.features.map(data => {
    return data.properties;
});

let pjeskacke_zone_setalista_obj = pjeskacke_zone_setalista.default.features.map(data => {
    return data.properties;
});

let pjeskacke_zone_obj = pjeskacke_zone.default.features.map(data => {
    return data.properties;
});

let plocnici_obj = plocnici.default.features.map(data => {
    return data.properties;
});

export const obj_eki = [...trg_obj, ...mostovi_obj, ...plaze_obj, ...biciklisticke_staze_obj, ...pjeskacke_zone_setalista_obj, ...pjeskacke_zone_obj, ...plocnici_obj];




