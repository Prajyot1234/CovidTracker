import React, { useState,useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem} from "@material-ui/core";
import Table from "./Table" ;
import {sortData} from "./util";
import LineCharts from "./LineCharts";
import Map from "./Map";
import Activecases from "./Activecases";
import VaccineInfo from "./VaccineInfo";
import Footer from "./Footer";
import "leaflet/dist/leaflet.css";



// https://disease.sh/v3/covid-19/countries
function App() {
  
 const formatter = new Intl.NumberFormat("en") ;

 const [countries,setCountries] = useState([]);
 const [country,setCountry] = useState("worldwide");
 const [countryInfo,setcountryInfo] = useState({});
 const [tabledata,setTabledata] = useState([]);
 const [mapcenter,setmapcenter] = useState({lat :34.80746,lng:-40.4796});
 const [mapCountries,setmapCountries]= useState([]);
 const [zoom,setZoom] = useState(3);
 const [caseType,setCaseType] = useState("cases");
 const [selectCity,setselectCity] = useState("worldwide");

 
 useEffect(()=>{
   fetch("https://disease.sh/v3/covid-19/all")
   .then(response=>response.json())
   .then((data)=>{
     setcountryInfo(data);
   })
 },[]);
 
 useEffect(()=>{
   const getCountriesdata = async()=>{
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then(response=>response.json())
   .then((data)=>{
    setmapCountries(data);
     const countries = data.map((country)=>(
       {
         name:country.country,
         value:country.countryInfo.iso2,
       }
     ));
     const sortedData = sortData(data);
     setTabledata(sortedData);
     setCountries(countries);
   });
  }
  getCountriesdata();
 },[]);
 
 const getchange = async (e) =>{
   const getvalue = e.target.value;
   setselectCity(getvalue);
   const url = getvalue === "worldwide" 
   ? "https://disease.sh/v3/covid-19/all":
   `https://disease.sh/v3/covid-19/countries/${getvalue}
   `;
   
   await fetch(url)
   .then(response => response.json())
   .then((data)=>{
     setmapcenter([data.countryInfo.lat,data.countryInfo.long]);
     setZoom(4);
     setCountry(getvalue);
     setcountryInfo(data);
   })
 }
 
 return (
   <div className="App">
   {/* this is for header of website */}
     <div className="App_header">
         <h1>Covid-Info</h1>
         <FormControl className="App_formcontrol">
         {/* how to pass multiple function in jsx () => f1(); f2() */}
           <Select variant="outlined" onChange={ e => {getchange(e)}} value={country}>
             <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country)=>(
                 <MenuItem value={country.name}>{country.name}</MenuItem>
                ))
              }
           </Select>
         </FormControl>
     </div>
     <hr className="App_hr" />
     {/* this is for front body of website */}
     <div className="App_frontbody">
        <p className="panademic_p">COVID-19 CORONAVIRUS STATISTICS</p>
 
        <p className="cases_heading">Coronavirus Cases:</p>
        <h1 className="cases_h1">
       
             {formatter.format(countryInfo.cases)}
            
        </h1>
 
        <p className="cases_heading">Deaths:</p>
        <h1 className="cases_deaths">
             {formatter.format(countryInfo.deaths)}     
        </h1>
 
        <p className="cases_heading">Recovered:</p>
        <h1 className="cases_recovered">{formatter.format(countryInfo.recovered)}</h1>

     </div>
     <Map caseType={caseType} countries={mapCountries} center={mapcenter} zoom={zoom} />
     
        <div className="btn-display">
              <div className="btn-cases">
                <button onClick={(e)=> setCaseType("cases")}>C</button>
                <h6>Cases</h6>
              </div>
              <div className="btn-deaths">
                <button onClick={(e)=> setCaseType("deaths")}>D</button>
                <h6>Deaths</h6>
              </div>
              <div className="btn-recovered">
                <button onClick={(e)=> setCaseType("recovered")}>R</button>
                <h6>Recovered</h6>
              </div>
        </div>

      {/* active cases componenet */}
     <Activecases activecases={countryInfo} />
    
     {/* this is fro graph */}
     <LineCharts country={selectCity}  />

     <p className="panademic_p margin-top">COVID-19 CORONAVIRUS TABLE STATISTICS</p>
     {/* this is for table  */} 
     <Table countries={tabledata}/>
    
    <p className="panademic_p margin-top">CORONA VACCINE STATUS</p>
    {/* Corona Vaccine  */}
    <VaccineInfo />

    {/* Footer */}
    <Footer />
   </div>
 )
}

export default App;
