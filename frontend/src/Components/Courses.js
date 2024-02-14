import React, { useEffect, useState } from "react";
import '../Components/courses.css';
import arrow from '../Components/arrow.png';
import biceps from '../Components/biceps.png';
import dumbell from '../Components/dumbell.png';
import fat_person from '../Components/fat_person.png';
import heart from '../Components/heart.png';
import running from '../Components/running.png';
import transition from '../Components/transition.png';
import upperMuscularBody from '../Components/upperMuscularBody.png';
import bodyBuilding from '../Components/BodyBuilding.png';
import { Link, useHistory } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import ClipLoader from "react-spinners/ClipLoader";


function Courses(){

    //strengthBtn = {background: 'linear-gradient(to bottom right, #228044, #37de74)', borderRadius: '1em'}
    const history = useHistory();
    let [mql, setMql] = useState(window.matchMedia("(max-width: 765px)"));
    let [loading, setLoading] = useState(false);
    let override = {
        display: "block",
        margin: "10em 45em",
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

    useEffect(()=>{

        setLoading(true);
       
        let fetchLogin = async()=>{
            let response = await fetch('https://api.rsthetics.com/api/getlogininfo',{
                credentials: 'include'
            });
            let json = await response.json();

            if(response.ok){
                if(json.toLink === '/login'){
                    
                    history.replace('/courses')
                    history.push('/login')
                }
            }
        }

        fetchLogin();
       
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    let [shouldGreenHover, setShouldGreenHover] = useState(false)
    let [shouldRedHover, setShouldRedHover] = useState(false)
    let [shouldWeightHover, setShouldWeightHover] = useState(false)
    let [shouldBlueHover, setShouldBlueHover] = useState(false)
    let [shouldPurpleHover, setShouldPurpleHover] = useState(false)
    let [shouldGoldeneHover, setShouldGoldeneHover] = useState(false)
    
    let hoverGreenOn = ()=>{
        setShouldGreenHover(true);
    }
    let hoverGreenOff = ()=>{
        setShouldGreenHover(false);
    }

    let hoverRedOn = ()=>{
        setShouldRedHover(true);
    }
    let hoverRedOff = ()=>{
        setShouldRedHover(false);
    }

    let hoverMustardOn = ()=>{
        setShouldWeightHover(true);
    }
    let hoverMustardOff = ()=>{
        setShouldWeightHover(false);
    }

    let hoverBlueOn = ()=>{
        setShouldBlueHover(true);
    }
    let hoverBlueOff = ()=>{
        setShouldBlueHover(false);
    }
    
    let hoverPurpleOn = ()=>{
        setShouldPurpleHover(true);
    }
    let hoverPurpleOff = ()=>{
        setShouldPurpleHover(false);
    }

    let hoverGoldenOn = ()=>{
        setShouldGoldeneHover(true)
    }
    let hoverGoldenOff = ()=>{
        setShouldGoldeneHover(false)
    }

    

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
    />:<div id = "course-container">
            <h1>COURSES</h1>
            <div id = "row-one">
                <Link style = {{textDecoration: 'none'}} to = "/price/strength-training-course"><div style = {{background: shouldGreenHover ? '#37de74':'linear-gradient(to bottom right, #228044, #37de74)', borderRadius: '1em'}} onMouseEnter={hoverGreenOn} onMouseLeave = {hoverGreenOff} id = "strength-training-course">
                    <h3 style={{marginRight: '1em', marginTop: '1.5em', marginBottom: '1.5em'}}>Strength Training</h3>
                    <img className = "icon" src = {dumbell} width = "100" />
                </div></Link>
                <Link style = {{textDecoration: 'none'}} to = "/price/fat-loss-course"><div style = {{background: shouldRedHover ? '#eb3636':'linear-gradient(to bottom right, #821f1f, #eb3636)', borderRadius: '1em'}} onMouseEnter={hoverRedOn} onMouseLeave = {hoverRedOff} id = "fat-loss-course">
                    <h3 style={{marginRight: '1em', marginTop: '1.5em', marginBottom: '1.5em'}}>Fat Loss</h3>
                    <img className = "icon" src = {transition} width = "230" />
                </div></Link>
            </div>
            <div id = "row-two">
            <Link style = {{textDecoration: 'none'}} to = "/price/weight-gain-course"><div style = {{background: shouldWeightHover ? '#fcb930':'linear-gradient(to bottom right, #85621c, #fcb930)', borderRadius: '1em'}} onMouseEnter={hoverMustardOn} onMouseLeave = {hoverMustardOff} id = "weight-gain-course">
                    <h3 style={{marginRight: '3.4em', marginTop: '1.5em', marginBottom: '1.5em'}}>Weight Gain</h3>
                    <img className = "icon" src = {biceps} width = "100" />
                </div></Link>
            <Link style = {{textDecoration: 'none'}} to = "/price/endurance-course"><div style = {{background: shouldBlueHover ? '#3192d6':'linear-gradient(to bottom right, #194c70, #3192d6)', borderRadius: '1em'}} onMouseEnter={hoverBlueOn} onMouseLeave = {hoverBlueOff} id = "endurance-course">
                    <h3 style={{marginRight: '3.4em', marginTop: '1.5em', marginBottom: '1.5em'}}>Endurance</h3>
                    <img className = "icon" src = {running} width = "100" />
                </div></Link>
            </div>
            <div id = "row-three">
            <Link style = {{textDecoration: 'none'}} to = "/price/fat-loss-muscle-gain-course"><div style = {{background: shouldPurpleHover ? '#9c42e3': 'linear-gradient(to bottom right, #56257d, #9c42e3)', borderRadius: '1em'}} onMouseEnter={hoverPurpleOn} onMouseLeave = {hoverPurpleOff} id = "fat-loss-muscle-gain-course">
                    <h3 style={{marginRight: '1.4em', marginTop: '0.8em', marginBottom: '0.8em'}}>Fat Loss + Muscle Gain</h3>
                    <img className = "icon" src = {upperMuscularBody} width = "100" />
                </div></Link>
                <Link style = {{textDecoration: 'none'}} to = "/price/prep-course"><div style = {{background: shouldGoldeneHover ? '#d9d43f': 'linear-gradient(to bottom right, #827f26, #d9d43f)', borderRadius: '1em'}} onMouseEnter={hoverGoldenOn} onMouseLeave = {hoverGoldenOff} id = "prep-course">
                    <h3 style={{marginRight: '3.4em', marginTop: '1.4em', marginBottom: '1.4em'}}>Body Building / Prep Coaching</h3>
                    <img className = "icon" src = {bodyBuilding} width = "100" />
                </div></Link>
            </div>
        </div>
        }
        </>
    );

}

export default Courses;