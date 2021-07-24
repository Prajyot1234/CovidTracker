import React , { useState , useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import "./LineCharts.css";
import numeral from "numeral";


const options = {
    legend: {
        display: false
      },
      elements:{
        point:{
            radius:0,
        },
      },
      maintainAspectRatio: false,
      tooltips: {
        mode: "index",
        intersect : false ,
        callbacks : {
            label : function (tooltipItem , data){
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
      },
      scales: {
        xAxes:[
            {
                gridLines:{
                    display:false,
                },
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:"ll",
                },
           },
        ],
        yAxes : [
            {
               
                ticks:{
                    callback: function (value,index,values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

function LineCharts({country}) {
    const [data,setData] = useState({});
    const [data1,setData1] =useState({});
    const [data2,setData2] =useState({});
   
    function createchartdata( data ,caseType ){
        const chartData = [];
        let lastdatapoint ;
        for(let date in data[caseType]){
            if(lastdatapoint){
                let newdatapoint = {
                    x:date,
                    y:data[caseType][date]-lastdatapoint
                };
                chartData.push(newdatapoint);
            }
            lastdatapoint = data[caseType][date]; 
        }
        return chartData 
    }
    
        function createchartdata1( data ,caseType ){
            const chartData = [];
            let lastdatapoint ;
                if(data.message){
                    
                }else{
                    for(let date in data["timeline"][caseType]){
                        if(lastdatapoint){
                            let newdatapoint = {
                                x:date,
                                y:data["timeline"][caseType][date]-lastdatapoint
                            };
                            chartData.push(newdatapoint);
                        }
                        lastdatapoint = data["timeline"][caseType][date]; 
                    }
                    return chartData
                }
               
          
        }
  
    
    useEffect(()=>{
        const getdata = async()=>{
            const url = country ==="worldwide" ? "https://disease.sh/v3/covid-19/historical/all?lastdays=240" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=240`;
            await fetch(url)
            .then(response=>response.json())
            .then(data => {
                if(country ==="worldwide"){
                    const chartdata = createchartdata( data , "cases"  );
                    setData(chartdata);  
                }else{
                    const chartdata = createchartdata1( data , "cases"  );
                    setData(chartdata); 
                } 
            })
        }
        getdata();
    },[country]);
    
    useEffect(()=>{
        const getdata1 = async()=>{
            const url = country ==="worldwide" ? "https://disease.sh/v3/covid-19/historical/all?lastdays=240" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=240`;
            await fetch(url)
            .then(response=>response.json())
            .then(data => {
                if(country ==="worldwide"){
                    const chartdata = createchartdata( data , "deaths"  );
                    setData1(chartdata);  
                }else{
                    const chartdata = createchartdata1( data , "deaths"  );
                    setData1(chartdata); 
                } 
            })
        }
        getdata1();
    },[country]);

    useEffect(()=>{
        const getdata2 = async()=>{
            const url = country === "worldwide" ? "https://disease.sh/v3/covid-19/historical/all?lastdays=240" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=240`;
            await fetch(url)
            .then(response=>response.json())
            .then(data => {
                if(country ==="worldwide"){
                    const chartdata = createchartdata( data , "recovered"  );
                    setData2(chartdata);  
                }else{
                    const chartdata = createchartdata1( data , "recovered"  );
                    setData2(chartdata); 
                } 
            })
        }
        getdata2();
    },[country]);

    return (
        <div>
        <div>
         {
             data?.length > 0 && (
             <div className="graph">
             <div className="heading">
                   <p className="headingp">Daily New Cases in {country}</p>
                   <p className="casesp">Cases per Day</p>
                </div>
                
                <Bar
                options={options} 
                data={{
                    datasets :[
                        {
                            backgroundColor: "rgba(15, 65, 15,0.4)",
                            borderColor: "rgb(6, 54, 6)",
                            data: data,
                        },
                    ],
                }}
                />
            </div>
             )
         }
         </div>
         <div>
         {
             data1?.length > 0 && (
             <div className="graph1">
                <div className="heading1">
                   <p className="headingp1">Daily Deaths in {country} </p>
                   <p className="casesp1">Deaths per Day</p>
                </div>
                
                <Bar
                options={options} 
                data={{
                    datasets :[
                        {
                            backgroundColor: "rgba(231, 48, 48,0.4)",
                            borderColor: "rgb(105, 9, 9)",
                            data: data1,
                        },
                    ],
                }}
                />
                
            </div>
             )
         }
         </div>
         <div>
         {
             data2?.length > 0 && (
             <div className="graph1">
                <div className="heading1">
                   <p className="headingp1">Daily Recovered Cases in {country} </p>
                   <p className="casesp1">Recovered Cases per Day</p>
                </div>
                
                <Bar
                options={options} 
                data={{
                    datasets :[
                        {
                            backgroundColor: "rgba(124, 122, 122,0.4)",
                            borderColor: "rgb(105, 9, 9)",
                            data: data2,
                        },
                    ],
                }}
                />
                
            </div>
             )
         }
         </div>
        </div>
    )
}

export default LineCharts;
