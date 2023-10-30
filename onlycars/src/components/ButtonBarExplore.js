const ButtonBarExplore = (props) => {
    return (
        <div className="bar-box">
            <button className="left-button" onClick={() => props.handleButtonClick(1)}>Posts</button>
            <button onClick={() => props.handleButtonClick(2)}>Users</button>
            <button className="right-button" onClick={() => props.handleButtonClick(3)}>Cars</button>
        </div>
    );
};

export default ButtonBarExplore;
