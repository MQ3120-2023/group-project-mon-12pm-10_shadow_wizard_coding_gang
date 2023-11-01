import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const NewEventButton = () => {

    return(
        <button className="new-button"><EditCalendarIcon className="new-button-icon" style={{ fontSize: 40 }}/>New Event</button>
    )
}

export default NewEventButton