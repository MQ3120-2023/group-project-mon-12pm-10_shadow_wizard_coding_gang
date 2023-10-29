const ButtonBarSettings = (props) => {
    return (
        <div class="bar-box">
            <button onClick={() => props.handleButtonClick(1)}>User Settings</button>
            <button onClick={() => props.handleButtonClick(2)}>Profile</button>
            <button onClick={() => props.handleButtonClick(3)}>Security</button>
        </div>
    );
};

export default ButtonBarSettings;
