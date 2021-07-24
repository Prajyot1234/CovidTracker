import React from 'react';
import "./Table.css";

function Table({countries}) {
    // const getcountrydata = async(e)=>{
    //     const getcountryName = e.value;
    //     console.log("countryName",getcountryName);
    // }

    const formatter1 = new Intl.NumberFormat("en") ;
    const getcontriesdata =(data,index)=>{
        return( 
          <tr key={index}>
             <td>{data.country}</td>
             <td>{formatter1.format(data.cases)}</td>
             <td>{formatter1.format(data.deaths)}</td>
             <td>{formatter1.format(data.recovered)}</td>
             <td>{formatter1.format(data.active)}</td>
          </tr>
        )
    };
    
    return (
        <div className="table_data">
           <table>
               <tr>
                   <th>Country</th>
                   <th>Total-Cases</th>
                   <th>Total-Deaths</th>
                   <th>Total-Recovered</th>
                   <th>Active-Cases</th>
               </tr>
               <tbody>
                  {
                      countries.map(getcontriesdata)
                  }
               </tbody>
           </table>
        </div>
    )
}

export default Table;
