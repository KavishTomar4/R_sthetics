import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import '../Components/price.css';
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import fire from "../Components/fireEmoji.gif";


function Price(){
    let {courseName} = useParams()

    let [hours, setHours] = useState(0);

    let [min, setMin] = useState(0);

    let [sec, setSec] = useState(0);

    let [displayHours, setDipsplayHours] = useState(0);
    let [displayMin, setDipsplayMin] = useState(0);
    let [displaySec, setDipsplaySec] = useState(0);

    let [loading, setLoading] = useState(true);
    let override = {
        display: "block",
        margin: "10em 45em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
    let history = useHistory();
    //let [duration, setDuration] = useState('')

    useEffect(()=>{
        let fetchLogin = async()=>{
            let response = await fetch('https://r-sthetics-api.vercel.app/api/getlogininfo');
            let json = await response.json();

            if(response.ok){
                if(json.toLink === '/login'){
                    history.replace(window.location.href)
                    history.push(json.toLink)
                }
            }
        }
        
        let fetchData = async()=>{
            let response = await fetch('https://r-sthetics-api.vercel.app/api/prices');
            let json = await response.json();

            if(json.toLink !== ''){
                history.replace(window.location.href)
                history.push(json.toLink)
            }
            let d = new Date(Date.now() - json.reff);
            let h = (Date.now() - json.reff)/(1000*60*60);
            let m = (Date.now() - json.reff)/(1000*60);
            let s = (Date.now() - json.reff)/(1000)
           setHours(h);

           setDipsplayHours(d.getHours());
           setDipsplayMin(d.getMinutes());
           setDipsplaySec(d.getSeconds());
           
            
        }

        fetchLogin();
        fetchData();


    }, [hours])

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },1500);
    })

    let handleOpenRazorpay = (data, a, d)=>{
        let options = {
            key: "rzp_test_dFHjvTxi5ZpZkE",
            amount: Number(data.amount),
            currency: data.currency,
            name: document.getElementById("price-heading").innerHTML+"("+d+")",
            description: document.getElementById("price-heading").innerHTML,
            order_id: data.id,
            handler: async function(response){
                console.log(response, "34")
                let rsp = await fetch("https://r-sthetics-api.vercel.app/api/verify",  {
                    method: 'POST',
                    body: JSON.stringify({response: response, activity: a, duration: d}),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })

                let json = await rsp.json()
                if(rsp.ok){
                    if(json.toLink !== ''){
                        history.replace(window.location.href)
                        history.push(json.toLink)
                    }
                }
            }	
            
        }
        let rzp = new window.Razorpay(options)
        rzp.open();
    }
    
    let handlePayment = async(amount, activity,duration)=>{

        let canbuy = true;
         let resp = await fetch('https://r-sthetics-api.vercel.app/api/getlogininfo');
         let json = await resp.json();

            
        if(json.toLink === 'https://r-sthetics-api.vercel.app/login'){
            history.replace(window.location.href)
            history.push(json.toLink)
        }else{

            let resp1 = await fetch('https://r-sthetics-api.vercel.app/api/getpersonlogin');
            let js = await resp1.json();

            for(let i = 0; i < js.id.courses.length; i++){
                if(js.id.courses[i].course === activity && js.id.courses[i].duration === duration){
                    canbuy = false;
                }
            }

            if(canbuy){
                let postedData = {
                    amount: amount,
                }

                let response = await fetch("https://r-sthetics-api.vercel.app/api/orders", {
                    method: 'POST',
                    body: JSON.stringify(postedData),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
    
                let data = await response.json();
        
                //console.log(data.data)
                //console.log(data.message)
                if(response.ok){
                    handleOpenRazorpay(data.data, activity, duration)
                }

            }else if(!canbuy){
                alert('This course is already bought by you.');
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
        />
        :<div id = "price-container">
            
            {   hours < 24 && courseName !== 'prep-course'?
                    <div id = "time-container" style = {{textAlign: 'center'}}>
                        <img className = "emojiFire" src = {fire} width = "70" height = "50"/>
                        <div>
                            <h3 style = {{paddingRight: '0.3em', marginBottom: '0em'}}>Hurry up!</h3>
                            <p style = {{marginTop: '0.5em', fontSize: '1.2em'}}>Sale ends in:</p>
                            <h1 style = {{fontSize: '2.2em'}}>{24 - displayHours + 5} : {60 - displayMin + 30} : {60 - displaySec}</h1>
                        </div>
                        <img className = "emojiFire" src = {fire} width = "70" height = "50"/>
                    </div>: null 
            }
            
            {
                courseName ==='strength-training-course' ? <h3 id = "price-heading">STRENGTH TRAINING</h3> : 
                courseName === 'fat-loss-course' ? <h3 id = "price-heading">FAT LOSS</h3> :
                courseName === 'weight-gain-course' ? <h3 id = "price-heading">WEIGHT GAIN</h3> :
                courseName === 'endurance-course' ? <h3 id = "price-heading">ENDURANCE</h3> :
                courseName === 'fat-loss-muscle-gain-course' ? <h3 id = "price-heading">FAT LOSS + MUSCLE GAIN</h3> :
                courseName === 'prep-course' ? <h3 id = "price-heading">BODY BUILDING / PREP COACHING</h3> : null
            }
            
            {
                courseName !== 'prep-course' ? 
                <div id = "prices">
                    <div id = "four-weeks">
                        <h3 className="weeks-title">4 WEEKS</h3>
                        <ul className="perks-list">
                            <li className="perks">Workout videos</li>
                            <li className="perks">Diet plan</li>
                            <li className="perks">Workout plan according to your body goals</li>
                        </ul>
                        <div className = "payment-btn-container">
                            {
                                
                                hours < 24 ? <div><button onClick = {()=> handlePayment(1999, document.getElementById("price-heading").innerHTML,'4 WEEKS')} className="pay-btn" id = "one-thousand-ninty-nine">&#8377; 1,999</button><br/>
                                <strike>&#8377; 2,999</strike></div> : <button onClick = {()=> handlePayment(2999, document.getElementById("price-heading").innerHTML,'4 WEEKS')} className="pay-btn" id = "two-thousand-ninty-nine">&#8377; 2,999</button>
                            }
                        </div>
                        
                    </div>
                    <div id = "twelve-weeks">
                    <h3 className="weeks-title">12 WEEKS</h3>
                        <ul className="perks-list">
                            <li className="perks">Workout videos</li>
                            <li className="perks">Diet plan</li>
                            <li className="perks">Workout plan according to your body goals</li>
                        </ul>
                        <div className = "payment-btn-container">
                            {
                                hours < 24 ? <div><button onClick = {()=> handlePayment(4999, document.getElementById("price-heading").innerHTML,'12 WEEKS')} className="pay-btn" id = "four-thousand-ninty-nine">&#8377; 4,999</button><br/>
                                <strike>&#8377; 6,999</strike></div> : <button onClick = {()=> handlePayment(6999, document.getElementById("price-heading").innerHTML,'12 WEEKS')} className="pay-btn" id = "six-thousand-ninty-nine">&#8377; 6,999</button>
                            }
                        </div>
                    </div>
                    <div id = "twenty-six-weeks">
                    <h3 className="weeks-title">26 WEEKS</h3>
                        <ul className="perks-list">
                            <li className="perks">Workout videos</li>
                            <li className="perks">Diet plan</li>
                            <li className="perks">Workout plan according to your body goals</li>
                            <li className="perks">Free merchendise</li>
                        </ul>
                        <div className = "payment-btn-container">
                            {
                                hours < 24 ? <div><button onClick = {()=> handlePayment(9999, document.getElementById("price-heading").innerHTML,'26 WEEKS')} className="pay-btn" id = "nine-thousand-ninty-nine">&#8377; 9,999</button><br/>
                                <strike>&#8377; 11,999</strike></div> : <button onClick = {()=> handlePayment(11999, document.getElementById("price-heading").innerHTML,'26 WEEKS')} className="pay-btn" id = "eleven-thousand-ninty-nine">&#8377; 11,999</button>
                            }
                        </div>
                    </div>
            </div> : <div id = "prices">
                    <div id = "four-weeks">
                        <h3 className="weeks-title">4 WEEKS</h3>
                        <ul className="perks-list">
                            <li className="perks">Workout videos</li>
                            <li className="perks">Diet plan</li>
                            <li className="perks">Workout plan according to your body goals</li>
                        </ul>
                        <div className = "payment-btn-container">
                            {
                                
                             <button onClick = {()=> handlePayment(4999, document.getElementById("price-heading").innerHTML,'4 WEEKS')} className="pay-btn" id = "two-thousand-ninty-nine">&#8377; 4,999</button>
                            }
                        </div>
                        
                    </div>
                    <div id = "twelve-weeks">
                    <h3 className="weeks-title">12 WEEKS</h3>
                        <ul className="perks-list">
                            <li className="perks">Workout videos</li>
                            <li className="perks">Diet plan</li>
                            <li className="perks">Workout plan according to your body goals</li>
                        </ul>
                        <div className = "payment-btn-container">
                            {
                                 <button onClick = {()=> handlePayment(11999, document.getElementById("price-heading").innerHTML,'12 WEEKS')} className="pay-btn" id = "six-thousand-ninty-nine">&#8377; 11,999</button>
                            }
                        </div>
                    </div>
                    <div id = "twenty-six-weeks">
                    <h3 className="weeks-title">26 WEEKS</h3>
                        <ul className="perks-list">
                            <li className="perks">Workout videos</li>
                            <li className="perks">Diet plan</li>
                            <li className="perks">Workout plan according to your body goals</li>
                            <li className="perks">Free merchendise</li>
                        </ul>
                        <div className = "payment-btn-container">
                            {
                                 <button onClick = {()=> handlePayment(20999, document.getElementById("price-heading").innerHTML,'26 WEEKS')} className="pay-btn" id = "eleven-thousand-ninty-nine">&#8377; 20,999</button>
                            }
                        </div>
                    </div>
            </div>
            }
        </div>
        }
        </>
    );

}

export default Price;