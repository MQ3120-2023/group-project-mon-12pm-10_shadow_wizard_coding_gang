import React from "react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

const NewEventButton = ({ onClick }) => {
    return (
        <button className="new-button" onClick={onClick}>
            <EditCalendarIcon
                className="new-button-icon"
                style={{ fontSize: 40 }}
            />
            New Event
        </button>
    );
};

export default NewEventButton;
