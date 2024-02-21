import React from "react";
import R_Sthetics_logo from '../static/R_Sthetics_logo_2.png';
import '../Components/navbar.css'
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



function Navbar(){

    let [personJson, setPersonJson] = useState(null)

    //const queryParameters = new URLSearchParams(window.location.search)

    useEffect(()=>{

    let fetchPerson = async()=>{
        let response = await fetch('https://api.rsthetics.com/api/getpersonlogin',{
            credentials: 'include',
        });
        let json = await response.json();

        if(response.ok){
            console.log(json.msg);
            if(json.id !== ''){
                console.log(json.id);
                setPersonJson(json.id);
            }
        }
    } 
    
    fetchPerson();

    //console.log(window.location.location)
   
    }, [])

    let logout = async(e)=>{
        let response = await fetch('https://api.rsthetics.com/api/logout',{
            credentials: 'include'
        });
        let json = await response.json();

        if(response.ok){
            window.location.href = json.toLink;
        }
    }

    return(
        <div id = "main-container-nav">
            <Link style = {{textDecoration: 'none'}} to="/"><div className="component" id = "navbar">
                <img id = "logo" width = "150"  src={R_Sthetics_logo}/>
                <h3 style = {{color: '#4fa87c', fontSize: '2.5em', marginLeft: '0.3em'}}>RS</h3>
                <h3 style = {{color: 'white', fontSize: '2.5em', marginLeft: '0.3em'}}> _thetics</h3>
            </div></Link>
            {
                    personJson !== null ?<div><div id = "person-id">
                                <div id = "logged-in-person" className="dropdown">
                                    <p className="dropbtn"  style={{color: 'white'}}> Hi! {personJson.fname} {personJson.lname}  &#8595;</p>
                                     <div className="dropdown-content">
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} to="/yourcourses">Your courses</Link>
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} to="/courses">Buy courses</Link>
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} onClick = {logout} to="#">Log out</Link>
                                    </div>
                                </div>
                            </div>
                            <div id = "person-id-mobile">
                                <div id = "logged-in-person-mobile" className="dropdown">
                                    <p className="dropbtn"  style={{color: 'white'}}>Hi! {personJson.fname}</p>
                                     <div className="dropdown-content">
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} to="/yourcourses">Your courses</Link>
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} to="/courses">Buy courses</Link>
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} onClick = {logout} to="#">Log out</Link>
                                    </div>
                                </div>
                            </div>
                        </div>: window.location.pathname !== '/login' && window.location.pathname !== '/signup'?<div><div id = "login-signup-btn-container">
                            <Link to = "/login"><button id = "login-btn">Login</button></Link>
                            <Link to = "/register"><button id = "signup-btn">Sign Up</button></Link>
                    </div>
                    <div id = "unlogged-in-person" className="dropdown">
                                    <p className="dropbtn"  style={{color: 'white', fontSize: '1.5em', marginTop: '0.4em'}}>&#9776;</p>
                                     <div className="dropdown-content">
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} to="/login">Login</Link>
                                        <Link style = {{paddingRight: '0em', paddingLeft: '0em'}} to="/register">Signup</Link>
                                    </div>
                                </div>
                    
                    </div>: <div id = "login-signup-btn-container">
                            </div>
            }
            
        </div>

    );

}

export default Navbar;