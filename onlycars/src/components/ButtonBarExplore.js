const ButtonBarExplore = (props) => {
    return (
        <div className="bar-box">
            <button autoFocus className="left-button" onClick={() => props.handleButtonClick(1)}>Posts</button>
            <button onClick={() => props.handleButtonClick(2)}>Users</button>
            <button onClick={() => props.handleButtonClick(3)}>Cars</button>
            <button className="right-button" onClick={() => props.handleButtonClick(4)}>Events</button>
        </div>
    );
};

export default ButtonBarExplore;
