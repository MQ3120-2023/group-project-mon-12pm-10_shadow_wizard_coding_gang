const ButtonBarSettings = (props) => {
    return (
        <div className="bar-box">
            <button autoFocus className="left-button" onClick={() => props.handleButtonClick(1)}>User Settings</button>
            <button onClick={() => props.handleButtonClick(2)}>Profile</button>
            <button className="right-button" onClick={() => props.handleButtonClick(3)}>Security</button>
        </div>
    );
};

export default ButtonBarSettings;
