//importing required resources
import React, { useEffect, useState } from 'react'
import { appFirebase } from '../firebase';
// import {  collection , getDocs, query } from 'firebase/firestore/lite';
import { updateDoc,doc,getFirestore,collection,getDocs,query} from "firebase/firestore";
import { useShop } from '../hooks';
import '../Styles/showHabit.css'
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


// code for showing habbits details
function ShowHabits() {
  const [ habits, setHabits ] = useState([]);
  const shop = useShop();
  const db = getFirestore(appFirebase);
  const TodayDate = new Date().toDateString();

  useEffect(()=>{
    let today = new Date().getDay();
    let todayHabits = shop.habits.filter((val,id)=>{
      if(val.weeks[today]){
        return val;
      }
    })
    setHabits(todayHabits);
  },[shop.habits])



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
    <div className='show-habit'>
      <h2 className='heading'>Today Actions</h2>
      <ul className='habit-list'>
        { habits.map((val,index)=>{
          return <li key={index}>
            {val.habit}
            
            {(val.actions.hasOwnProperty(TodayDate))?
            
            <div>
              {val.actions[TodayDate]=='Done'? <span style={{color:'green'}}>Done</span>: <span style={{color:'red'}}>Not Done</span>}
            
            </div>
            :
            <div>
              <IconButton color="primary" onClick={()=>{updateAction(index,val.id,'Done')}}>
                <CheckIcon />
              </IconButton>
              <IconButton color="warning" onClick={()=>{updateAction(index,val.id,'Not Done')}}>
                <ClearIcon />
              </IconButton>
            </div>
            }
          </li>
        })}
      </ul>
    </div>
  )
}

export default ShowHabits