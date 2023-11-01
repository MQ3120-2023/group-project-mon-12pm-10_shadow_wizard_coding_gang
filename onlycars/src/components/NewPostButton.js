import PostAddIcon from '@mui/icons-material/PostAdd';

const NewPostButton = () => {

    return(
        <button className="new-button"><PostAddIcon className="new-button-icon" style={{ fontSize: 40 }}/>New Post</button>
    )
}

export default NewPostButton