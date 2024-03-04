import '../App.css'
import React, { useState,useEffect } from 'react';
import { collection, query,where,onSnapshot,addDoc,getDocs} from "firebase/firestore"; 
import db from '../db'
import { useParams , useNavigate, Link} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Footer from './footer';
import Header from './header'

const ShoppingCart = ({customer,cart,kitchenselected,setCart,setorderPlaced}) =>{
    console.log("customer",customer)
    console.log("cart",cart)
    const navigate = useNavigate()
    const [customeraddress,setcustomeraddress] = useState('')
    const [showsummary, setshowsummary] = useState('hide')
    const [showstatus, setshowstatus] = useState('hide')
    
    const order = []
    let  totalprice = 2.99 + 7.46
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        // ...
    };
    firebase.initializeApp(config);
    useEffect(() => {
    const getData = async () => {
    
            try {
                const userRef = collection(db, 'order');
                const userQuery = query(userRef, where('customerinfo', '==', customer.email));
                console.log('userquery',userQuery)
                await getDocs(userQuery).then((querySnapshot) => {
                    if(!querySnapshot.empty){
                       navigate("/CustomerOrderStatus")
                    }
                    else{
                        console.log("order not placed")
                        setshowsummary('')
                        setshowstatus('hide')
                    }
                })    
                
        } catch (error) {
            console.error('Error fetching admins: ', error);
            
            
        }  
    }
    getData()
}, [])

    const handleDeleteItem = (index) =>{
        if(showstatus == ""){
            const newData = window.prompt('You want to update the order. Say yes or no')
            console.log("newd",newData)
        }
        else{
            console.log('i am working inside delete',index)
            if(cart.length === 1){
                setCart([])
            }
            else if(index > 0){
            const arr1 = cart.slice(0,index)
            const arr2 = cart.slice(index+1)
            console.log(arr1,arr2)
            setCart([...arr1,...arr2])
            }
            else{
            const arr2 = cart.slice(index + 1)
            console.log('in else',arr2)
            setCart([...arr2])
            }

        }
    
      }
    const handleAddress = (e) =>{
        setcustomeraddress(e.target.value)
    }
    const handleOrderSubmission = async() =>{
        {
            // Add a new document to Menu.
            const docRef = await addDoc(collection(db, "order"), {
                kitchenuid:kitchenselected.uid,
                kitchenName:kitchenselected.KithenName,
                order:order,
                customerinfo:customer.email,
                orderStatus:"recieved",
                customeraddress:customeraddress
              });
              setshowsummary('hide')
              setshowstatus('')
              setorderPlaced(true)
          }
    }
    return(
        <div className='kitchencontainer'>
        <Header/>
        <h3>Shopping Cart</h3>
        <div className="kitchenMenu">
            <div className='tm-tab-content'>
                <div className={`tm-list `}>
                    { cart.map((menuItem,index) =>{
                        totalprice = parseFloat(totalprice) + parseFloat(menuItem.price)
                        order.push(menuItem.item)
                        return(
                            <div className={`tm-list-item ${showsummary}`}>
                                <img src={menuItem.itemimagelink} alt="Image" class="tm-list-item-img"/>
                                <div className="tm-black-bg tm-list-item-text">
                                    <h5 className='tm-list-item-name'>{menuItem.item} 
                                    <span  className="tm-list-item-price material-symbols-outlined" onClick={() => handleDeleteItem(index)}>
                                        delete
                                    </span>
                                    </h5>
                                    <p>{menuItem.price}</p>
                                </div>
                            </div>  
                            
                        )
                    })
                    }

                    <div className={`booking ${showsummary}`}>
                        <h4>Total of your order</h4>
                        <p>Please enter your delivery address</p>
                        <input type="text" onChange={(e) => handleAddress(e)}/>
                        <p>Delivery Fee:              $2.99 </p>
                        <p>Fees and Estimated Tax:    $7.46</p>
                        <p>Total :                    ${totalprice}</p>
                        <button onClick = {() => handleOrderSubmission()}>Submit order</button>
                    </div>
                    <div className={`orderstatus ${showstatus}`}>
                        <h4>Status of your order</h4>
                        <p>Your Order is sent</p>
                        <button><Link to={"/CustomerOrderStatus"}>View Your order Status on this link</Link></button>
                    </div>
                </div>
            </div>      
        </div>
        <Footer/>
    </div>
   
    )
}

export default ShoppingCart;