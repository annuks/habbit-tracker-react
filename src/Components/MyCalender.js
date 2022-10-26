import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/calender.css'
import { useEffect, useState } from 'react';
import { useShop } from '../hooks';
import CustomizedDialogs from './CustomizedDialogs';
const localizer = momentLocalizer(moment)




function MyCalendar(props) {
  const [habits,setHabits] = useState([]);
  const [events,setEvents] = useState([]);
  const [isOpen,setIsOpen] = useState(false);
  const [habit,setHabit] = useState({});
  let cevents = [];
  const shop = useShop();

  useEffect(()=>{
    setHabits(shop.habits);
  },[shop.habits]);

  let getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
  var curr = new Date; // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();
  const createEventsForCalender = ()=>{
    habits.map((val,index)=>{
      const date = new Date(0);
      date.setSeconds(val.createAt.seconds); 
      const timeString = date.toLocaleDateString();
      const daylist = getDaysArray(new Date(date),lastday);
      console.log("Diffre",daylist)
      daylist.map((dat,i)=>{
        const day = new Date(dat).getDay();
        console.log("Now",val.actions[dat.toDateString()])
        if(val.weeks[day]){
          const event = {
            'data':val,
            'title': val.habit,
            'start': new Date(dat),
            'end': new Date(dat),
            'allDay': true,
            'desc': val.desc,
            'colorEvento':Object.keys(val.actions).includes(dat.toDateString())
            ?val.actions[dat.toDateString()]=="Done"?'green':'red'
            :'grey',
            'color':'white',
            'dow': [ 1, 4 ]
          }
          // console.log("jnjnjnj",event)
          cevents.push(event);
        }
        // console.log(dat,new Date(dat))
      })
    })
    // console.log("hbh",cevents)
    setEvents(cevents);
  }

  useEffect(()=>{
    // console.log("Chutiya",habits)
    createEventsForCalender();
   },[habits])

   useEffect(()=>{
    // console.log("Events in Cl",events)
   },[events])
  




    return (
      <div>
   <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['week']}
        defaultView={'week'}
        onSelectEvent={(event) => { setIsOpen(true) 
          setHabit(event)}}
        eventPropGetter={(myEventsList) => {
          const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
          const color = myEventsList.color ? myEventsList.color : 'white';
          return { style: { backgroundColor ,color} }
        }}
      />
      { isOpen ? <CustomizedDialogs habit={habit} setIsOpen={setIsOpen} open={true}/>:''}
      </div>
     
    )
  }
export default MyCalendar
