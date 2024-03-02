import '../App.css'
import React, { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const SideBar = () =>{
   
    const navigate = useNavigate()
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      // ...
  };
  firebase.initializeApp(config);
  
  
  
  return(<>
        <div className="displayStep">
            <div className="circle">
                <div className="circle1"><p>1</p></div>
                <div className="circle2" ><p>2</p></div>
                <div className="circle3" ><p>3</p></div>
                <div className="circle4"><p>4</p></div>
            </div>
            <div className="steps">
                <div className="step1">
                    <span><Link to={"/MenuDashboard"}>MENU</Link></span>
                </div>
                <div className="step1">
                    <span><Link to={"/KitchenRegister"}>ADD TO MENU</Link></span>
                </div>
                <div className="step1">
                    <span>PROFILE</span>
                </div>
                <div className="step1">
                    <span onClick={() =>{
                firebase.auth().signOut();
                navigate("/")
            } }>   SIGN OUT</span>
                </div>
            </div>
        </div>
  
  </>)
}

export default SideBar;