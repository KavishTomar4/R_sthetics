import React from "react";
import '../FirstPageComponents/transformationslide.css';
import transformation_1 from '../FirstPageComponents/transformation_1.jpg';
import transformation_2 from '../FirstPageComponents/transformation_2.jpg';
import transformation_3 from '../FirstPageComponents/transformation_3.jpg';
import left from '../FirstPageComponents/left.png'
import right from '../FirstPageComponents/right.png'
import { useEffect } from "react";
import {useState} from "react";



function Transformationslide(){

    let [leftSide, setLeft] = useState(37);
    
    let counter = -37;
    let limit = -1;
    let index = 0;
    useEffect(()=>{
        let leftSideClick = (e)=>{
          
          
                counter += 18.5;
                
          

          setLeft(counter);
           
              
        }

        let rightSideClick = (e)=>{
          
          
            counter -= 18.5;
            
      

            setLeft(counter);
       
          
        }


        
        setInterval(()=>{
           
            
          
           counter += 37;
            console.log(counter);

           if(counter > 37){
            counter = -37;
           }

           setLeft(counter);
           limit +=1;
           
           
        }, 2000);
        
    
        
        document.getElementById("leftBtn").addEventListener('click', leftSideClick);
        document.getElementById("rightBtn").addEventListener('click', rightSideClick);
        
    }, [])
  

    return(
        <div id = "transformation-slide-container">
            <h3 style = {{marginLeft: '2.5em',marginTop: '0em', paddingTop: '1em'}}>TRANSFORMATIONS</h3>
            <div id = "slider-container">
            <img src = {left} width = "50" height = "50" id = "leftBtn" />
                <div id = "transformation-slide-images">
               
                    <div style = {{left: leftSide.toString() + 'em' }} className = "transformation-img">
                        <img width = "599" height = "660" src = {transformation_1}/>
                    </div>
                    <div  style = {{left: leftSide.toString() + 'em'}} className = "transformation-img">
                        <img width = "599" height = "660" src = {transformation_2}/>
                    </div>
                    <div style = {{left: leftSide.toString() + 'em'}}  className = "transformation-img">
                        <img width = "599" height = "660" src = {transformation_3}/>
                    </div>
                    
                </div>
            <img src = {right} width = "50" height = "50" id = "rightBtn" />
               
                    
              
               
               
            </div>
        </div>
    );

}

export default Transformationslide;