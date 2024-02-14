import React from 'react';
import IntroBanner from './FirstPageComponents/IntroBanner';
import Transformationslide from './FirstPageComponents/Transformationslide';
import About from './FirstPageComponents/About';
import Commentsection from './FirstPageComponents/Commentsection';
import { useState, useEffect, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import '../Components/firstpage.css';

function Firstpage(){

let [loading, setLoading] = useState(false);
let override = {
  display: "block",
  margin: "10rem 45rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

let override_mobile = {
  display: "block",
  margin: "5rem 5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"

}

let [mql, setMql] = useState(window.matchMedia("(max-width: 765px)"));
  useEffect(()=>{
    setLoading(true);
    
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
  }, [])

    return(
        <>
            {
                loading === true?mql != true ?
                <ClipLoader
                    color="#438c68"
                    loading={loading}
                    size={50}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />: <ClipLoader
                color="#438c68"
                loading={loading}
                size={50}
                cssOverride={override_mobile}
                aria-label="Loading Spinner"
                data-testid="loader"
            />:<div className='firstPageContent'>
                <IntroBanner/>
                <Transformationslide/>
                <About/>
                <Commentsection/>
            </div>
        }
        </>
    );

}

export default Firstpage;