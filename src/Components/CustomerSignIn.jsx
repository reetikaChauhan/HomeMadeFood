import '../App.css'
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {auth,provider} from "../config"
import {signInWithPopup} from "firebase/auth";
import ShoppingCart from './ShoppingCart';

const CustomerSignIn = ({customer ,setCustomer,cart}) =>{
   const handleClick = () =>{
    signInWithPopup(auth,provider).then((data) =>{
      setCustomer(data.user)
    })
   }
  
    return(
        <>{
          customer.uid ? <ShoppingCart customer={customer} cart={cart}/> :
          <div className="container" >
            <h3>Please Sign In to check out</h3>
            <button onClick={handleClick}>google</button>
          </div>   
        } 
        </>
          )
}

export default CustomerSignIn;