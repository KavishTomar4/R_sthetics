import React from "react";
import '../Components/register.css';
import { useEffect } from "react";
import statescities from '../Components/statescities.json'
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";

function Register(){

    let history = useHistory();
    let [city, setCity] = useState([]);
    let [loading, setLoading] = useState(false);
    let [formError, setFormError] = useState(false);
    let [emailError, setEmailError] = useState(false);
    let [passwordError, setPasswordError] = useState(false);
    let [feetError, setFeetError] = useState(false);
    let [inchesError, setInchesError] = useState(false);
    let [weightError, setWeightError] = useState(false);
    let [phoneError, setPhoneError] = useState(false);
    
    let override = {
        display: "block",
        margin: "10em 45em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
    let override_mobile = {
        display: "block",
        margin: "10rem 10rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      
      }
      let [mql, setMql] = useState(window.matchMedia("(max-width: 765px)"));

    useEffect(()=>{
        setLoading(true);
        setMql(window.matchMedia("(max-width: 765px)").matches);
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
        let data;
        let tags = ['fname', 'lname', 'email', 'password', 'dob', 'genders', 'feet', 'inches', 'weight',
                    'activity-types', 'phone-number', 'state', 'cities']
       
        
        
        if(!formError && !emailError && !passwordError && !weightError && !phoneError && !feetError && !inchesError && !errorCheckOnSubmit()){
            data = {
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

        let response = await fetch('https://api.rsthetics.com/api/register',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        let json = await response.json();

        if(json.message === ''){
            history.replace(window.location.href)
            history.push(json.toLink)
        }else{
            document.getElementById('error-msg').innerHTML = json.message;
        }
    }

       

    }

    let validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
    
    let validatePhone = (text)=>{
            var regx = /^[6-9]\d{9}$/ ;
            if(regx.test(text)){
                return true;
            }
            else{
                return false;
            }
        }
    
    let errorCheckOnSubmit = ()=>{

        let tags = ['fname', 'lname', 'email', 'password', 'dob', 'genders', 'feet', 'inches', 'weight',
                    'activity-types', 'phone-number', 'state', 'cities']
        
        let fname = document.getElementById(tags[0]).value;
        let lname = document.getElementById(tags[1]).value;
        let email = document.getElementById(tags[2]).value;
        let password = document.getElementById(tags[3]).value;
        let dob = document.getElementById(tags[4]).value;
        let genders = document.getElementById(tags[5]).value;
        let feet = document.getElementById(tags[6]).value;
        let inches = document.getElementById(tags[7]).value;
        let weight = document.getElementById(tags[8]).value;
        let activityTypes = document.getElementById(tags[9]).value;
        let phone = document.getElementById(tags[10]).value;
        let state = document.getElementById(tags[11]).value;
        let cities = document.getElementById(tags[12]).value;


        if(fname === "" || lname === "" || email === "" || password === "" || dob === "" || genders === ""
        || feet === "" || inches === "" || weight === "" || activityTypes === "" || phone === "" || state === ""
        || cities === ""){

            for(let i = 0; i < tags.length; i++){
                document.getElementById(tags[i]).style.border = "1px solid red";
            }
            
            return true;
            
            

        }else{

            for(let i = 0; i < tags.length; i++){
                document.getElementById(tags[i]).style.borderTop = "2px solid #1f1e1e";
                document.getElementById(tags[i]).style.borderLeft = "2px solid #1f1e1e";
                document.getElementById(tags[i]).style.borderRight = "2px solid #1f1e1e";
                document.getElementById(tags[i]).style.borderBottom = "2px solid #8c8c8c";
                document.getElementById(tags[i]).style.background = "#2e2d2d";
            }
           
            return false;

            

            

        }

        

    }
    
    let errorCheck = (e)=>{

       
        if(e.target.value === ""){
            e.target.style.border = "1px solid red";
            setFormError(true);
            if(e.target.id === "fname"){
                document.getElementById("fname-error").innerHTML = "Please enter your first name";
            }else if(e.target.id === "lname"){
                document.getElementById("lname-error").innerHTML = "Please enter your last name";
            }else if(e.target.id === "email"){
                document.getElementById("email-error").innerHTML = "Please enter your E-Mail";
            }else if(e.target.id === "password"){
                document.getElementById("password-error").innerHTML = "Please enter your Password";
            }else if(e.target.id === "dob"){
                document.getElementById("dob-error").innerHTML = "Please enter your Date Of Birth";
            }else if(e.target.id === "genders"){
                document.getElementById("gender-error").innerHTML = "Please Select your Gender";
            }else if(e.target.id === "feet"){
                document.getElementById("feet-error").innerHTML = "Please enter your Height in feet";
            }else if(e.target.id === "inches"){
                document.getElementById("inches-error").innerHTML = "Please enter your Height in inches";
            }else if(e.target.id === "weight"){
                document.getElementById("weight-error").innerHTML = "Please enter your weight";
            }else if(e.target.id === "activity-types"){
                document.getElementById("activity-types-error").innerHTML = "Please Select your height";
            }else if(e.target.id === "phone-number"){
                document.getElementById("phone-number-error").innerHTML = "Please enter your phone number";
            }else if(e.target.id === "state"){
                document.getElementById("state-error").innerHTML = "Please select your state";
            }else if(e.target.id === "cities"){
                document.getElementById("cities-error").innerHTML = "Please select your city";
            }

        }else{
            e.target.style.borderTop = "2px solid #1f1e1e";
            e.target.style.borderLeft = "2px solid #1f1e1e";
            e.target.style.borderRight = "2px solid #1f1e1e";
            e.target.style.borderBottom = "2px solid #8c8c8c";
            e.target.style.background = "#2e2d2d";
            setFormError(false);

            if(e.target.id === "fname"){
                document.getElementById("fname-error").innerHTML = "";
            }else if(e.target.id === "lname"){
                document.getElementById("lname-error").innerHTML = "";
            }else if(e.target.id === "email"){
                document.getElementById("email-error").innerHTML = "";
            }else if(e.target.id === "password"){
                document.getElementById("password-error").innerHTML = "";
            }else if(e.target.id === "dob"){
                document.getElementById("dob-error").innerHTML = "";
            }else if(e.target.id === "genders"){
                document.getElementById("gender-error").innerHTML = "";
            }else if(e.target.id === "feet"){
                document.getElementById("feet-error").innerHTML = "";
            }else if(e.target.id === "inches"){
                document.getElementById("inches-error").innerHTML = "";
            }else if(e.target.id === "weight"){
                document.getElementById("weight-error").innerHTML = "";
            }else if(e.target.id === "activity-types"){
                document.getElementById("activity-types-error").innerHTML = "";
            }else if(e.target.id === "phone-number"){
                document.getElementById("phone-number-error").innerHTML = "";
            }else if(e.target.id === "state"){
                document.getElementById("state-error").innerHTML = "";
            }else if(e.target.id === "cities"){
                document.getElementById("cities-error").innerHTML = "";
            }

        }

        if(e.target.id === "email"){

            if(!validateEmail(e.target.value)){
                setEmailError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("email-error").innerHTML = "Invalid E-Mail";
            }else{
                setEmailError(false);
                e.target.style.borderTop = "2px solid #1f1e1e";
                e.target.style.borderLeft = "2px solid #1f1e1e";
                e.target.style.borderRight = "2px solid #1f1e1e";
                e.target.style.borderBottom = "2px solid #8c8c8c";
                e.target.style.background = "#2e2d2d";
                document.getElementById("email-error").innerHTML = "";
                
            }
        }

        if(e.target.id === "password"){

            let uppercaseRegex = /[A-Z]/g;
            let lowercaseRegex = /[a-z]/g; 
            if(!e.target.value.match(uppercaseRegex)){
                setPasswordError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("password-error").innerHTML = "Must contain at least one number and one uppercase letter";
            }else if(!e.target.value.match(lowercaseRegex)){
                setPasswordError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("password-error").innerHTML = "Must contain at least one lowercase letter";
            }else{
                setPasswordError(false);
                e.target.style.borderTop = "2px solid #1f1e1e";
                e.target.style.borderLeft = "2px solid #1f1e1e";
                e.target.style.borderRight = "2px solid #1f1e1e";
                e.target.style.borderBottom = "2px solid #8c8c8c";
                e.target.style.background = "#2e2d2d";
                document.getElementById("password-error").innerHTML = "";
                
            }

            
           
        }
        if(e.target.id === "feet"){
            let isNumber = true;
            let value = Number(e.target.value);
            if(Math.floor(value) === value){
                isNumber = true
            }else{
                isNumber = false
            }
            if(e.target.value > 10 || e.target.value < 0 || e.target.value === "" || !isNumber){
                setFeetError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("feet-error").innerHTML = "Invalid value";
            }else{
                setFeetError(false);
                e.target.style.borderTop = "2px solid #1f1e1e";
                e.target.style.borderLeft = "2px solid #1f1e1e";
                e.target.style.borderRight = "2px solid #1f1e1e";
                e.target.style.borderBottom = "2px solid #8c8c8c";
                e.target.style.background = "#2e2d2d";
                document.getElementById("feet-error").innerHTML = "";
                
            }
        }

        if(e.target.id === "inches"){
            let isNumber = true;
            let value = Number(e.target.value);
            if(Math.floor(value) === value){
                isNumber = true
            }else{
                isNumber = false
            }
            if(e.target.value > 11 || e.target.value < 0 || e.target.value === "" || !isNumber){
               setInchesError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("inches-error").innerHTML = "Invalid value";
            }else{
                setInchesError(false);
                e.target.style.borderTop = "2px solid #1f1e1e";
                e.target.style.borderLeft = "2px solid #1f1e1e";
                e.target.style.borderRight = "2px solid #1f1e1e";
                e.target.style.borderBottom = "2px solid #8c8c8c";
                e.target.style.background = "#2e2d2d";
                document.getElementById("inches-error").innerHTML = "";
                
            }
        }

        
        if(e.target.id === "phone-number"){
            
            if(!validatePhone(e.target.value)){
                setPhoneError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("phone-number-error").innerHTML = "Invalid number";
            }else{
                setPhoneError(false);
                e.target.style.borderTop = "2px solid #1f1e1e";
                e.target.style.borderLeft = "2px solid #1f1e1e";
                e.target.style.borderRight = "2px solid #1f1e1e";
                e.target.style.borderBottom = "2px solid #8c8c8c";
                e.target.style.background = "#2e2d2d";
                document.getElementById("phone-number-error").innerHTML = "";
                
            }
        }

        if(e.target.id === "weight"){
            let isNumber = true;
            let value = Number(e.target.value);
            if(Math.floor(value) === value){
                isNumber = true
            }else{
                isNumber = false
            }
            if(e.target.value > 500 || e.target.value === "" || !isNumber){
                setWeightError(true);
                e.target.style.border = "1px solid red";
                document.getElementById("weight-error").innerHTML = "Invalid weight";
            }else{
                setWeightError(false);
                e.target.style.borderTop = "2px solid #1f1e1e";
                e.target.style.borderLeft = "2px solid #1f1e1e";
                e.target.style.borderRight = "2px solid #1f1e1e";
                e.target.style.borderBottom = "2px solid #8c8c8c";
                e.target.style.background = "#2e2d2d";
                document.getElementById("weight-error").innerHTML = "";
                
            }
        }


    }

    return(
        <>
        {
        loading === true?mql!= true ?<ClipLoader
        color="#438c68"
        loading={loading}
        size={50}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
        />:<ClipLoader
        color="#438c68"
        loading={loading}
        size={50}
        cssOverride={override_mobile}
        aria-label="Loading Spinner"
        data-testid="loader"
    />:<div id = "register-form-container">
            <h3 style = {{textAlign: 'center'}}>SIGN UP</h3>
            <p  id = "error-msg" style = {{color: 'white', textAlign:'center'}}></p>
            <form action = "https://api.rsthetics.com/api/register" method = "POST">
                <div id = "flnames">
                    
                    <div id = "fname-container">
                    <input type = "text" id = "fname" placeholder="First Name" name = "fname" onBlur={errorCheck}/>
                    <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "fname-error"></p>
                    </div>
                    <div id = "lname-container">
                    <input type = "text" id = "lname" placeholder="Last Name" name = "lname" onBlur={errorCheck}/>
                    <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "lname-error"></p>
                    </div>
                    
                    
                </div>
                <input type = "email" id = "email" name = "email" placeholder="E-Mail" onBlur = {errorCheck}/>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "email-error"></p>
                <input type = "password" id = "password" name = "password" placeholder="Password" onBlur = {errorCheck}/>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "password-error"></p>
                <label for="dob" >Date Of Birth</label><br/>
                <input type = "date" id = "dob" onBlur = {errorCheck}/>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "dob-error"></p>
                <label htmlFor="genders" >Gender</label><br/>
                <select  name = "genders" id = "genders" onBlur = {errorCheck}>
                    <option value = ""><i>--Select Gender--</i></option>
                    <option value = "male">Male</option>
                    <option value = "male">Female</option>
                    <option value = "male">Other</option>
                </select>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "gender-error"></p>
                <label htmlFor = "height">Height</label><br/>
                <div id = "height">
                    <div id = "feet-container" style = {{}}>
                    <input type = "text" id = "feet" placeholder="Feet" name = "feet" onBlur={errorCheck}/>
                    <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "feet-error"></p>
                    </div>
                    <div id = "inch-container" style = {{}}>
                    <input type = "text" id = "inches" placeholder="Inches" name = "inches" onBlur={errorCheck}/>
                    <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "inches-error"></p>
                    </div>
                </div>
                <input type = "text" id = "weight" placeholder="Weight(in Kg)" name = "weight" onBlur={errorCheck}/>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "weight-error"></p>
                <label htmlFor="activity-types" >Activity Type</label><br/>
                <select  name = "activity-types" id = "activity-types" onBlur={errorCheck}>
                    <option value = ""><i>--Select Activity Type--</i></option>
                    <option value = "lightActivityType">Light Activity</option>
                    <option value = "moderateActivityType">Moderate Activity</option>
                    <option value = "proActivityType">Pro Activity</option>
                </select>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "activity-types-error"></p>
                <input type = "text" id = "phone-number" name = "phone-number" placeholder = "Phone Number" onBlur={errorCheck}/>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "phone-number-error"></p>
                <label htmlFor = "state">Select State</label><br/>
                <select onChange={stateSelectFn}  name = "states" id = "state" onBlur={errorCheck}>
                    <option value = ""><i>--Select State--</i></option>
                    {
                        statescities.map((state_city) => {
                            return <option value = {Object.keys(state_city)}>{Object.keys(state_city)}</option>
                        })
                    }
                </select>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "state-error"></p>
                <label htmlFor = "cities">Select City</label><br/>
                <select  name = "cities" id = "cities" onBlur = {errorCheck}>
                    <option value = ""><i>--Select City--</i></option>
                    {
                        city.map((c) => {
                            return <option value = {c}>{c}</option>
                        })
                    }
                </select>
                <p style = {{color: 'red', fontSize: '0.8rem', marginTop: '0.1rem'}} id = "cities-error"></p>
                <input onClick={sendDetails} type = "submit" id = "signUp-btn" value = "Sign Up" required = {true}/>
                

            </form>
        </div>
        }
        </>
    );
}



export default Register;
