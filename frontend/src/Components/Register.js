import React from "react";
import '../Components/register.css';
import { useEffect } from "react";
import statescities from '../Components/statescities.json'
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Register(){

    let [city, setCity] = useState([]);
    let [loading, setLoading] = useState(false);
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
    }, [])

    let stateSelectFn = (e) => {

        let state = e.target.options[e.target.selectedIndex].value;
        for(let i = 0; i < statescities.length; i++){
            if(state === Object.keys(statescities[i])[0]){
                setCity(Object.values(statescities[i])[0]);
            }
        }

    }

    let sendDetails = async(e)=>{
        e.preventDefault();

        let data = {
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('genders').value,
            height: document.getElementById('feet').value+" feet "+document.getElementById('inches').value+" inches",
            weight: document.getElementById('weight').value+'kgs',
            activityType: document.getElementById('activity-types').value,
            phonenumber: document.getElementById('phone-number').value,
            state: document.getElementById('state').value,
            city: document.getElementById('cities').value



        }

        let response = await fetch('/api/register',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let json = await response.json();

        if(json.message === ''){
            window.location.href = json.toLink;
        }else{
            document.getElementById('error-msg').innerHTML = json.message;
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
        />:<div id = "register-form-container">
            <h3 style = {{textAlign: 'center'}}>SIGN UP</h3>
            <p  id = "error-msg" style = {{color: 'white'}}></p>
            <form action = "/api/register" method = "POST">
                <div id = "flnames">
                    <input type = "text" id = "fname" placeholder="First Name" name = "fname"/>
                    <input type = "text" id = "lname" placeholder="Last Name" name = "lname"/>
                </div>
                <input type = "email" id = "email" name = "email" placeholder="E-Mail"/>
                <input type = "password" id = "password" name = "password" placeholder="Password"/>
                <label for="dob" >Date Of Birth</label><br/>
                <input type = "date" id = "dob"/>
                <label htmlFor="genders" >Gender</label><br/>
                <select  name = "genders" id = "genders">
                    <option value = ""><i>--Select Gender--</i></option>
                    <option value = "male">Male</option>
                    <option value = "male">Female</option>
                    <option value = "male">Other</option>
                </select>
                <label htmlFor = "height">Height</label><br/>
                <div id = "height">
                    <input type = "text" id = "feet" placeholder="Feet" name = "feet"/>
                    <input type = "text" id = "inches" placeholder="Inches" name = "inches"/>
                </div>
                <input type = "text" id = "weight" placeholder="Weight(in Kg)" name = "weight"/>
                <label htmlFor="activity-types" >Activity Type</label><br/>
                <select  name = "activity-types" id = "activity-types">
                    <option value = ""><i>--Select Activity Type--</i></option>
                    <option value = "lightActivityType">Light Activity</option>
                    <option value = "moderateActivityType">Moderate Activity</option>
                    <option value = "proActivityType">Pro Activity</option>
                </select>
                <input type = "text" id = "phone-number" name = "phone-number" placeholder = "Phone Number"/>
                <label htmlFor = "state">Select State</label><br/>
                <select onChange={stateSelectFn}  name = "states" id = "state">
                    <option value = ""><i>--Select State--</i></option>
                    {
                        statescities.map((state_city) => {
                            return <option value = {Object.keys(state_city)}>{Object.keys(state_city)}</option>
                        })
                    }
                </select>
                <label htmlFor = "cities">Select City</label><br/>
                <select  name = "cities" id = "cities">
                    <option value = ""><i>--Select City--</i></option>
                    {
                        city.map((c) => {
                            return <option value = {c}>{c}</option>
                        })
                    }
                </select>
                <input onClick={sendDetails} type = "submit" id = "signUp-btn" value = "Sign Up"/>
                

            </form>
        </div>
        }
        </>
    );
}



export default Register;
