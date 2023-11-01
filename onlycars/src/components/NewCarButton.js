import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const NewCarButton = () => {

    return(
        <button id="new-car-button" className="new-button"><DirectionsCarIcon className="new-button-icon" style={{ fontSize: 40 }}/>New Car</button>
    )
}

export default NewCarButton