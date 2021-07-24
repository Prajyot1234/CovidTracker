import React from 'react';
import "./Activecases.css";
import numeral from "numeral";

function Activecases({activecases}) {
    return (
        <div className="Activecases">
            <table border="1" className="table">
                <tr className="noBorder1">
                    <td>Active Cases</td>
                </tr>
                <hr />
                <tr className="noBorder">
                    <td className="heading11">{numeral(activecases.active).format("0,0")}</td>
                </tr>
                <tr className="noBorder">
                    <td className="margin">Currently Infected Patients</td>
                </tr>
                <tr className="noborder">
                    <div className="flex">
                        <div className="padding">
                            <p className="para11">{numeral(activecases.active-activecases.critical).format("0,0")}({Math.trunc((activecases.active-activecases.critical)/activecases.active*100)}%)</p>
                            <p>in Mild Condition</p>
                        </div>
                        <div className="padding">
                            <p className="para22">{numeral(activecases.critical).format("0,0")}({Math.ceil((activecases.critical/activecases.active)*100)}%)</p>
                            <p>Serious or Critical</p>
                        </div>
                    </div>
                </tr>
            </table>
        </div>
    )
}

export default Activecases;
