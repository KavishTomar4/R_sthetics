import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import '../Components/Yourcoursedescription.css'



function Yourcoursedescription(){

    let {yourcourse} = useParams()
   
    let courseNomenclature = yourcourse.split('-')

    let [courseExpire, setCourseExpire] = useState(false);

    let [isExpired, setIsExpired] = useState(false);

    useEffect(()=>{
        let fetchLogin = async()=>{
            let response = await fetch('/api/getlogininfo');
            let json = await response.json();

            if(response.ok){
                if(json.toLink === '/login'){
                    window.location.href = json.toLink;
                }
            }
        }

        let getCoursePurchaseTime = async()=>{

            let courseName = {
                coursename: courseNomenclature[0].toUpperCase(),
                duration: courseNomenclature[1].toUpperCase() 
            }
            let response = await fetch('/api/getpurchasetime', {
                method: 'POST',
                body: JSON.stringify(courseName),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            let json = await response.json();

            let timeinhours = (Date.now() - json.purchasedTime)/(1000*60*60);
            let timeinDays = (timeinhours)/24;
            let timeinWeeks = timeinDays/7;
            console.log(timeinWeeks);

            if(courseNomenclature[1].toUpperCase() === "4 WEEKS"){
                
                if(timeinWeeks > 4){
                    setCourseExpire(true);
                }

            }
            if(courseNomenclature[1].toUpperCase() === "12 WEEKS"){
                if(timeinWeeks > 12){
                    setCourseExpire(true);
                }
            }
            if(courseNomenclature[1].toUpperCase() === "26 WEEKS"){
                if(timeinWeeks > 26){
                    setCourseExpire(true);
                }
            }

            if(courseExpire){
                let updateCourseStatus = await fetch("/api/updatecoursestatus", {
                    method: "POST",
                    body: JSON.stringify({expire: true, coursename: courseNomenclature[0].toUpperCase(), duration: courseNomenclature[1].toUpperCase() }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })

                let json01 = await updateCourseStatus.json();

            }

        }

        let getIsExpired = async()=>{
            let courseName = {
                coursename: courseNomenclature[0].toUpperCase(),
                duration: courseNomenclature[1].toUpperCase() 
            }
            let response = await fetch('/api/getcoursestatus', {
                method: 'POST',
                body: JSON.stringify(courseName),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            let json = await response.json();

            setIsExpired(json.courseExpired);
        }

        fetchLogin();

        getCoursePurchaseTime();

        getIsExpired();
    })

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
                        <link style = {{ fontSize: '1.5em',color: '#4fa87c'}} to = "#">Click here to Renew</link>
                    </div>
            }
        </div>
        
    );
}

export default Yourcoursedescription;