import React from 'react';
import {Map as LeafletMap ,TileLayer} from "react-leaflet";
import "./Map.css";
import { getdataonmap } from "./util";

function Map({countries,caseType,center,zoom}) {
    return (
        <div className="Map">
            <LeafletMap countries={countries} center={center} zoom={zoom}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 />
                {getdataonmap(countries,caseType)}
            </LeafletMap>
        </div>
    )
}

export default Map;
