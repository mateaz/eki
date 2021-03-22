/*
JAVNE POVRŠINE BEZ PROMETA
*/

import * as trga from "../../data/javnepovrsinebezprometa/trg.json";
import * as mostovia from "../../data/javnepovrsinebezprometa/mostovi.json";
import * as plazea from "../../data/javnepovrsinebezprometa/plaze.json";
import * as bicikliste_stazea from "../../data/javnepovrsinebezprometa/biciklisticke_i_pjesacke_staze.json";
import * as pjeskacke_zone_setalistaa from "../../data/javnepovrsinebezprometa/pjesacke_zone_setalista.json";
import * as pjeskacke_zonea from "../../data/javnepovrsinebezprometa/pjesacke_zone.json";
import * as plocnicia from "../../data/javnepovrsinebezprometa/plocnici_precaci_nogostupi.json";
/*
GRAĐEVINE I UREĐAJI JAVNE NAMJENE
*/
import * as gradevinea from "../../data/gradevineuredajijavnenamjene/gradevine_lokalnog_znacaja.json";
import * as odlagalista_otpadaa from "../../data/gradevineuredajijavnenamjene/odlagalista_otpada.json";
import * as reciklazna_dvoristaa from "../../data/gradevineuredajijavnenamjene/reciklazna_dvorista.json";
import * as sajmista_trznicee from "../../data/gradevineuredajijavnenamjene/sajmista_trznice.json";
import * as spomenicii from "../../data/gradevineuredajijavnenamjene/spomenici.json";
import * as stajalista_javnog_prijevozaa from "../../data/gradevineuredajijavnenamjene/stajalista_javnog_prijevoza.json";

/*
JAVNA PARKIRALIŠTA
*/
import * as parkiralistaa from "../../data/javnaparkiralista/parkiralista.json";
import * as parkiralista_naplataa from "../../data/javnaparkiralista/parkiralista_naplata.json";

/*
JAVNE ZELENE POVRŠINE
*/
import * as sportski_terenia from "../../data/javnezelenepovrsine/sportski_tereni.json";
import * as parkovia from "../../data/javnezelenepovrsine/parkovi.json";
import * as drvoredi_zivice_travnjacia from "../../data/javnezelenepovrsine/drvoredi_zivice_travnjaci.json";
import * as djecja_igralistaa from "../../data/javnezelenepovrsine/djecja_igralista.json";

/*
GROBLJA I KREMATORIJI
*/
import * as groblja_krematorijia from "../../data/grobljaikrematoriji/groblja_krematoriji.json";


export const trg = trga;
export const mostovi = mostovia;
export const plaze = plazea;
export const bicikliste_staze = bicikliste_stazea;
export const pjeskacke_zone_setalista = pjeskacke_zone_setalistaa;
export const pjeskacke_zone = pjeskacke_zonea;
export const plocnici = plocnicia;


export const gradevine = gradevinea;
export const odlagalista_otpada = odlagalista_otpadaa;
export const reciklazna_dvorista = reciklazna_dvoristaa;
export const sajmista_trznice = sajmista_trznicee;
export const spomenici = spomenicii;
export const stajalista_javnog_prijevoza = stajalista_javnog_prijevozaa;

export const parkiralista = parkiralistaa;
export const parkiralista_naplata = parkiralista_naplataa;

export const sportski_tereni = sportski_terenia;
export const parkovi = parkovia;
export const drvoredi_zivice_travnjaci = drvoredi_zivice_travnjacia;
export const djecja_igralista = djecja_igralistaa;

export const groblja_krematoriji = groblja_krematorijia;


let trg_obj = trg.default.features.map(data => {
   return data;
});

let mostovi_obj = mostovi.default.features.map(data => {
    return data;
});

let plaze_obj = plaze.default.features.map(data => {
    return data;
});

let biciklisticke_staze_obj = bicikliste_staze.default.features.map(data => {
    return data;
});

let pjeskacke_zone_setalista_obj = pjeskacke_zone_setalista.default.features.map(data => {
    return data;
});

let pjeskacke_zone_obj = pjeskacke_zone.default.features.map(data => {
    return data;
});

let plocnici_obj = plocnici.default.features.map(data => {
    return data;
});


let gradevine_obj = gradevine.default.features.map(data => {
    return data;
});
 
let odlagalista_otpada_obj = odlagalista_otpada.default.features.map(data => {
     return data;
});
 
let reciklazna_dvorista_obj = reciklazna_dvorista.default.features.map(data => {
     return data;
});
 
let sajmista_trznice_obj = sajmista_trznice.default.features.map(data => {
     return data;
});
 
let spomenici_obj = spomenici.default.features.map(data => {
     return data;
});
 
let stajalista_javnog_prijevoza_obj = stajalista_javnog_prijevoza.default.features.map(data => {
     return data;
});

let parkiralista_obj = parkiralista.default.features.map(data => {
    return data;
});

let parkiralista_naplata_obj = parkiralista_naplata.default.features.map(data => {
    return data;
});


/**/ 
let sportski_tereni_obj = sportski_tereni.default.features.map(data => {
    return data;
});

let parkovi_obj = parkovi.default.features.map(data => {
    return data;
});

let drvoredi_zivice_travnjaci_obj = drvoredi_zivice_travnjaci.default.features.map(data => {
   return data;
});

let djecja_igralista_obj = djecja_igralista.default.features.map(data => {
   return data;
});

let groblja_krematoriji_obj = groblja_krematoriji.default.features.map(data => {
    return data;
 });
 

export const obj_eki = [...trg_obj, ...mostovi_obj, ...plaze_obj, 
    ...biciklisticke_staze_obj, ...pjeskacke_zone_setalista_obj, 
    ...pjeskacke_zone_obj, ...plocnici_obj,
    ...gradevine_obj, ...odlagalista_otpada_obj, ...reciklazna_dvorista_obj,
    ...sajmista_trznice_obj, ...spomenici_obj, ...stajalista_javnog_prijevoza_obj,
    ...parkiralista_obj, ...parkiralista_naplata_obj, ...sportski_tereni_obj, ...parkovi_obj,
    ...drvoredi_zivice_travnjaci_obj, ...djecja_igralista_obj, ...groblja_krematoriji_obj
];




