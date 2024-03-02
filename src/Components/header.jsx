import '../App.css'
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
const Header = () =>{
    return(
        <>
            <div className='top-head'>
                <a href='#'>Find a Rental</a>
                <p>|</p>
                <a href='#'>Help</a>
                <p>|</p>
                <a href='#'>Join us</a>
                <p>|</p>
                <a href='#'>Sign In</a>
            </div>
            <div className='head'>
                <div className='navbar'>
                    <div className='bnb'>
                        <a href='#' className='bnb'><h4>BnB</h4></a>
                    </div>
                    <div className='center-links'>
                        <a href='#' className='stays'><h6>Stays</h6></a>
                        <a href='#'className='experiences'><h6>Experineces</h6></a>
                        <a href='#'className='onlineexperiences'><h6>Online Experiences</h6></a>
                    </div>
                    <div className='logins'>
                        <a href='/AdminSignIn'className='byh'><h6>Register</h6></a>
                        <a href='#'><span className="material-symbols-outlined">language</span></a>
                    </div>
                </div> 
                <div className='heading'>
                    <div className='head-text'> <h4>Learn About Guest Favourites, most loved homes of BnB</h4></div>
                    <div className='cart' >
                            <button ><span className="material-symbols-outlined">shopping_bag</span></button>
                            <span className="cart-count">0 </span>      
                    </div> 
                </div>  
            </div>
        </>
    )
}
export default Header;
