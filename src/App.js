import React, { useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Komponente/Header"; 

import './App.css';
import { Map, WMSTileLayer, TileLayer, GeoJSON, LayersControl, LayerGroup} from 'react-leaflet';

import * as ceste from "./data/javne_ceste_wgs.json";

import * as bosana_nc from "./data/bosana_nc.json";
import * as gorica_nc from "./data/gorica_nz.json";
import * as kosljun_nc from "./data/kosljun_nc.json";

import * as drzavneceste from "./data/javneceste/drzavneceste.json";
import * as lokalneceste from "./data/javneceste/lokalneceste.json";
import * as zupanijskeceste from "./data/javneceste/zupanijskeceste.json";



const { Overlay } = LayersControl;

export default function SimpleExample() {

  let [checkedInput, setCheckedCeste] = useState({ 
      cesteGoricaInput: false, 
      cestePagInput: false, 
      cesteMiskoviciInput: false, 
      javneCesteDrzavneInput: false, 
      javneCesteZupanijskeInput: false,
      javneCesteLokalneInput: false });

  const onEachFeatureJavneCeste = (feature, layer) => {
    //console.log(layer);
    layer.on('click', function (e) {
      // e = event
      console.log(e);
      // You can make your ajax call declaration here
      //$.ajax(... 
    });
  }  

    let lokalne_c = ceste.features.filter(data => data.properties.vrsta === 'lokalna').map((data) => {
      return data;
    })

    const mapRef = useRef();
    const javneCesteDrzavneInputRef = useRef();
    const javneCesteZupanijskeInputRef = useRef();
    const javneCesteLokalneInputRef = useRef();

    const cestePagInputRef = useRef();
    const cesteMiskoviciInputRef = useRef();
    const cesteGoricaInputRef = useRef();
    


    const handleCheckboxLayer = (checkboxProps) => {
      let a = checkboxProps.target;

      if ('cestePagInputRef'.includes(a)) {
        let layerAdd = cestePagInputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && cestePagInputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
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
        }
        else if (!checkboxProps.checked && mapRef.current && cesteGoricaInputRef.current) {
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

      setCheckedCeste({[checkboxProps.target]: checkboxProps.checked});

      console.log({[checkboxProps.target]:checkboxProps.checked})

    };

    return (
      <>
        <Header checkboxState={handleCheckboxLayer}/>

        <Map center={[44.442669, 15.054280]} zoom={13} ref={mapRef} >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="DOF 2014-2016">
              <WMSTileLayer
                format="image/png"
                layers= "OI.OrthoImagery"
                url="https://geoportal.dgu.hr/services/inspire/orthophoto_2014-2016/wms"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay name="Javne ceste">
              <GeoJSON data={lokalne_c} style={{ color: 'black' }} onEachFeature={onEachFeatureJavneCeste.bind(this)}/>
            </LayersControl.Overlay>
      
            <Overlay name="Layer 1">
              <LayerGroup ref={javneCesteDrzavneInputRef}>
                  {drzavneceste.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="red"/>
                    ))
                  }
              </LayerGroup>
            </Overlay>

            <Overlay name="Layer 2">
              <LayerGroup ref={javneCesteZupanijskeInputRef}>
                  {zupanijskeceste.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="blue"/>
                    ))
                  }
              </LayerGroup>
            </Overlay>
            <Overlay name="Layer 1">
              <LayerGroup ref={javneCesteLokalneInputRef}>
                  {lokalneceste.features.map(data => (
                    <GeoJSON key={data.properties.fid} data={data} color="purple"/>
                    ))
                  }
              </LayerGroup>
            </Overlay>

            <Overlay name="Layer 2">
              <LayerGroup ref={cestePagInputRef} >
                  {bosana_nc.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="pink"/>
                  ))}
                </LayerGroup>
              </Overlay>

              <Overlay name="Layer 2">
              <LayerGroup ref={cesteMiskoviciInputRef}>
                  {kosljun_nc.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="brown"/>
                  ))}
                </LayerGroup>
              </Overlay>

              <Overlay name="Layer 2" name="Grid1" >
                <LayerGroup ref={cesteGoricaInputRef}>
                  {gorica_nc.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="orange"/>
                  ))}
                </LayerGroup>
            </Overlay>
          </LayersControl>
        </Map>
      </>
    )
}