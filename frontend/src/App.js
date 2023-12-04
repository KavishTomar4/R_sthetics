import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar';
import Firstpage from './Components/FirstPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Courses from './Components/Courses';
import Price from './Components/Price';
import Thanksbuy from './Components/Thanksbuy';
import Yourcourses from './Components/Yourcourses';
import Yourcoursedescription from './Components/Yourcoursedescription';
import { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  
  return (
    <>
      <BrowserRouter>
      
        <Switch>
          <Route exact path = "/">
            <Navbar/>
            <Firstpage />
          </Route>
          <Route exact path = "/login">
            <Navbar/>
            <Login/>
          </Route>
          <Route exact path = "/register">
            <Navbar/>
            <Register/>
          </Route>
          <Route exact path = "/courses">
            <Navbar/>
            <Courses/>
          </Route>
          <Route exact path = "/price/:courseName">
            <Navbar/>
            <Price/>
          </Route>
          <Route exact path = "/finalpage">
              <Navbar/>
              <Thanksbuy/>
          </Route>
          <Route exact path = "/yourcourses">
              <Navbar/>
              <Yourcourses/>
          </Route>
          <Route exact path = "/yourcourses/:yourcourse">
              <Navbar/>
             <Yourcoursedescription/>
          </Route>  
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
