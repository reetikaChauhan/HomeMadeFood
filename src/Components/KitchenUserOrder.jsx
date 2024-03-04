import '../App.css'
import React, { useState,useEffect } from 'react';
import { doc, getDocs, query,where,onSnapshot,collection, addDoc,setDoc,deleteDoc } from "firebase/firestore";
import db from '../db'
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import SideBar from './SideBarKitchenregister';


const KitchenOrders = ({kitchenuser}) =>{
    const[orderItems,setorderItems] = useState([])
    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        // ...
    };
    firebase.initializeApp(config);
    useEffect(() => {
        const getMenuData = async () => {
                    try {
                        const userRefMenu = collection(db, 'order');
                        const userQueryorder = query(userRefMenu, where('kitchenuid', '==', kitchenuser.uid));
                        console.log("uq",userQueryorder)
                        onSnapshot(userQueryorder, snapshot => {
                            console.log("Current data: ", snapshot.docs);
                            setorderItems(snapshot.docs)

                        });
                        
                } catch (error) {
                    console.error('Error fetching admins: ', error);
                    
                }  
    }
                
        getMenuData()
        return () => onSnapshot;
    }, [kitchenuser.uid])
    const handleStatus = async (info) => {
        try {
            // Get a reference to the 'order' collection
            const orderCollectionRef = collection(db, 'order');
            
            // Query the collection to find the document with the specified UID
            const querySnapshot = await getDocs(query(orderCollectionRef, where('customerinfo', '==', info)));
            
            // Check if there's exactly one document with the specified UID
            if (querySnapshot.size === 1) {
                // Get the document ID of the matched document
                const docId = querySnapshot.docs[0].id;
                
                // Reference to the specific document based on its ID
                const docRef = doc(db, 'order', docId);
                
                // Prompt for the new status
                const newData = window.prompt('What is the status of the order?');
                
                // Update the status field of the document
                await setDoc(docRef, { orderStatus: newData }, { merge: true });
                
                console.log('Document updated successfully!');
            } else {
                console.log('No document found or multiple documents found with the specified UID.');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };
    const handledeleteorder = async(info) =>{
        try{
            // Get a reference to the 'order' collection
            const orderCollectionRef = collection(db, 'order');
    
            // Query the collection to find the document with the specified UID
            const querySnapshot = await getDocs(query(orderCollectionRef, where('customerinfo', '==', info)));
            
            // Check if there's exactly one document with the specified UID
            if (querySnapshot.size === 1) {
                // Get the document ID of the matched document
                const docId = querySnapshot.docs[0].id;
                await deleteDoc(doc(db, "order", docId));
                console.log('Document deleted successfully!');
            } else {
                console.log('No document found or multiple documents found with the specified UID.');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
        await deleteDoc(doc(db, "order"));
    }
    

    return(
        <>
        {orderItems &&
            <>
                <div className='container'>
                    <SideBar/>
                    <div className="stepContainer" >
                        <div className="affichStep">
                            <h3>Orders of your kitchen</h3>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Customer Address</th> 
                                    <th>Customer Email</th>
                                    <th>Order Status</th>
                                    <th>Order details</th>
                                    <th>             </th>
                                    </tr>
                                </thead>
                                <tbody>
                                { orderItems.map((menuItem,index) =>{
                                    return(
                                        <tr>
                                            <td> {menuItem.data().customeraddress}</td>
                                            <td>{menuItem.data().customerinfo}</td>
                                            <td>{menuItem.data().orderStatus}</td>
                                            <td>{ menuItem.data().order.map(orderr =>{
                                                  return(
                                                    <p>{orderr}</p>
                                                  )
                                            })}
                                            </td>
                                            <td><button onClick={() =>handleStatus(menuItem.data().customerinfo)}>Update</button></td>
                                            <td><button onClick={() =>handledeleteorder(menuItem.data().customerinfo)}>Delete</button></td>
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

export default KitchenOrders;