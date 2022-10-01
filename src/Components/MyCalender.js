import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/calender.css'
import { useState } from 'react';
import events from './events';
const localizer = momentLocalizer(moment)




function MyCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
  };
    return (
      <div>
   <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // views={['week']}
        defaultView={'week'}
        onSelectSlot={handleSelect}
      />
      </div>
     
    )
  }
export default MyCalendar
