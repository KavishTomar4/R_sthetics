import React from 'react';
import '../FirstPageComponents/about.css';
import tempImg from '../FirstPageComponents/temporaryImg.jpg';
import trainerCertificate from '../FirstPageComponents/Trainer_certificate.jpg';
import anabolicsCertificate from '../FirstPageComponents/anabolics_certificate.jpg';
import certificate2 from '../FirstPageComponents/rahul nutrition.jpg';

function About(){

    return(
        <div className = "component" id = "about-section">
            <h3 style = {{marginLeft: '2.5em',fontSize: '2.2em', marginTop: '0em', paddingTop: '3em'}}>ABOUT US</h3>
            <div className = "para-component" id = "first-para">
                <div id = "para-side">
                    <p>
                    Hi! my name is Rahul Sarode and welcome to my world of fitness and transformation! I am thrilled to be your guide on this journey towards achieving your health and body goals. 
                    With over 5 years of experience in the fitness industry, 
                    I have honed my skills and expertise to help you unlock your true potential and become the best version of yourself.
                    </p>
                </div>
                <div  id = "img-side">
                    <img style = {{marginLeft: '2em', marginRight: '2em', border: '2px solid white', borderRadius: '2em'}} width = "250" src = {certificate2}/>
                </div>
            </div>
            <div className = "para-component" id = "second-para">
               <div id = "img-side-1">
                    <img style = {{marginLeft: '2em', marginRight: '2em', border: '2px solid white', borderRadius: '2em'}} width = "250" src = {trainerCertificate}/>
                </div>
                <div id = "para-side-1">
                <p>
                Bodybuilding has been my passion from a young age, and over the years, I have dedicated myself to mastering the art of sculpting the human physique. 
                My commitment and hard work have not gone unnoticed, as I have proudly earned victories in both local and prestigious bodybuilding competitions. 
                These achievements have not only fueled my passion but also instilled in me the determination to inspire and uplift others through the power of fitness.
                </p>
                </div>
            </div>
            <div className = "para-component" id = "third-para">
                <div id = "para-side-2">
                <p>
                Bodybuilding has been my passion from a young age, and over the years, I have dedicated myself to mastering the art of sculpting the human physique. 
                My commitment and hard work have not gone unnoticed, as I have proudly earned victories in both local and prestigious bodybuilding competitions. 
                These achievements have not only fueled my passion but also instilled in me the determination to inspire and uplift others through the power of fitness.
                </p>
                </div>
                <div id = "img-side-2">
                    <img style = {{marginLeft: '2em', marginRight: '2em', border: '2px solid white', borderRadius: '2em'}} width = "350" src = {anabolicsCertificate}/>
                </div>
            </div>
            <div id = "fourth-para">
                <div id = "para-side-3">
                <p>
                    Whether you are a beginner looking to kickstart your fitness journey or an experienced athlete seeking to push your limits, 
                    I am here to guide and push you towards greatness. My mission is to empower you with the knowledge, skills, and confidence 
                    to not only transform your physique but also improve your overall well-being.
                </p>
                </div>
            </div>
            <div id = "fifth-para">
                <div id = "para-side-4">
                <p>
                Join me on this exciting adventure towards a stronger, healthier, and more confident you. 
                Together, we will break barriers, conquer goals, and build a foundation for a lifetime of wellness. 
                Let's start this transformative journey together and witness the incredible results that await you!
                </p>
                </div>
            </div>
           
        </div>
    );


}

export default About;