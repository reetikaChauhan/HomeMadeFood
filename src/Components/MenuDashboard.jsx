import '../App.css'
import React, { useState,useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { collection, addDoc } from "firebase/firestore"; 
import { doc, getDocs, query,where,onSnapshot } from "firebase/firestore";
//import { getDatabase, ref, query, orderByChild, equalTo,get } from "firebase/database";
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBarKitchenregister';


const MenuDashboard = ({kitchenuser}) =>{
    const[menuItems,setMenuItems] = useState([])
    useEffect(() => {
        const getMenuData = async () => {
                    try {
                        console.log("userrr",kitchenuser)
                        const userRefMenu = collection(db, 'Menu');
                        const userQueryMenu = query(userRefMenu, where('uid', '==', kitchenuser.uid));
                        console.log('userquerymenu', userQueryMenu)
                        onSnapshot(userQueryMenu, snapshot => {
                            console.log("Current data: ", snapshot.docs);
                            setMenuItems(snapshot.docs)
                        });
                        
                } catch (error) {
                    console.error('Error fetching admins: ', error);
                    
                }  
                }
                
        getMenuData()
        return () => onSnapshot;
    }, [kitchenuser.uid])
    

    return(
        <>
        {menuItems &&
            <>
                <div className='container'>
                    <SideBar/>
                    <div className="stepContainer" >
                        <div className="affichStep">
                            <h3>Menu of your kitchen</h3>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Item</th> 
                                    <th>Price</th>
                                    <th>Wait</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { menuItems.map(menuItem =>{
                                    return(
                                        <tr>
                                            <td> {menuItem.data().item}</td>
                                            <td>{menuItem.data().price}</td>
                                            <td>{menuItem.data().wait}</td>
                                        </tr>
                                         
                                    )
                                
                                })
                                
                                }
                               </tbody>
                         </table>
                        </div>
                    </div>
                </div>
            </>
        }
        </>
        
    )
}

export default MenuDashboard;