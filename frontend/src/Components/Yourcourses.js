import React, { useState } from "react";
import '../Components/Yourcourses.css';
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ClipLoader from "react-spinners/ClipLoader";

function Yourcourses(){

    let history = useHistory();
    let [loading, setLoading] = useState(false);
    let [mql, setMql] = useState(false);
    let [empty, setEmpty] = useState('');
    let override = {
        display: "block",
        margin: "10em 45em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    let override_mobile = {
        display: "block",
        margin: "10em 10em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    let [yourCourses, setYourCourses] = useState([])
    let [randomColors, setRandomColors] = useState(['linear-gradient(to bottom right, #228044, #37de74)', 'linear-gradient(to bottom right, #821f1f, #eb3636)',
                                                    'linear-gradient(to bottom right, #85621c, #fcb930)', 'linear-gradient(to bottom right, #194c70, #3192d6)',
                                                    'linear-gradient(to bottom right, #56257d, #9c42e3)', 'linear-gradient(to bottom right, #827f26, #d9d43f)'])
    
    useEffect(()=>{
        setLoading(true);
        setMql(window.matchMedia("(max-width: 765px)").matches);
        let fetchLogin = async()=>{
            let response = await fetch('https://api.rsthetics.com/api/getlogininfo',{
                credentials: 'include'
            });
            let json = await response.json();

            if(response.ok){
                if(json.toLink === '/login'){
                    history.replace(window.location.href)
                    history.push(json.toLink)
                }
            }
        }

        fetchLogin();
        
        let fetchCourses = async()=>{
            let response = await fetch('https://api.rsthetics.com/api/yourcourses',{
                credentials: 'include'
            });
            let json = await response.json();
            
            if(response.ok){
                if(json.coursePurchased.length === 0){
                    setEmpty("You haven't bought any course")
                    
                }else{
                for(let i = 0; i < json.coursePurchased.length; i++){
                    let timeinhours = (Date.now - json.coursePurchased[i].purchaseTime)/(1000*60*60);
                    let timeinDays = (timeinhours)/24;
                    let timeinWeeks = timeinDays/7;
                    if(json.coursePurchased[i].duration === "4 WEEKS"){
                        if(timeinWeeks > 4){
                            json.coursePurchased[i].expire = true;
                        }
                    }
                    if(json.coursePurchased[i].duration === "12 WEEKS"){
                        if(timeinWeeks > 12){
                            json.coursePurchased[i].expire = true;
                        }
                    }
                    if(json.coursePurchased[i].duration === "26 WEEKS"){
                        if(timeinWeeks > 26){
                            json.coursePurchased[i].expire = true;
                        }
                    }
                }    
                setYourCourses(json.coursePurchased)
                }
            }else{
                console.log("something went wrong")
            }
        }

        fetchCourses();

        setTimeout(()=>{
            setLoading(false)
        }, 1500)
        
    }, []);

    let haveIt = [];
    let generateUniqueRandom = (maxNr)=>{
        //Generate random number
        let random = (Math.random() * maxNr).toFixed();
    
        //Coerce to number by boxing
        random = Number(random);
    
        if(!haveIt.includes(random)) {
            haveIt.push(random);
            return random;
        } else {
            if(haveIt.length < maxNr) {
              //Recursively generate number
             return  generateUniqueRandom(maxNr);
            } else {
              console.log('No more numbers available.')
              return false;
            }
        }
    }

    
    return(
        <>
        {
            loading === true? mql !== true ?
            <ClipLoader
                    color="#438c68"
                    loading={loading}
                    size={50}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />:
                <ClipLoader
                    color="#438c68"
                    loading={loading}
                    size={50}
                    cssOverride={override_mobile}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :<div>
            <div id = "title-container">
                <h4 id = "your-courses-title">YOUR COURSES</h4>
            </div>
            <p id = "empty-msg" style = {{color: '#8c8c8c', textAlign: 'center'}}>{empty}</p>
            <div id = "your-course-container">
                {
                    yourCourses.map((c)=>{
                        <p  id = "empty-msg" style = {{color: 'white'}}>{empty}</p>
                        return c.expire != true ?
                            <Link style = {{textDecoration: 'none'}} to = {`/yourcourses/${(c.course).toLowerCase()}-${(c.duration).toLowerCase()}`}><div className = "your-course" style = {{background: randomColors[generateUniqueRandom(5)]}}>
                            <h3 style = {{color: 'white', marginLeft: '0.5em', marginRight: '0.5em'}}>{c.course}</h3>
                            <h4 style = {{color: 'white'}}>{c.duration}</h4>
                        </div></Link> : <Link style = {{textDecoration: 'none'}} to = {`/yourcourses/${(c.course).toLowerCase()}-${(c.duration).toLowerCase()}`}><div className = "your-course" style = {{background: 'linear-gradient(to bottom, #e60e0e, #d65151)'}}>
                            <h3 style = {{color: 'white', marginLeft: '0.5em', marginRight: '0.5em'}}>{c.course}</h3>
                            <h4 style = {{color: 'white'}}>Course expired</h4>
                        
                        </div></Link>
                        
                    })
                }
            </div>
        </div>
        }
        </>
    );

}

export default Yourcourses;