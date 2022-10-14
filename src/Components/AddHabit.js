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
import '../Styles/addhabit.css'

function AddHabit(props) {
  const [habit,setHabit] = useState('');
  const [desc,setDesc] = useState('');
  const [often,setOften] = useState('');
  const [specific,setSpecific] = useState('');
  const [value, setValue] = useState('everyday');
  const [isSpecific, setIsSpecific] = useState(false);

  const handleChange = (event) => {
    setValue((event.target).value);
    
  };

  const handleFormSubmit = (event) => {
    console.log("evens",event);
    event.preventDefault();
    console.log(habit,desc,specific,often,value)
  }

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
        <TextField defaultValue={habit} className="textfiled" label="Habit" variant="outlined" style={{width:'100%',marginTop:'10px'}} onKeyUp={(e)=>{setHabit(e.target.value)}}/>
        <TextField defaultValue={desc} className="textfiled" label="Description" variant="outlined" style={{width:'100%',marginTop:'10px'}} onKeyUp={(e)=>{setDesc(e.target.value)}}/>
        <FormControl style={{marginTop:'5px'}}>
          <FormLabel id="demo-controlled-radio-buttons-group">How often?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            onKeyUp={(e)=>{setOften(e.target.value)}}
          >
            <FormControlLabel value="everyday" control={<Radio />} label="Everyday" />
            <FormControlLabel value="specific" control={<Radio />} label="Specific" />
          </RadioGroup>
      </FormControl>
      { isSpecific ? 
      <FormGroup style={{display:'flex',flexDirection:'row'}}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Sunday" />
        <FormControlLabel control={<Checkbox  />} label="Monday" />
        <FormControlLabel control={<Checkbox  />} label="TuesDay" />
        <FormControlLabel control={<Checkbox  />} label="Wednesday" />
        <FormControlLabel control={<Checkbox  />} label="Thursday" />
        <FormControlLabel control={<Checkbox  />} label="Friday" />
        <FormControlLabel control={<Checkbox  />} label="Saturaday" />
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