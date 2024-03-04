import '../App.css'
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {auth,provider} from "../config"
import {signInWithPopup} from "firebase/auth";
import ShoppingCart from './ShoppingCart';
import { useNavigate,Link } from 'react-router-dom';

const CustomerSignIn = ({customer ,setCustomer,cart,kitchenselected,setCart}) =>{
  const navigate = useNavigate()
   
  const handleClick = () =>{
  signInWithPopup(auth,provider).then((data) =>{
    setCustomer(data.user)
    navigate("/ShoppingCart")
  })
  }
  


    return(
        <>
          <div className="container" >
            <h3>Please Sign In to check out</h3>
            <button onClick={handleClick}>google</button>
          </div>   
         
        </>
          )
}

export default CustomerSignIn;