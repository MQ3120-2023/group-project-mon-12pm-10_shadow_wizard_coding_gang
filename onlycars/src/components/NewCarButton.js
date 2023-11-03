import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Add this line to avoid accessibility errors

const NewCarButton = ({ onClick }) => {
    return (
        <button id="new-car-button" className="new-button" onClick={onClick} >
            <DirectionsCarIcon className="new-button-icon" style={{ fontSize: 40 }} />
            New Car
        </button>
    );
};

export default NewCarButton;
