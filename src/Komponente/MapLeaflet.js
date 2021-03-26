import React, { useEffect, useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header"; 

import {Map, WMSTileLayer, TileLayer, GeoJSON, LayersControl, FeatureGroup, CircleMarker, Tooltip } from 'react-leaflet';

import * as ceste from "../data/javne_ceste_wgs.json";

import {trg, mostovi, plaze, bicikliste_staze, pjeskacke_zone_setalista, pjeskacke_zone, plocnici} from "./data/Javnepovrsinebezprometa";
import {gradevine, odlagalista_otpada, reciklazna_dvorista, sajmista_trznice, spomenici, stajalista_javnog_prijevoza} from "./data/Javnepovrsinebezprometa";
import {parkiralista, parkiralista_naplata} from "./data/Javnepovrsinebezprometa";
import {sportski_tereni, parkovi, drvoredi_zivice_travnjaci, djecja_igralista} from "./data/Javnepovrsinebezprometa";
import {groblja_krematoriji} from "./data/Javnepovrsinebezprometa";
import {bosana, dinjiska, gorica, gradpag, miskovici, kosljun, simuni, smokvica, staravas, vlasici, vrcici} from "./data/Nerazvrstaneceste";
import {rasvjeta1, rasvjeta2, rasvjeta3, rasvjeta4, rasvjeta5, rasvjeta6, rasvjeta7} from "./data/Rasvjeta";

import * as drzavneceste from "../data/javneceste/drzavneceste.json";
import * as lokalneceste from "../data/javneceste/lokalneceste.json";
import * as zupanijskeceste from "../data/javneceste/zupanijskeceste.json";

import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

const { Overlay } = LayersControl;

export default function MapLeaflet() {
  const center = [44.442669, 15.054280];
  const [bounds, setBounds] = useState([[[44.45041, 15.04369], [44.45041, 15.06535]], [[44.43824, 15.06535], [44.43834, 15.04369]]]);
  const zoom = 15;
  const [roadData, setRoadData] = useState([]);
  const [ekiData, setEkiData] = useState([]);
  const [state, setState] = useState();


  let lokalne_c = ceste.features.filter(data => data.properties.vrsta === 'lokalna').map((data) => {
      return data;
  })

    let [OSMRef, DOFRef, mapRef] = [...Array(3)].map(useRef);
    let [javneCesteDrzavneInputRef, javneCesteZupanijskeInputRef, javneCesteLokalneInputRef, newRoadlayer, newEkilayer, geoJsonRef] = [...Array(6)].map(useRef);
    let [cestePagInputRef, cesteMiskoviciInputRef, cesteGoricaInputRef, cesteBosanaInputRef, cesteDinjiskaInputRef, cesteKosljunInputRef, cesteSmokvicaInputRef, cesteStaraVasInputRef, cesteSimuniInputRef, cesteVlasiciInputRef, cesteVrciciInputRef ] = [...Array(11)].map(useRef);
    let [rasvjeta1InputRef, rasvjeta2InputRef, rasvjeta3InputRef, rasvjeta4InputRef, rasvjeta5InputRef, rasvjeta6InputRef, rasvjeta7InputRef] = [...Array(7)].map(useRef);
    const grobljaInputRef = useRef();
    let [trgJavnePovrsineInputRef, plocniciJavnePovrsineInputRef, plazeJavnePovrsineInputRef, biciklistickeJavnePovrsineInputRef, mostoviJavnePovrsineInputRef, pjesackeJavnePovrsineInputRef, setalistaJavnePovrsineInputRef] = [...Array(7)].map(useRef);
    let [parkiralistaNaplataJavnaInputRef, parkiralistaJavnaInputRef] = [...Array(2)].map(useRef);
    let [sportskiTereniInputRef, djecjaIgralistaInputRef, parkoviInputRef, zeleniloInputRef, stajalistaPrijevozInputRef, spomeniciInputRef, odlagalistaInputRef, reciklaznaInputRef, trzniceInputRef, gradjevineInputRef] = [...Array(10)].map(useRef);


    const handleCheckboxLayer = (checkboxProps) => {
      let a = checkboxProps.target;
      
      let northEast;
      let southWest;

      let coordinates;


      /*Triger za rjesavanje collision tooltip*/
      if (state === a) {
        setState('')
      } else if (state !== a) {
        setState(a)
      };

      /*Dodavanje layera na map*/

      if ('OSMRef'.includes(a)) {
        let layerAdd = OSMRef.current.leafletElement;
        let layerRemove = DOFRef.current.leafletElement;

        if (checkboxProps.checked && mapRef.current && OSMRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          map.removeLayer(layerRemove);
        }
        else if (!checkboxProps.checked && mapRef.current && OSMRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      } else if ('DOFRef'.includes(a)) {
        let layerAdd = DOFRef.current.leafletElement;
        let layerRemove = OSMRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && DOFRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          map.removeLayer(layerRemove);
        }
        else if (!checkboxProps.checked && mapRef.current && DOFRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('stajalistaPrijevozInputRef'.includes(a)) {
        let layerAdd = stajalistaPrijevozInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && stajalistaPrijevozInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];
          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && stajalistaPrijevozInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };


      if ('spomeniciInputRef'.includes(a)) {
        let layerAdd = spomeniciInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && spomeniciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());
        }
        else if (!checkboxProps.checked && mapRef.current && spomeniciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('odlagalistaInputRef'.includes(a)) {
        let layerAdd = odlagalistaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && odlagalistaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());
        }
        else if (!checkboxProps.checked && mapRef.current && odlagalistaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('reciklaznaInputRef'.includes(a)) {
        let layerAdd = reciklaznaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && reciklaznaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());
        }
        else if (!checkboxProps.checked && mapRef.current && reciklaznaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      
      if ('trzniceInputRef'.includes(a)) {
        let layerAdd = trzniceInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && trzniceInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && trzniceInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('gradjevineInputRef'.includes(a)) {
        let layerAdd = gradjevineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && gradjevineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && gradjevineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('sportskiTereniInputRef'.includes(a)) {
        let layerAdd = sportskiTereniInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && sportskiTereniInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && sportskiTereniInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('djecjaIgralistaInputRef'.includes(a)) {
        let layerAdd = djecjaIgralistaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && djecjaIgralistaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && djecjaIgralistaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('parkoviInputRef'.includes(a)) {
        let layerAdd = parkoviInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && parkoviInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && parkoviInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('zeleniloInputRef'.includes(a)) {
        let layerAdd = zeleniloInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && zeleniloInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && zeleniloInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('parkiralistaNaplataJavnaInputRef'.includes(a)) {
        let layerAdd = parkiralistaNaplataJavnaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && parkiralistaNaplataJavnaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && parkiralistaNaplataJavnaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('parkiralistaJavnaInputRef'.includes(a)) {
        let layerAdd = parkiralistaJavnaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && parkiralistaJavnaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && parkiralistaJavnaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('pjesackeJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = pjesackeJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && pjesackeJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && pjesackeJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('setalistaJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = setalistaJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && setalistaJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && setalistaJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('mostoviJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = mostoviJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && mostoviJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());
        }
        else if (!checkboxProps.checked && mapRef.current && mostoviJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('grobljaInputRef'.includes(a)) {
        let layerAdd = grobljaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && grobljaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());
        }
        else if (!checkboxProps.checked && mapRef.current && grobljaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('plazeJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = plazeJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && plazeJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && plazeJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('plocniciJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = plocniciJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && plocniciJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && plocniciJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('trgJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = trgJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && trgJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && trgJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('biciklistickeJavnePovrsineInputRef'.includes(a)) {
        let layerAdd = biciklistickeJavnePovrsineInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && biciklistickeJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && biciklistickeJavnePovrsineInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta1InputRef'.includes(a)) {
        let layerAdd = rasvjeta1InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta1InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta1InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta2InputRef'.includes(a)) {
        let layerAdd = rasvjeta2InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta2InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta2InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta3InputRef'.includes(a)) {
        let layerAdd = rasvjeta3InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta3InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta3InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta4InputRef'.includes(a)) {
        let layerAdd = rasvjeta4InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta4InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta4InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta5InputRef'.includes(a)) {
        let layerAdd = rasvjeta5InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta5InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta5InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta6InputRef'.includes(a)) {
        let layerAdd = rasvjeta6InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta6InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta6InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('rasvjeta7InputRef'.includes(a)) {
        let layerAdd = rasvjeta7InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta7InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          setBounds(layerAdd.getBounds());

        }
        else if (!checkboxProps.checked && mapRef.current && rasvjeta7InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('cestePagInputRef'.includes(a)) {
        let layerAdd = cestePagInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cestePagInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);

          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cestePagInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('cesteMiskoviciInputRef'.includes(a)) {
        let layerAdd = cesteMiskoviciInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteMiskoviciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteMiskoviciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('cesteGoricaInputRef'.includes(a)) {
        let layerAdd = cesteGoricaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteGoricaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteGoricaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      
      if ('cesteBosanaInputRef'.includes(a)) {
        let layerAdd = cesteBosanaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteBosanaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteBosanaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteDinjiskaInputRef'.includes(a)) {
        let layerAdd = cesteDinjiskaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteDinjiskaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteDinjiskaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteSmokvicaInputRef'.includes(a)) {
        let layerAdd = cesteSmokvicaInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteSmokvicaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteSmokvicaInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteKosljunInputRef'.includes(a)) {
        let layerAdd = cesteKosljunInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteKosljunInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteKosljunInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteStaraVasInputRef'.includes(a)) {
        let layerAdd = cesteStaraVasInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteStaraVasInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteStaraVasInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteSimuniInputRef'.includes(a)) {
        let layerAdd = cesteSimuniInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteSimuniInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteSimuniInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteVrciciInputRef'.includes(a)) {
        let layerAdd = cesteVrciciInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteVrciciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteVrciciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };
      if ('cesteVlasiciInputRef'.includes(a)) {
        let layerAdd = cesteVlasiciInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cesteVlasiciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
          
          northEast = layerAdd.getBounds()._northEast;
          northEast.lng = northEast.lng - 0.009;
          southWest = layerAdd.getBounds()._southWest;
          
          coordinates = [northEast, southWest];

          setBounds(coordinates);
        }
        else if (!checkboxProps.checked && mapRef.current && cesteVlasiciInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('javneCesteDrzavneInputRef'.includes(a)) {
        let layerAdd = javneCesteDrzavneInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && javneCesteDrzavneInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
        }
        else if (!checkboxProps.checked && mapRef.current && javneCesteDrzavneInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('javneCesteZupanijskeInputRef'.includes(a)) {
        let layerAdd = javneCesteZupanijskeInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && javneCesteZupanijskeInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
        }
        else if (!checkboxProps.checked && mapRef.current && javneCesteZupanijskeInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

      if ('javneCesteLokalneInputRef'.includes(a)) {
        let layerAdd = javneCesteLokalneInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && javneCesteLokalneInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
        }
        else if (!checkboxProps.checked && mapRef.current && javneCesteLokalneInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.removeLayer(layerAdd);
        }
      };

     // setCheckedCeste({[checkboxProps.target]: checkboxProps.checked});

      //console.log({[checkboxProps.target]:checkboxProps.checked})

    };

  const createClusterCustomIcon = function (cluster) {
      if (this.id === "rasvjeta1") {
        return L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'marker-cluster-custom-1',
          iconSize: L.point(40, 40, true),
          });
      } else if (this.id === "rasvjeta2") {
      return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom-2',
        iconSize: L.point(40, 40, true),
        });
      } else if (this.id === "rasvjeta3") {
      return L.divIcon({
        html: `<span>${cluster.getChildCount()}</span>`,
        className: 'marker-cluster-custom-3',
        iconSize: L.point(40, 40, true),
        });
      } else if (this.id === "rasvjeta4") {
        return L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'marker-cluster-custom-4',
          iconSize: L.point(40, 40, true),
          });
      } else if (this.id === "rasvjeta5") {
        return L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'marker-cluster-custom-5',
          iconSize: L.point(40, 40, true),
          });
      } else if (this.id === "rasvjeta6") {
        return L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'marker-cluster-custom-6',
          iconSize: L.point(40, 40, true),
          });
      } else if (this.id === "rasvjeta7") {
        return L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'marker-cluster-custom-7',
          iconSize: L.point(40, 40, true),
          });
       }
      
  };

  const highlightFeature = (e) => {
      let layer = e.target;
      layer.setStyle({
          weight: 6,
          color: "red",
          dashArray: "",
          fillOpacity: 0.7
      });
  
      layer.bringToFront();
  };
  
  const resetHighlight = (e) => {
    geoJsonRef.current.leafletElement.resetStyle(e.target);
  };

  const onEachFeatureNerazCeste = (feature, layer) => {

    let popupContent = document.createElement('div');
    popupContent.classList.add('main-popup-div');

    if (feature.properties.OZNAKA) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Oznaka nerazvrstane ceste: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.OZNAKA;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.UL_IME) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Naziv ulice: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.UL_IME;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.NA_IME) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Naziv naselja: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.NA_IME;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.KCBR) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Broj katastarske čestice: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.KCBR;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.ZASTOR) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Zastor: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.ZASTOR;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

     
    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    };

      layer.bindPopup(popupContent);

      layer.on({
        mouseover: highlightFeature.bind(this),
        mouseout: resetHighlight.bind(this)
      });    
  };

  const onEachFeatureKomunalnaInfrastruktura = (feature, layer) => {
    let popupContent = document.createElement('div');
    popupContent.classList.add('main-popup-div');
    
    if (feature.properties.Vrsta) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Vrsta komunalne infrastrukture: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Vrsta;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Oznaka) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Oznaka komunalne infrastrukture: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Oznaka;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Naziv) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Naziv komunalne infrastrukture: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Naziv;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Naselje) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Naselje: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Naselje;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.kcbr) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Broj katastarske čestice: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.kcbr;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Vlasnistvo) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Vlasništvo: <br>";

      if (feature.properties.Vlasnistvo.match(/\d+/g)) {
        feature.properties.Vlasnistvo.match(/\d+/g).forEach(data => {
            let text_a = document.createElement('a');
            text_a.classList.add('popup-a');
            text_a.innerHTML = data;
            let aa = "/"+feature.properties.Oznaka+"-vlasnistvo/"+feature.properties.objekt+"/"+feature.properties.Oznaka+"-"+feature.properties.id+"-"+data+".pdf";
            text_a.setAttribute("href", aa);
            text_a.setAttribute("target", "_blank");
            text_p.appendChild(text_a);
        });
        } else {
          let text_span = document.createElement('span');
          text_span.classList.add('popup-span');
          text_span.innerHTML = feature.properties.Vlasnistvo;

          text_p.appendChild(text_span);
        }
      popupContent.appendChild(text_p);
    };

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    };

    layer.bindPopup(popupContent);

    layer.on({
      mouseover: highlightFeature.bind(this),
      mouseout: resetHighlight.bind(this)
    });
  };

  const handleZoomStateOnMap = (a) => {
      const corner1 = [a.coord[1], a.coord[0]];
      const corner2 = [a.coord[3], a.coord[2]];

      setBounds([corner1, corner2]);
  };
  

  const createJsonDataOnMap = (data) => {
    let layerRoadAdd = newRoadlayer.current.leafletElement;
    let layerEkiAdd = newEkilayer.current.leafletElement;
    

    if (data[0].properties.Komunalna) {
      const map = mapRef.current.leafletElement;
      map.addLayer(layerEkiAdd);
      setEkiData(data);
      setRoadData([]);
      if (newRoadlayer.current) {
        map.removeLayer(layerRoadAdd);
      };
    } else {
      const map = mapRef.current.leafletElement;
      map.addLayer(layerRoadAdd);
      setEkiData([]);
      setRoadData(data);
      if (newEkilayer.current) {
        map.removeLayer(layerEkiAdd);
      };
    };
  };

  const onEachFeaturePoint = (feature, layer) =>  {
    let popupContent = document.createElement('div');
    popupContent.classList.add('main-popup-div');
    
    if (feature.properties.Vrsta) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Vrsta komunalne infrastrukture: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Vrsta;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Oznaka) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Oznaka komunalne infrastrukture: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Oznaka;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Naziv) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Naziv komunalne infrastrukture: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Naziv;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Naselje) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Naselje: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.Naselje;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.kcbr) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Broj katastarske čestice: <br>";

      let text_span = document.createElement('span');
      text_span.classList.add('popup-span');
      text_span.innerHTML = feature.properties.kcbr;

      text_p.appendChild(text_span);
      popupContent.appendChild(text_p);
    };

    if (feature.properties.Vlasnistvo) {
      let text_p = document.createElement('p');
      text_p.classList.add('popup-p');
      text_p.innerHTML = "Vlasništvo: <br>";

      if (feature.properties.Vlasnistvo.match(/\d+/g)) {
        feature.properties.Vlasnistvo.match(/\d+/g).forEach((data) => {
            let text_a = document.createElement('a');
            text_a.classList.add('popup-a');
            text_a.innerHTML = data;
            let aa = "/"+feature.properties.Oznaka+"-vlasnistvo/"+feature.properties.objekt+"/"+feature.properties.Oznaka+"-"+feature.properties.id+"-"+data+".pdf";
            text_a.setAttribute("href", aa);
            text_a.setAttribute("target", "_blank");
            text_p.appendChild(text_a);
        })
        } else {
          let text_span = document.createElement('span');
          text_span.classList.add('popup-span');
          text_span.innerHTML = feature.properties.Vlasnistvo;

          text_p.appendChild(text_span);
        }
      popupContent.appendChild(text_p);
    };

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    };

    layer.bindPopup(popupContent);

    layer.on({
      mouseover: highlightFeature.bind(this),
      mouseout: resetHighlight.bind(this)
    });
  };

 const pointToLayer = (feature, latlng) => {
    return L.circleMarker(latlng, 
      { radius: 8, fillOpacity: 1, fillColor: "#85b66f", color: "#000", opacity: 1, weight: 1,});
  };

  const overlap = (rect1, rect2) => {
    return(!(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom));
  };
  

  const handleZoomEnd = () => {
    let rects = [];
    let tooltips = document.getElementsByClassName('myTooltip');
    for (let i = 0; i < tooltips.length; i++) {
      tooltips[i].style.visibility = '';
      rects[i] = tooltips[i].getBoundingClientRect();
    };

    for (let i = 0; i < tooltips.length; i++) {
      if (tooltips[i].style.visibility !== 'hidden') {
        for (let j = i + 1; j < tooltips.length; j++) {
          if (overlap(rects[i], rects[j])) tooltips[j].style.visibility = 'hidden';
        };
      };
    };
  };

  useEffect(handleZoomEnd, [state]); //zove funkciju svaki put kada korisnik doda novi sloj na map


  return (
      < div className="map">
        <Header checkboxState={handleCheckboxLayer} zoomState={handleZoomStateOnMap} handleJsonData={createJsonDataOnMap}/>

        <Map onMoveEnd={handleZoomEnd} className="markercluster-map" center={center} zoom={zoom} ref={mapRef} maxZoom={18} minZoom={10} bounds={bounds}/* maxBounds={(45, 14), (43, 16)}*/>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap" >
              <TileLayer ref={OSMRef}
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer  name="DOF 2014-2016" >
              <WMSTileLayer ref={DOFRef}
                format="image/png"
                layers= "OI.OrthoImagery"
                url="https://geoportal.dgu.hr/services/inspire/orthophoto_2014-2016/wms"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Javne ceste">
              <GeoJSON data={lokalne_c} style={{ color: 'black' }}/>
            </LayersControl.Overlay>
      
            <Overlay name="Layer 1">
              <FeatureGroup ref={javneCesteDrzavneInputRef}>
                  {drzavneceste.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red"/>
                    ))
                  }
              </FeatureGroup>
            </Overlay>

            <Overlay name="nove dodane ceste">
              <FeatureGroup ref={newRoadlayer}>
                  {roadData.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" weight={5} onEachFeature={onEachFeatureNerazCeste.bind(this)}/>
                    ))
                  }
              </FeatureGroup>
              <FeatureGroup ref={newEkilayer}>
                  {ekiData.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" weight={5} onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}/>
                    ))
                  }
              </FeatureGroup>
            </Overlay>

            <Overlay name="Layer 2">
              <FeatureGroup ref={javneCesteZupanijskeInputRef}>
                  {zupanijskeceste.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="blue"/>
                    ))
                  }
              </FeatureGroup>
            </Overlay>
            <Overlay name="Layer 1">
              <FeatureGroup ref={javneCesteLokalneInputRef}>
                  {lokalneceste.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="purple"/>
                    ))
                  }
              </FeatureGroup>
            </Overlay>

            <Overlay name="nerazvrstane ceste"> 
                <FeatureGroup ref={cestePagInputRef} >
                  {gradpag.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteMiskoviciInputRef}>
                  {miskovici.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef}  onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteGoricaInputRef}>
                  {gorica.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef}  onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup  ref={cesteBosanaInputRef} >
                  {bosana.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup >
                <FeatureGroup ref={cesteKosljunInputRef}>
                  {kosljun.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteDinjiskaInputRef}>
                  {dinjiska.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteVlasiciInputRef}>
                  {vlasici.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteVrciciInputRef}>
                  {vrcici.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                    <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                      <span>{data.properties.OZNAKA}</span>
                    </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteStaraVasInputRef}>
                  {staravas.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteSmokvicaInputRef}>
                  {smokvica.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
                <FeatureGroup ref={cesteSimuniInputRef}>
                  {simuni.default.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red" ref={geoJsonRef} onEachFeature={onEachFeatureNerazCeste.bind(this)}>
                      <Tooltip direction='right' opacity={1} permanent className = 'myTooltip roadTooltip'>
                        <span>{data.properties.OZNAKA}</span>
                      </Tooltip>
                    </GeoJSON>
                  ))}
                </FeatureGroup>
            </Overlay>

            <Overlay name="Rasvjeta">
              <MarkerClusterGroup ref={rasvjeta1InputRef} id="rasvjeta1" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={17}>
                {rasvjeta1.map((elem, i) => {
                return (
                <CircleMarker 
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="#1f78b4" 
                    color="black"
                    opacity= {1}
                    fillOpacity= {1}
                    weight={1}
                    radius={5}>
                    <Tooltip direction='right' offset={[-10, -13]} opacity={1} permanent className = 'myTooltip tooltip-css'>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
              <MarkerClusterGroup ref={rasvjeta2InputRef} id="rasvjeta2" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={16}>
                {rasvjeta2.map((elem, i) => {
                return (
                <CircleMarker 
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="#e84c54" 
                    color="black"
                    opacity= {1}
                    weight={1}
                    fillOpacity= {1}
                    radius={5}>
                    <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
              <MarkerClusterGroup ref={rasvjeta3InputRef} id="rasvjeta3" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={16}>
                {rasvjeta3.map((elem, i) => {
                return (
                <CircleMarker 
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="#18af18" 
                    color="black"
                    opacity= {1}
                    weight={1}
                    fillOpacity= {1}
                    radius={5}>
                    <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
              <MarkerClusterGroup ref={rasvjeta4InputRef} id="rasvjeta4" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={16}>
                {rasvjeta4.map((elem, i) => {
                return (
                <CircleMarker 
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="#d53fc9" 
                    color="black"
                    opacity= {1}
                    weight={1}
                    fillOpacity= {1}
                    radius={5}>
                    <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
              <MarkerClusterGroup ref={rasvjeta5InputRef} id="rasvjeta5" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={17}>
                {rasvjeta5.map((elem, i) => {
                return (
                <CircleMarker 
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="black" 
                    color="black"
                    opacity= {1}
                    weight={1}
                    fillOpacity= {1}
                    radius={5}>
                    <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
              <MarkerClusterGroup ref={rasvjeta6InputRef} id="rasvjeta6" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={18}>
                {rasvjeta6.map((elem, i) => {
                return (
                <CircleMarker
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="#32c7c5" 
                    color="black"
                    opacity= {1}
                    weight={1}
                    fillOpacity= {1}
                    radius={5}>
                    <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
              <MarkerClusterGroup ref={rasvjeta7InputRef} id="rasvjeta7" iconCreateFunction={createClusterCustomIcon} disableClusteringAtZoom={18}>
                {rasvjeta7.map((elem, i) => {
                return (
                <CircleMarker 
                    key = {i}
                    center={{lat: elem.geometry.coordinates[1], lng: elem.geometry.coordinates[0]}}
                    fillColor="#e9e335"
                    color="black"
                    weight={1}
                    opacity= {1}
                    fillOpacity= {1}
                    radius={5}> <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                        <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
            </Overlay>

            <Overlay name="javne površine bez prometa">
              <FeatureGroup ref={trgJavnePovrsineInputRef}>
                {trg.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#bab667" fillColor="#d9d73d" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={plocniciJavnePovrsineInputRef}>
                {plocnici.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#7d8b8f" dashArray="5" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={plazeJavnePovrsineInputRef}>
                {plaze.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#265980" fillColor="#7babd0" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={biciklistickeJavnePovrsineInputRef}>
                {bicikliste_staze.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#f3a6b2" ref={geoJsonRef} onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={mostoviJavnePovrsineInputRef}>
                {mostovi.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#9f7acc" fillColor="#9f7acc" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={pjesackeJavnePovrsineInputRef}>
                {pjeskacke_zone.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#098d09" fillColor="#76b70c" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)} >
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={setalistaJavnePovrsineInputRef}>
                {pjeskacke_zone_setalista.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#285b22" dashArray="5" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
            </Overlay>

            <Overlay name="Javna parkirališta">
              <FeatureGroup ref={parkiralistaNaplataJavnaInputRef}>
                {parkiralista_naplata.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#beb297" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                </GeoJSON>
              ))}
              </FeatureGroup>
              <FeatureGroup ref={parkiralistaJavnaInputRef}>
                {parkiralista.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323"  fillColor="#c43c39" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
            </Overlay>

            <Overlay name="Javne zelene površine">
              <FeatureGroup ref={djecjaIgralistaInputRef}>
                {djecja_igralista.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#e77148" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={zeleniloInputRef}>
                {drvoredi_zivice_travnjaci.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#987db7" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={parkoviInputRef}>
                {parkovi.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#becf50" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={sportskiTereniInputRef}>
                {sportski_tereni.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#e15989" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
            </Overlay>

            <Overlay name="Građevine i uređaji javne namjene">
            <FeatureGroup ref={stajalistaPrijevozInputRef}>
                {stajalista_javnog_prijevoza.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#a47158" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={spomeniciInputRef}>
                {spomenici.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} onEachFeature={onEachFeaturePoint.bind(this)} pointToLayer={pointToLayer.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
             <FeatureGroup ref={odlagalistaInputRef}>
                {odlagalista_otpada.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#beb297" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={reciklaznaInputRef}>
                {reciklazna_dvorista.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#91522d" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={trzniceInputRef}>
                {sajmista_trznice.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#7d8b8f" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
              <FeatureGroup ref={gradjevineInputRef}>
                {gradevine.default.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="#232323" fillColor="#e5b636" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
            </Overlay>

            <Overlay name="groblja">
              <FeatureGroup ref={grobljaInputRef}>
                {groblja_krematoriji.default.features.map(data => (
                  <GeoJSON key={data.properties.id} data={data} color="#c43c39" fillColor="#c43c39" fillOpacity="0.7" weight="2" onEachFeature={onEachFeatureKomunalnaInfrastruktura.bind(this)}>
                    <Tooltip offset={[-10, 0]} direction='right' opacity={1} permanent className = 'myTooltip ekiTooltip'>
                      <span>{data.properties.Vrsta}</span>
                    </Tooltip>
                  </GeoJSON>
                ))}
              </FeatureGroup>
            </Overlay>
          </LayersControl>
        </Map>
      </div>
    )
}