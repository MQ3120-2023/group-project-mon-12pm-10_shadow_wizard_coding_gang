const ButtonBarPosts = (props) => {
    return(
        <div className="bar-box">
            <button autoFocus className="left-button" onClick={() => props.handleButtonClick(1)}>Latest Posts</button>
            <button className="right-button" onClick={() => props.handleButtonClick(2)}>Popular Posts</button>
        </div>
    )
}

export default ButtonBarPosts;
