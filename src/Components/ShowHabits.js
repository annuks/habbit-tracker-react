import React, { useEffect, useState } from 'react'
import { appFirebase } from '../firebase';
// import {  collection , getDocs, query } from 'firebase/firestore/lite';
import { updateDoc,doc,getFirestore,collection,getDocs,query} from "firebase/firestore";
import { useShop } from '../hooks';

function ShowHabits() {
  const [ habits, setHabits ] = useState([]);
  const shop = useShop();
  const db = getFirestore(appFirebase);
  const TodayDate = new Date().toDateString();

  useEffect(()=>{
    setHabits(shop.habits);
  },[shop.habits])

  useEffect(()=>{
    console.log("Habits",habits)
  },[habits])


  const updateAction = async (index,id,value)=>{
    let actions = habits[index].actions;
    if(!actions.hasOwnProperty(TodayDate)){
      actions[TodayDate] = value;
    }
    // actions = {}
    const docRef = doc(db, 'habits', id);
    updateDoc(docRef, {
      actions
    })
    .then(docRef => {
      shop.getDataFromDB();
    })
    .catch(error => {
        console.log(error);
    })
  }
 

  return (
    <div>
      Today Data
      <ul>
        { habits.map((val,index)=>{
          return <li key={index}>
            {val.habit} {val.desc} 
            
            {(val.actions.hasOwnProperty(TodayDate))?<>{val.actions[TodayDate]}</>:
            <>
              <button onClick={()=>{updateAction(index,val.id,'Done')}}>Done</button><button onClick={()=>{updateAction(index,val.id,'Not Done')}}>Not Done</button>
            </>
            }
          </li>
        })}
      </ul>
    </div>
  )
}

export default ShowHabits