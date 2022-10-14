import { useEffect, useState } from 'react';
import './App.css';
import MyCalendar from './Components/MyCalender';
import AddHabbit from './Components/AddHabit';
import ShowHabits from './Components/ShowHabits';
import Button from '@mui/material/Button';
import SingleHabit from './Components/SingleHabit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import moment from "moment";

function App() {
  const [events,setEvent] = useState([]);
  const [isAddHabit,setIsAddHabit]= useState(false)
  useEffect(()=>{
    setEvent([
      {
        'title': 'Conference',
        'start': new Date("2022-09-28 (PDT)"),
        'end': new Date("2022-09-28 (PDT)"),
        'allDay': true,
        'desc': 'Big conference for important people',
        'colorEvento':'red',
        'color':'black',
        'dow': [ 1, 4 ]
      },
      {
        'title': 'Conference',
        'start': new Date("2022-09-28"),
        'end': new Date("2022-09-28"),
        'allDay': true,
        'desc': 'Big conference for important people',
        'colorEvento':'red',
        'color':'black',
        'dow': [ 1, 4 ]
      },
      {
        'title': 'Eat',
        'start': new Date("2022-10-01"),
        'end': new Date("2022-10-01"),
        'allDay': true,
        desc: 'Big conference for important people',
      },
      {
        'title': 'Jogging',
        'start': new Date("2022-10-01"),
        'end': new Date("2022-10-01"),
        'allDay': true,
        desc: 'Big conference for important people'
      },
      {
        'title': 'Car Wash',
        'start': new Date("2022-10-01"),
        'end': new Date("2022-10-01"),
        'allDay': true,
        desc: 'Big conference for important people'
      },
    ])
    // console.log(moment().startOf('week'),moment().endOf('week'))
  },[])

  
  return (
    <div className="App">
      <div style={{textAlign:'end',margin:'10px'}}>
        <Button variant="contained" endIcon={<AssignmentTurnedInIcon />} onClick={()=>{setIsAddHabit(true)}}>
          Add
        </Button>
      </div>
      {isAddHabit && <AddHabbit close={setIsAddHabit}/>}
      <ShowHabits/>
      <div className='calender'>
        <MyCalendar events={events}/>
      </div>
    </div>
  );
}

export default App;
