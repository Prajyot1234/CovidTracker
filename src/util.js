import React from "react";
import numeral from "numeral";
import {Circle,Popup} from "react-leaflet";

export const sortData = (data) =>{
    const sortedData = [...data];

    return sortedData.sort((a,b)=>(a.cases>b.cases)?-1:1)
}

const colorOption ={
    cases:{
        hex :"	#008000",
        multiplier:800,
    },
    deaths:{
        hex :"#FF0000",
        multiplier:1200,
    },
    recovered:{
        hex :"	#808080",
        multiplier:2000,
    }
}

export const getdataonmap = (data,caseType="cases")=>
   data.map(country=>(
        <Circle
            center={[country.countryInfo.lat,country.countryInfo.long]}
            color={colorOption[caseType].hex}
            fillColor={colorOption[caseType].hex}
            fillOpacity={0.5}
            radius={
                Math.sqrt(country[caseType]) * colorOption[caseType]. multiplier
            }
        >
          <Popup>
              <img src={country.countryInfo.flag} style={{paddingBottom:"6px"}} alt="anything" width="120px" height="80px" />
              <div style={{padding:"4px"}}>{country.country}</div>
              <div style={{Padding:"4px"}}>TotalCases : {numeral(country.cases).format("0,0")}</div>
              <div style={{Padding:"4px"}}>Deaths : {numeral(country.deaths).format("0,0")}</div>
              <div style={{Padding:"4px"}}>Recovered : {numeral(country.recovered).format("0,0")}</div>
              <div style={{Padding:"4px"}}>ActiveCases : {numeral(country.active).format("0,0")}</div>
          </Popup>
        </Circle>
        
   ));
