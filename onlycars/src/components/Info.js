import { useLocation } from 'react-router-dom';
import HomeEvents from './HomeEvents';
import ProfileCars from './ProfileCars';

const Info = ({ infoType, user }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <section id="info-box">
            <p id="info-header">{infoType}</p>
            <div className="info-list">
                {currentPath === "/home" && <HomeEvents/>}
                {currentPath === "/profile" && user && <ProfileCars user={user} />}
                {currentPath === "/explore" && <p>Function 3</p>}
                {currentPath === "/subscriptions" && <p>Function 4</p>}
                {currentPath === "/settings" && <p>Function 5</p>}
            </div>
        </section>
    );
};

export default Info;