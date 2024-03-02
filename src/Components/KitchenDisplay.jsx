import '../App.css'
import { collection, addDoc, orderBy, onSnapshot, query} from "firebase/firestore"; 
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
const KitchenDisplayonHomePage = ({setkitchenselected}) =>{
    const[kitchens, setkitchens] = useState([])
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
                    const userRef = collection(db, 'registeredkitchenadmins');
                    const userQuery = query(userRef, orderBy("createdAT", 'desc'));
                    console.log('userquery',userQuery)
                    onSnapshot(userQuery, snapshot => {
                        console.log("Current data: ", snapshot.docs);
                        setkitchens(snapshot.docs)
                       
                    });      
            } catch (error) {
                console.error('Error fetching admins: ', error);  
            }  
        }
        getData()
        return () =>onSnapshot;
    }, [])
   
    return(
        <>
            <section class="image-gallery">
               { kitchens.map(kitchen =>{
                    setkitchenselected(kitchen.data())
                    return(
                        <div className="img-card" >
                        <div className='image'>
                            <img src={kitchen.data().kitchenimagelink} alt="image"/>  
                            <div className='text'>
                              <button> <h6>{kitchen.data().KithenName}</h6> </button>    
                            </div> 
                            <div className='reviews'>
                                <span className="material-symbols-outlined">favorite</span>
                            </div>
                            <div className='showmenu'>
                                <button className='menubutton' type="button" ><Link to={`/KitchenMenu/${kitchen.data().uid}`}>View</Link></button>
                            </div>
                        </div>
                    </div>
                    )   
             })
            }
            </section>
        </>
    )
   
}

export default KitchenDisplayonHomePage;