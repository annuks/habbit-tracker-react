import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/calender.css'
import { useEffect, useState } from 'react';
import { useShop } from '../hooks';
const localizer = momentLocalizer(moment)




function MyCalendar(props) {
  const [habits,setHabits] = useState([]);
  const [events,setEvents] = useState([]);
  let cevents = [];
  const shop = useShop();

  useEffect(()=>{
    setHabits(shop.habits);
  },[shop.habits]);

  let getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
  
  const createEventsForCalender = ()=>{
    habits.map((val,index)=>{
      const date = new Date(0);
      date.setSeconds(val.createAt.seconds); 
      const timeString = date.toLocaleDateString();
      const date1 = new Date(timeString);
      const daylist = getDaysArray(new Date(date),new Date());
      console.log("Diffre",daylist)
      daylist.map((dat,i)=>{
        const day = new Date(dat).getDay();
        if(val.weeks[day]){
          const event = {
            'title': val.habit,
            'start': new Date(dat),
            'end': new Date(dat),
            'allDay': true,
            'desc': val.desc,
            'colorEvento':'red',
            'color':'black',
            'dow': [ 1, 4 ]
          }
          console.log("jnjnjnj",event)
          cevents.push(event);
        }
        console.log(dat,new Date(dat))
      })
    })
    console.log("hbh",cevents)
    setEvents(cevents);
  }

  useEffect(()=>{
    console.log("Chutiya",habits)
    createEventsForCalender();
   },[habits])

   useEffect(()=>{
    console.log("Events in Cl",events)
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
        onSelectEvent={(event) => alert(event.title)}
        eventPropGetter={(myEventsList) => {
          const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'blue';
          const color = myEventsList.color ? myEventsList.color : 'white';
          return { style: { backgroundColor ,color} }
        }}
      />
      </div>
     
    )
  }
export default MyCalendar
