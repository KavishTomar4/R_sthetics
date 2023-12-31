import React from "react";
import '../Components/Thanksbuy.css'
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


function Thanksbuy(){

    let [course, setCourse] = useState({})
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
        let fetchCourse = async()=>{
            
            let response = await fetch('https://r-sthetics-api.vercel.app/api/fetchcourseforthanks');
            let json = await response.json();

            console.log(json);

            setCourse(json.coursePurchased)



        }

        fetchCourse();
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    },[]);
    

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
        />:<div>
            <div id = "main-thanks-container">
                <h1 id = "thanks-title">THANK YOU FOR BUYING THE COURSE</h1>
                <h4 id = "course-name"> {course.course} ( {course.duration} ) </h4>
                <Link id = "your-course-link" to = "/yourcourses">Go to your courses</Link>
            </div>
        </div>
        }
        </>
    );

}

export default Thanksbuy;