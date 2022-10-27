//importing required resources

import { useState } from 'react'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { appFirebase } from '../firebase';
import { getFirestore, collection ,query , addDoc} from 'firebase/firestore/lite';
import '../Styles/addhabit.css'
import { useShop } from '../hooks';

//Creating components for adding a new habbit
function AddHabit(props) {
  const [value, setValue] = useState('everyday');
  const [isSpecific, setIsSpecific] = useState(false);
  const db = getFirestore(appFirebase);
  const q = query(collection(db, "habits"));
  const shop = useShop();


  const handleChange = (event) => {
    setValue((event.target).value);
    
  };

  //handling submit event
  const handleFormSubmit = (event) => {
    // console.log("evens",event);
    let habit = event.target[0].value;
    let desc = event.target[2].value;
    let often = event.target[4].checked;
    let weeks = [true,true,true,true,true,true,true]
    if(!often){
      for(let i = 6; i<= 12 ; i++){
        weeks[i-6]=event.target[i].checked;
      }
    }
    event.preventDefault();
    addDoc(q,{
      habit,desc,often,weeks,
      createAt : new Date(),
      actions : {}
    }).then((docRef)=>{
      shop.getDataFromDB();
    })
    props.setIsAddHabit(false);
  }


  //using hooks for managing state
  React.useEffect(()=>{
    if(value==='specific'){
      setIsSpecific(true);
    }else{
      setIsSpecific(false);
    }
  },[value])
  return (
    <div className='addHabit'>
      <div>
        <IconButton aria-label="delete" style={{float:'right'}} onClick={()=>{props.close(false)}}>
          <CloseIcon />
        </IconButton>
        <h2>Add Habit</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <TextField className="textfiled" label="Habit" variant="outlined" style={{width:'100%',marginTop:'10px'}} required/>
        <TextField className="textfiled" label="Description" variant="outlined" style={{width:'100%',marginTop:'10px'}}  required/>
        <FormControl style={{marginTop:'5px'}}>
          <FormLabel id="demo-controlled-radio-buttons-group">How often?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="everyday" control={<Radio />} label="Everyday" />
            <FormControlLabel value="specific" control={<Radio />} label="Specific" />
          </RadioGroup>
      </FormControl>
      
    {/* code for whether habbit is for evereday or on specific days */}
      { isSpecific ? 
      <FormGroup style={{display:'flex',flexDirection:'row'}}>
        <FormControlLabel control={<Checkbox value="Sunday" />} label="Sunday" />
        <FormControlLabel control={<Checkbox value="Monday" />} label="Monday" />
        <FormControlLabel control={<Checkbox value="Tuesday" />} label="TuesDay" />
        <FormControlLabel control={<Checkbox value="Wednesday" />} label="Wednesday" />
        <FormControlLabel control={<Checkbox value="Thrusday" />} label="Thursday" />
        <FormControlLabel control={<Checkbox value="Friday" />} label="Friday" />
        <FormControlLabel control={<Checkbox value="Saturday" />} label="Saturaday" />
      </FormGroup> : ''}
      <div style={{textAlign:'end'}}>
        <Button type='submit' variant="contained" endIcon={<AddTaskIcon />}>
          Add
        </Button>
      </div>
     
      </form>
    </div>
  )
}

export default AddHabit