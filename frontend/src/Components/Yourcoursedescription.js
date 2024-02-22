import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../Components/Yourcoursedescription.css'



function Yourcoursedescription(){

    let history = useHistory();
    let {yourcourse} = useParams()
   
    let courseNomenclature = yourcourse.split('-')

    let [courseExpire, setCourseExpire] = useState(false);

    let [isExpired, setIsExpired] = useState(false);

    useEffect(()=>{
        
        let fetchLogin = async()=>{
            let response = await fetch('https://r-sthetics.onrender.com/api/getlogininfo',{
                credentials: 'include'
            });
            let json = await response.json();

            if(response.ok){
                if(json.toLink !== ''){
                    history.replace(window.location.href)
                    history.push(json.toLink)
                }
            }
        }

        

        let getExpired = async()=>{
            let response = await fetch('https://api.rsthetics.com/api/yourcourses',{
                credentials: 'include'
            });
            let json = await response.json();

            if(response.ok){
                for(let i = 0; i < json.coursePurchased.length; i++){
                    if(json.coursePurchased[i].course === courseNomenclature[0].toUpperCase() && json.coursePurchased[i].duration === courseNomenclature[1].toUpperCase()){
                        if(json.coursePurchased[i].expire === true){
                            setIsExpired(true);
                        }
                    }
                }
            }
        }

        getExpired();

    }, [])

    return(
        <div>
            {
                isExpired === false ? 
                courseNomenclature[0] ==='strength training'? <div className="course-description">
                    <h3>{courseNomenclature[0].toUpperCase()}</h3>
                    <h3>Duration: {courseNomenclature[1]}</h3>
                    <h4 className="desc">Strength training, also known as weight training or resistance training, 
                        involves the performance of physical exercises that are designed to improve strength and endurance.
                        It is often associated with the lifting of weights.</h4>
                </div> : courseNomenclature[0] ==='fat loss'?<div className="course-description">
                    <h3>{courseNomenclature[0].toUpperCase()}</h3>
                    <h3>Duration: {courseNomenclature[1]}</h3>
                    <h4 className="desc">Fat loss involves creating a calorie deficit through a balanced diet and regular exercise. 
                    A calorie deficit means consuming fewer calories than your body burns, 
                    which forces your body to use stored body fat for energy.</h4>
                    </div>:  courseNomenclature[0] ==='weight gain'?<div className="course-description">
                    <h3>{courseNomenclature[0].toUpperCase()}</h3>
                    <h3>Duration: {courseNomenclature[1]}</h3>
                    <h4 className="desc">You may want to gain weight to build muscle or if you’re underweight, 
                    which means you weigh less than is healthy for your height. Regular exercise is one of the most important steps to bulk up. But as with losing weight, 
                    gaining weight should be a part of a holistic plan.</h4>
                    </div>:  courseNomenclature[0] ==='endurance'?<div className="course-description">
                    <h3>{courseNomenclature[0].toUpperCase()}</h3>
                    <h3>Duration: {courseNomenclature[1]}</h3>
                    <h4 className="desc">Endurance is the ability of an organism to exert itself and remain active for a long period of time, 
                    as well as its ability to resist, withstand, 
                    recover from and have immunity to trauma, wounds, or fatigue.
                    
                    Endurance training is the act of exercising to increase endurance. 
                    The term endurance training generally refers to training the aerobic system as opposed to the anaerobic system.</h4>
                    </div>: null
                    :
                    <div>
                        <h3>{courseNomenclature[0].toUpperCase()}</h3>
                        <h3>Duration: {courseNomenclature[1]}</h3>
                        <h3>THIS COURSE DURATION IS EXPIRED</h3>
                        <Link style = {{ fontSize: '1.5em',color: '#4fa87c'}} to = "#">Click here to Renew</Link>
                    </div>
            }
        </div>
        
    );
}

export default Yourcoursedescription;