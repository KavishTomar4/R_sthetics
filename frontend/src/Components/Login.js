import React, { useEffect } from "react";
import '../Components/login.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Login(){

    let [loading, setLoading] = useState(false);
    let [err, setErr] = useState('');
    let override = {
        display: "block",
        margin: "10em 45em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };


    useEffect(()=>{
        
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
        
        let fetchData = async()=>{
            let response = await fetch('https://r-sthetics.onrender.com/api/login');
            let json = await response.json();

            if(json.toLink !== ''){
                window.location.href = json.toLink;
            }

           
            
        }

        fetchData();
       


    }, []);

    let postlogin = async(e)=>{
        e.preventDefault();

        let email = document.getElementById('email').value;
        

        let password = document.getElementById('password').value
       
        let loginData = {
            email: email,
            password: password
        }

        let response = await fetch('https://r-sthetics.onrender.com/api/login',{
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let json = await response.json();

        if(json.toLink !== ''){
            window.location.href = json.toLink;
        }else{
            if(json.err !== ''){
                document.getElementById("error").innerHTML = json.err;
            }
        }

    }

   

   

    return(
      <>
        {
        loading === true?<ClipLoader
        color="#438c68"
        loading={loading}
        size={50}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
    />:
        <div id = "login-form">
            <h3>LOGIN</h3>
            <p id = "error"></p>
            <form action = "/api/login" method = "POST">
                <input type = "email" placeholder="E-Mail" id = "email" name = "email"/>
                <input type = "password" placeholder="Password" id = "password" name = "password"/>
                <input type = "submit" id = "login-btn" onClick = {postlogin} value = "LOGIN"/>
            </form>
            <p style = {{color: "white"}}>Or, Click here to <Link style = {{color: "#4fa87c"}}to = "/register"> Sign Up</Link></p>
        </div>
        }
    </>
    );

}

export default Login;