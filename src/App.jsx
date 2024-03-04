import './App.css';
import Home from './Components/Home';
import AdminSignIn from './Components/AdminSignIn';
import KitchenRegister from './Components/KitchenRegisterPage';
import React, { useState,useEffect } from 'react';
import { Route, Routes,useNavigate } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { collection, addDoc } from "firebase/firestore"; 
import { doc, getDocs, query,where } from "firebase/firestore";
import db from './db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import MenuDashboard from './Components/MenuDashboard';
import KitchenMenu from './Components/KitchenMenu';
import CustomerSignIn from './Components/CustomerSignIn';
import ShoppingCart from './Components/ShoppingCart';
import KitchenOrders from './Components/KitchenUserOrder';
import CustomerOrderStatus from "./Components/CustomerOrderStatus";

function App() {
  const [kitchenuser, setKitchenUser] = useState({})
  const [customer,setCustomer] = useState({})
  const [cart,setCart] = useState([])
  const[kitchenselected, setkitchenselected] = useState({}) // for kitchen menu page on customer side
  const [orderPlaced, setorderPlaced] = useState(false)
  const navigate = useNavigate()
  
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home setkitchenselected={setkitchenselected}/>} />
        <Route path="/AdminSignIn" element={<AdminSignIn setKitchenUser={setKitchenUser} kitchenuser={kitchenuser}/>} />
        <Route path="/KitchenRegister" element={<KitchenRegister  kitchenuser={kitchenuser}/>} />
        <Route path="/MenuDashboard" element={<MenuDashboard  kitchenuser={kitchenuser}/>}/>
        <Route path="/KitchenMenu/:id" element={<KitchenMenu cart={cart} setCart = {setCart} customer = {customer} kitchenselected={kitchenselected} />} />
        <Route path="/CustomerSignIn" element ={<CustomerSignIn setCustomer={setCustomer} customer={customer} cart={cart} setCart = {setCart}kitchenselected={kitchenselected} />} />
        <Route path="/ShoppingCart" element={<ShoppingCart customer = {customer}  cart={cart} setCart = {setCart} kitchenselected={kitchenselected} setorderPlaced={setorderPlaced}/>}  /> 
        <Route path="/KitchenOrders" element={<KitchenOrders kitchenuser={kitchenuser}/>}  />  
        <Route path="/CustomerOrderStatus" element={<CustomerOrderStatus customer = {customer} orderPlaced={orderPlaced}/>}  /> 
      </Routes>
    </>
  )
}

export default App
