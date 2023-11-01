const ButtonBarPosts = ({ onSortChange }) => {
    return(
        <div className="bar-box">
            <button autoFocus className="left-button" onClick={() => onSortChange('latest')}>Latest Posts</button>
            <button className="right-button" onClick={() => onSortChange('popular')}>Popular Posts</button>
        </div>
    )
}

export default ButtonBarPosts;
