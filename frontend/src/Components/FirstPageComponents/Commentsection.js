import React, { useEffect } from "react";
import '../FirstPageComponents/commentsection.css';
import selected_star from '../FirstPageComponents/selected_star.png';
import not_selected_star from '../FirstPageComponents/not_selected_star.png';
import unknown_profile from '../FirstPageComponents/unknown_profile.jpg';
import { useState } from "react";

function Commentsection(){

    let [shouldFix, setShouldFix] = useState(false);
    let [starsLighted, setStarLighted] = useState(0);

    let [allFetchedComments, setAllFetchedComments] = useState([])

    useEffect(()=>{

        let fetchComments = async()=>{
            let getComments = await fetch("https://api.rsthetics.com/api/getcomments");
            let json = await getComments.json();
            setAllFetchedComments(json.comments);
            
        }

        fetchComments();

    }, []);
    let hoverReviewSystem = (e)=>{
        if(shouldFix){
            return;
        }
        let starTags = ['star-0', 'star-1', 'star-2', 'star-3', 'star-4'];
        let starComponent = e.target.id.split('-');
        if(Number(starComponent[1]) === 0){
            document.getElementById(starTags[Number(starComponent[1])]).src = selected_star;
        }else{
            for(let i = 0; i <= Number(starComponent[1]); i++){
                document.getElementById(starTags[i]).src = selected_star;
            }
        }
    }

    let unhoverReviewSystem = (e)=>{

        if(shouldFix){
            console.log("action disabled")
            return;
        }
        let starTags = ['star-0', 'star-1', 'star-2', 'star-3', 'star-4'];
        for(let i = 0; i < 5; i++){
                document.getElementById(starTags[i]).src = not_selected_star;
        }
        

    }

    let fixReviewSystem = (e)=>{

       setShouldFix(true);
        
        let starTags = ['star-0', 'star-1', 'star-2', 'star-3', 'star-4'];
        let starComponent = e.target.id.split('-');
        if(Number(starComponent[1]) === 0){
            document.getElementById(starTags[Number(starComponent[1])]).src = selected_star;
            
        }else{
            for(let i = 0; i <= Number(starComponent[1]); i++){
                document.getElementById(starTags[i]).src = selected_star;
                
            }
            
        }

        setStarLighted(Number(starComponent[1]));
       
        
        
    }

    let postComment = async(e)=>{
        let response = await fetch('https://api.rsthetics.com/api/getlogininfo');
        let json = await response.json();
        if(response.ok){
            if(json.toLink === '/login'){
                window.location.href = json.toLink;
            }
        }

        let data = {}
        let resp;
        let fetchedJson;

        let commentData =  document.getElementById('input-comment-field').value;
        document.getElementById('input-comment-field').value = ''

        
        document.getElementById('comment-posted-msg').innerHTML = "Comment posted successfully. Refresh your page to see.";
        setTimeout(()=>{
            document.getElementById('comment-posted-msg').innerHTML = '';
        }, 4000)
       
        setShouldFix(false);
        data = {
            stars: starsLighted,
            comment: commentData,
            date : new Date().toString()
        }

        resp = await fetch('https://api.rsthetics.com/api/postcomment', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        fetchedJson = await resp.json();

       

       fetchFreshComments();
        
       
    }
    
    let fetchFreshComments = async()=>{
        
            let getComments = await fetch("https://api.rsthetics.com/api/getcomments");
            let json = await getComments.json();
            setAllFetchedComments(json.comments);
            
        

      
    }


    return(
        <div id = "comment-section-container">
            <div id = "comment-section-title">
                <h3>COMMENTS AND REVIEWS</h3>
            </div>
            <div id = "your-comment-editor">
                <div id = "review-system">
                    <img width= "30" src = {not_selected_star} id = "star-0" onMouseEnter={hoverReviewSystem} onMouseLeave={unhoverReviewSystem} onClick={fixReviewSystem}/>
                    <img width= "30" src = {not_selected_star} id = "star-1"  onMouseEnter={hoverReviewSystem} onMouseLeave={unhoverReviewSystem} onClick={fixReviewSystem}/>
                    <img width= "30" src = {not_selected_star} id = "star-2"  onMouseEnter={hoverReviewSystem} onMouseLeave={unhoverReviewSystem} onClick={fixReviewSystem}/>
                    <img width= "30" src = {not_selected_star} id = "star-3"  onMouseEnter={hoverReviewSystem} onMouseLeave={unhoverReviewSystem} onClick={fixReviewSystem}/>
                    <img width= "30" src = {not_selected_star} id = "star-4"  onMouseEnter={hoverReviewSystem} onMouseLeave={unhoverReviewSystem} onClick={fixReviewSystem}/>
                </div>
                <div id = "comment-write">
                    <p id = "comment-posted-msg" style = {{color: 'white'}}></p>
                    <input type = "text" id = "input-comment-field" placeholder="Post your comment"/>
                    <button onClick = {postComment} id = "post-comment-btn">POST</button>
                </div>
            </div>
            <div style = {{marginTop: '2em', height: '80vh', overflowY:'scroll'}} id = "comments-container">{allFetchedComments.map((comment)=>{
                    let i = 0;
                    let images = [];
                    while(i < comment.stars){
                        images.push(<img src = {selected_star} width = "30"/>)
                        i++
                    }
                    return (
                    <div style = {{color: 'white', marginBottom: '3em', borderBottom: '1px solid white', marginLeft: '0.5em', marginRight: '0.5em'}} id = "comment">
                        <span style = {{display: 'flex', flexDirection: 'row'}}><img style={{marginRight: '1em', paddingTop: '1em'}} width = "50" height= "50" src = {unknown_profile} /> <p>{comment.username}</p></span>
                        {images}
                        <p style = {{wordWrap: 'wrap'}}>{comment.comment}</p>
                        <p style = {{fontSize: '1em', color: '#a6a6a6'}}>{comment.date}</p>
                    </div>)
                })}
            </div>

        </div>
    );

}

export default Commentsection;