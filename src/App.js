import React, { useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Komponente/Header"; 

import './App.css';
import { Map, WMSTileLayer, TileLayer, GeoJSON, LayersControl, LayerGroup, CircleMarker, Popup, Tooltip} from 'react-leaflet';

import * as ceste from "./data/javne_ceste_wgs.json";

import * as bosana_nc from "./data/bosana_nc.json";
import * as gorica_nc from "./data/gorica_nz.json";
import * as kosljun_nc from "./data/kosljun_nc.json";
import * as rasvjeta from "./data/rasvjeta.json";


import * as drzavneceste from "./data/javneceste/drzavneceste.json";
import * as lokalneceste from "./data/javneceste/lokalneceste.json";
import * as zupanijskeceste from "./data/javneceste/zupanijskeceste.json";

import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';





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

    const rasvjeta1InputRef = useRef();
    const rasvjeta2InputRef = useRef();
    const rasvjeta3InputRef = useRef();
    const rasvjeta4InputRef = useRef();
    const rasvjeta5InputRef = useRef();
    const rasvjeta6InputRef = useRef();
    const rasvjeta7InputRef = useRef();



    const handleCheckboxLayer = (checkboxProps) => {
      let a = checkboxProps.target;

      if ('rasvjeta1InputRef'.includes(a)) {
        let layerAdd = rasvjeta1InputRef.current.leafletElement;
        if (checkboxProps.checked && mapRef.current && rasvjeta1InputRef.current) {
          const map = mapRef.current.leafletElement;
          map.addLayer(layerAdd);
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
    
    const rasvjeta1 = rasvjeta.features.filter(data => data.properties.Tip === 1).map((data) => {
      return data;
    })

    const rasvjeta2 = rasvjeta.features.filter(data => data.properties.Tip === 2).map((data) => {
      return data;
    })

    const rasvjeta3 = rasvjeta.features.filter(data => data.properties.Tip === 3).map((data) => {
      return data;
    })
    const rasvjeta4 = rasvjeta.features.filter(data => data.properties.Tip === 4).map((data) => {
      return data;
    })
    const rasvjeta5 = rasvjeta.features.filter(data => data.properties.Tip === 5).map((data) => {
      return data;
    })
    const rasvjeta6 = rasvjeta.features.filter(data => data.properties.Tip === 6).map((data) => {
      return data;
    })
    const rasvjeta7 = rasvjeta.features.filter(data => data.properties.Tip === 7).map((data) => {
      return data;
    })

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

    return (
      <>
        <Header checkboxState={handleCheckboxLayer}/>

        <Map className="markercluster-map" center={[44.442669, 15.054280]} zoom={13} ref={mapRef} maxZoom={25} minZoom={10} maxBounds={maxBounds}>
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

              <Overlay name="Layer 2">
                <LayerGroup ref={cesteGoricaInputRef}>
                  {gorica_nc.features.map(data => (
                  <GeoJSON key={data.properties.fid} data={data} color="orange"/>
                  ))}
                </LayerGroup>
            </Overlay>

            <Overlay name="rasvjeta 1">
              <MarkerClusterGroup ref={rasvjeta1InputRef} id="rasvjeta1" iconCreateFunction={createClusterCustomIcon}>
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
                    <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
                      <span>{elem.properties.id}</span>
                    </Tooltip>
                </CircleMarker>
                )
              })}
              </MarkerClusterGroup>
            </Overlay>
            <Overlay name="rasvjeta 2">
              <MarkerClusterGroup ref={rasvjeta2InputRef} id="rasvjeta2" iconCreateFunction={createClusterCustomIcon}>
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
            </Overlay>
            <Overlay name="rasvjeta 3">
              <MarkerClusterGroup ref={rasvjeta3InputRef} id="rasvjeta3" iconCreateFunction={createClusterCustomIcon}>
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
            </Overlay>
            <Overlay name="rasvjeta 4">
              <MarkerClusterGroup ref={rasvjeta4InputRef} id="rasvjeta4" iconCreateFunction={createClusterCustomIcon}>
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
            </Overlay>
            <Overlay name="rasvjeta 5">
              <MarkerClusterGroup ref={rasvjeta5InputRef} id="rasvjeta5" iconCreateFunction={createClusterCustomIcon}>
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
            </Overlay>
            <Overlay name="rasvjeta 6">
              <MarkerClusterGroup ref={rasvjeta6InputRef} id="rasvjeta6" iconCreateFunction={createClusterCustomIcon}>
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
            </Overlay>
            <Overlay name="rasvjeta sss">
              <MarkerClusterGroup ref={rasvjeta7InputRef} id="rasvjeta7" iconCreateFunction={createClusterCustomIcon}>
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
          </LayersControl>
        </Map>
      </>
    )
}