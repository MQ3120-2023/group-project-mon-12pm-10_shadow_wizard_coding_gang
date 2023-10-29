import { useLocation } from 'react-router-dom';

const Info = ({ infoType }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <section id="info-box">
            <p id="info-header">{infoType}</p>
            <div id="info-list">
                {currentPath === "/home" && <p>Function 1</p>}
                {currentPath === "/profile" && <p>Function 2</p>}
                {currentPath === "/explore" && <p>Function 3</p>}
                {currentPath === "/subscriptions" && <p>Function 4</p>}
                {currentPath === "/settings" && <p>Function 5</p>}
            </div>
        </section>
    );
};

export default Info;