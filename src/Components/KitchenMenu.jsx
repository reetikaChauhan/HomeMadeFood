import '../App.css'
import React, { useState,useEffect } from 'react';
import { collection, query,where,onSnapshot} from "firebase/firestore"; 
import db from '../db'
import { useParams , useNavigate} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Footer from './footer';
import Header from './header';

const KitchenMenu = ({cart,setCart,customer, kitchenselected}) =>{
    const { id } = useParams();
    const navigate = useNavigate()
    const[kitchenmenu,setkitchenMenu] = useState([])
   
    useEffect(() => {
        const getMenuData = async () => {
                    try {
                        const userRefMenu = collection(db, 'Menu');
                        const userQueryMenu = query(userRefMenu, where('uid', '==', id));
                        console.log('userquerymenu', userQueryMenu)
                        onSnapshot(userQueryMenu, snapshot => {
                            console.log("Current data: ", snapshot.docs);
                            setkitchenMenu(snapshot.docs)
                        });
                    } catch (error) {
                        console.error('Error fetching admins: ', error);   
                    }  
                }     
        getMenuData()
        return () => onSnapshot;
    }, [id])
    
    const handleshowcart = () =>{
           navigate("/CustomerSignIn")
          
    }
    return(
        <>
        {kitchenmenu &&
            <>
                <div className='kitchencontainer'>
                    <div className="kitchenimagediv">
                       <img src={kitchenselected.kitchenimagelink}/>
                    </div>
                    <h3>{kitchenselected.KithenName}</h3>
                    <div className="kitchenMenu">
                        <div className='heading'>
                            <div className='head-text'> 
                                <h4>Full Menu</h4>
                                <p>10:00 AM - 8:15 PM</p>
                            </div>
                            <div className='cart' >
                                <button onClick={() => handleshowcart()}><span className="material-symbols-outlined">shopping_bag</span></button>
                                <span className="cart-count">0 </span>      
                            </div> 
                        </div> 
                      
                        <div className='tm-tab-content'>
                            <div className="tm-list">
                           
                                { kitchenmenu.map(menuItem =>{
                                    const handleAddToCart = (menuItem) =>{
                                        setCart(prevcart => [...prevcart,menuItem.data()]); 
                                    }
                                    return(
                                        <div className='tm-list-item'>
                                            <img src={menuItem.data().itemimagelink} alt="Image" class="tm-list-item-img"/>
                                            <div className="tm-black-bg tm-list-item-text">
                                                <h5 className='tm-list-item-name'>{menuItem.data().item} <span class="tm-list-item-price">${menuItem.data().price}</span></h5>
                                                <p class="tm-list-item-description">Here is a wait timming for the first item. {menuItem.data().wait}.</p>
                                                <p>{menuItem.data().wait}</p>
                                                <button onClick={() => handleAddToCart(menuItem)}>+</button>
                                            </div>
                                        </div>  
                                    )
                                })
                                }
                            </div>
                        </div> 
                           
                    </div>
                </div>
            </>
        }
        <Footer/>
        </>
        
    )
}

export default KitchenMenu;