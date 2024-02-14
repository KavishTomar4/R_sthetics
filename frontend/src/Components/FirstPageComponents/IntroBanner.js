import React, { useEffect, useState } from "react";
import '../FirstPageComponents/Introbanner.css'
import image_1 from '../FirstPageComponents/image_1.jpg';
import image_2 from '../FirstPageComponents/image_2.jpg';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import transformation_1 from '../FirstPageComponents/transformation_1.jpg';
import transformation_2 from '../FirstPageComponents/transformation_2.jpg';
import transformation_3 from '../FirstPageComponents/transformation_3.jpg';
import loading_btn from '../../static/loading_btn.gif';

function IntroBanner(){

    let [hover, shouldHover] = useState(false);
    let [slideIndex, setSlideIndex] = useState(1);

    

    useEffect(()=>{

      
    },[]);  

    
    let buffer = ()=>{
        document.getElementById('enroll-btn').innerHTML = `<img width = 5 src=${loading_btn}/>`
    }
    

    

    return(
        <div id = "introBanner" className ="firstPageComponent">
           
           <div id = "left-right-container"> 
                <div id = "leftSide">
                    <h3>HELPS TO ACHIEVE <br/>YOUR IDEAL BODY GOALS</h3>
                    <h4>Want your body to be healthy? <br/> Join our program with direction according to your body's goal</h4>
                    <Link to = "/courses"><button onClick= {buffer} id = "enroll-btn">ENROLL NOW </button></Link>
                </div>
                <div id = "rightSide">
                    <div className="imageFrame">
                        <div className="imageSlider">
                            <div className = "imgContainer">
                                <img id = "trainer-img-1" className = "trainerImage" src = {image_1} width = "280"/>
                            </div>
                            <div className = "imgContainer">
                                <img id = "trainer-img-2" className = "trainerImage" src = {image_2} width = "280"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id = "transformation-container">
                {/* <button style = {{background: '#1f1e1e', color: 'white', height: '10em', marginTop: '5em'}} className="w3-button w3-display-left" onClick={plusDivs(-1)}>&#10094;</button>
                <img   width = "400" height = "290" src = {transformation_1} id = "transformation-one" className = "transformation-img"/>
                <img   width = "400" height = "290" src = {transformation_2} id = "transformation-two" className = "transformation-img"/>
                <img   width = "400" height = "290" src = {transformation_3} id = "transformation-three" className = "transformation-img"/>
                <button style = {{background: '#1f1e1e', color: 'white', height: '10em', marginTop: '5em'}} className="w3-button w3-display-right" onClick={plusDivs(+1)}>&#10095;</button> */}
            </div>
        </div>
    );
}

export default IntroBanner;