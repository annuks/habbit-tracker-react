import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/calender.css'
const localizer = momentLocalizer(moment)




function MyCalendar(props) {
    return (
      <div>
   <Calendar
        localizer={localizer}
        events={props.events}
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
