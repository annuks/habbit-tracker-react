//importing required resources
import { useContext, useEffect, useState } from "react";
import { HabitContext } from "../provider/ShopProvider";
import { appFirebase } from '../firebase';
import { getFirestore,collection,getDocs,query} from "firebase/firestore";

// creating custom hooks for managing state of all habits
export const useShop = () => {
  return useContext(HabitContext);
};

export const useProvideShop = () => {
 const [habits,setHabits] = useState([]);

// fetching data from DB
 function getDataFromDB(){
  const db = getFirestore(appFirebase);
  const q = query(collection(db, "habits"))
  const querySnapshot =  getDocs(q);
  querySnapshot.then((snapshot)=>{
    const habits = snapshot.docs.map((doc)=>{
      return {
        id : doc.id,
        ...doc.data()
      }
    })
    setHabits(habits);

  }).catch(err => console.log(err.message));
}

useState(()=>{getDataFromDB()},[])
  return {
    habits,
    setHabits,
    getDataFromDB
  };
};
