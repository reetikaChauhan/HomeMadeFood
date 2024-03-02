import '../App.css'
import React, { useState,useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { doc, getDocs, query,where } from "firebase/firestore";
import db from '../db'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate,Link } from 'react-router-dom';
import SideBar from './SideBarKitchenregister';

const KitchenRegister = ({kitchenuser}) =>{
    //const [kitchenuser, setKitchenUser] = useState({})
    console.log("kitchenuser",kitchenuser)
    const [showregisterkitchen, setregisterKitchen] = useState('hide')
    const [showaddmenu, setAddmenu] = useState('hide')
    const [entry,setEntry] = useState({})
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
   
    const navigate = useNavigate()
    const hide = 'hide'

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
                const userQuery = query(userRef, where('uid', '==', kitchenuser.uid));
                console.log('userquery',userQuery)
                await getDocs(userQuery).then((querySnapshot) => {
                    if(!querySnapshot.empty){
                        querySnapshot.forEach((doc) => {
                            setEntry(doc.data())
                            setregisterKitchen("hide")
                            setAddmenu("")
                            setIsLoading(false)
                        });
                    }
                    else{
                        setregisterKitchen("")
                        setAddmenu("hide")
                        setIsLoading(false)
                    }
                })    
                
        } catch (error) {
            console.error('Error fetching admins: ', error);
            setIsLoading(true)
            
        }  
    }
    getData()
}, [kitchenuser.uid])

   
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prevEntry => ({
    ...prevEntry,
    [name]: value
  }));

  }
  const handlenextStep = async e =>{
    setregisterKitchen("hide")
    setAddmenu("")
    e.preventDefault();
    console.log(entry)
    
    // Add a new document to registeredkitchenadmins.
    const docRef = await addDoc(collection(db, "registeredkitchenadmins"), {
        Address: entry.address,
        Name:kitchenuser.displayName,
        Email:kitchenuser.email,
        Category:entry.category,
        uid:kitchenuser.uid,
        KithenName:entry.name,
        kitchenimagelink:entry.kitchenimage,
        createdAT: new Date()
      });
      setEntry('')
      console.log("Document written with ID: ", docRef.id);
  }
  const handlenextStepTwo = async e =>{
    setregisterKitchen("hide")
    setAddmenu("")
    e.preventDefault();
    console.log(entry)
    
    // Add a new document to Menu.
    const docRef = await addDoc(collection(db, "Menu"), {
        uid:kitchenuser.uid,
        item:entry.item,
        price:entry.price,
        wait:entry.wait,
        itemimagelink:entry.imagelink
      });
      setEntry('')
  }
  
  if (isLoading) {
    return <h1>Loading...</h1>
}

if (hasError) {
    return <p>Error!</p>
}

   

    return(
        <>
       <div className="container" >
            <SideBar/>
            <div className="stepContainer" >
                <div className="affichStep">
                    <div className={`stepInfo ${showregisterkitchen}`} >
                        {kitchenuser &&
                        <><h3> Welcome {kitchenuser.displayName}</h3></>}
                        <h4>Register your kitchen</h4>
                        <p>Name of Kitchen</p>
                        <input
                            type="text"
                            name="name" value={entry.name || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Category (eg. Indian, Mexican, Filipino)</p>
                        <input
                            type="text"
                            name="category" value={entry.category || ''}  
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Address </p>
                        <input
                            type="text"
                            name="address" value={entry.address || ''}  
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Image of your kitchen link </p>
                         <input
                            type="text"
                            name="kitchenimage" value={entry.kitchenimage || ''}  
                            onChange={(e) => handleChange(e)}
                        />
                        <div class="buttonContainerStepOne">
                            <button  onClick={handlenextStep} class="nextStep">Next Step</button>
                        </div>
                    </div>
                    <div className={`stepInfo ${showaddmenu}`} >
                        {kitchenuser &&
                        <><h3> Welcome {kitchenuser.displayName}</h3></>}
                        <h4>Add Menu</h4>
                        <p>Item</p>
                        <input
                            type="text"
                            name="item" value={entry.item || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Image of your Item Link </p>
                        <input
                            type="text"
                            name="imagelink" value={entry.imagelink || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Price</p>
                        <input
                            type="text"
                            name="price" value={entry.price || ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <p>Wait Time </p>
                        <input
                            type="text"
                            name="wait" value={entry.wait|| ''} 
                            onChange={(e) => handleChange(e)}
                        />
                        <div class="buttonContainerStepOne">
                            <button  onClick={handlenextStepTwo} class="nextStep">Add Menu</button>
                        </div>
                        
                    </div>
                   

                </div>
            </div>
        </div>       
        </>
          )
}

export default KitchenRegister;