import React from "react";
import '../FirstPageComponents/transformationslide.css';
import transformation_1 from '../FirstPageComponents/transformation_1.jpg';
import transformation_2 from '../FirstPageComponents/transformation_2.jpg';
import transformation_3 from '../FirstPageComponents/transformation_3.jpg';
import left from '../FirstPageComponents/left.png'
import right from '../FirstPageComponents/right.png'
import { useEffect } from "react";
import {useState} from "react";
import SimpleImageSlider from "react-simple-image-slider";




function Transformationslide(){

    let [images, setImages] = useState([
        {url: transformation_1},
        {url: transformation_2},
        {url: transformation_3}
    ]);
    let [mql, setMql] = useState(false);
    useEffect(()=>{

        setMql(window.matchMedia("(max-width: 765px)").matches);

    });

    //let [sliderId, setSliderId] = useState("image-slider")
    return(
        <div id = "transformation-slide-container">
        <h3 id = "transformation-title">TRANSFORMATIONS</h3>
        <div id = "image-slider-container">
            <div id = "image-slider">
                
                {
                     mql === true ? <SimpleImageSlider
                    width={299}
                    height= {410}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    autoPlay={true}
                /> : <SimpleImageSlider
                width={599}
                height= {699}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
            />
                }
            </div>
        </div>
        </div>
    );

}

export default Transformationslide;