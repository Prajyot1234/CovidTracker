import React, { useState , useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./VaccineInfo.css"

function VaccineInfo() {

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "black" ,padding:"10px",borderRadius:"20px",marginRight:"25px" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" ,padding:"10px",borderRadius:"20px",marginLeft:"25px" }}
            onClick={onClick}
          />
        );
      }
   
    const [vaccineinfo,setVaccineinfo] = useState([]);
    const vaccineinfo1 = (data,index)=>{
        return(
            <div className="container" key={index}>
                 <p className="index">{index+1}</p>
                 <p className="candidate">{data.candidate}</p>
                 <p className="phase">{data.trialPhase}</p>
                 <p className="details">{data.details}</p>
            </div>
        )
    }
    useEffect(()=>{
        const getdata =async()=>{
            await fetch("https://disease.sh/v3/covid-19/vaccine")
            .then(Response => Response.json())
            .then((data)=>{
                const data1 = data.data;
                console.log(data1);
                setVaccineinfo(data1);
            })
        }
        getdata();
    },[]);

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

    return (
        <div className="main">
           <Slider className="slider" {...settings}>
                {
                    vaccineinfo.map(vaccineinfo1)
                }
           </Slider>
        </div>
    )
}

export default VaccineInfo;
