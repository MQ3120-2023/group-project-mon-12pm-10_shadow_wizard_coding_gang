import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../App";

const SubButton = ({ user }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        // Check if the currentUser is already subscribed to the user
        const checkSubscription = user?.subscribers?.includes(
            currentUser?.userId
        );
        setIsSubscribed(checkSubscription);
    }, [user, currentUser]);

    const handleSubscribe = async () => {
        const action = isSubscribed ? "unsubscribe" : "subscribe";
        try {
            const response = await fetch(`http://localhost:3001/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser?.userId,
                    subscribeToUserId: user?.userId,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update subscription status");
            }
            setIsSubscribed(!isSubscribed);
        } catch (error) {
            console.error("Error updating subscription status:", error);
            console.log(error);
        }
    };

    return (
        <div>
            <button
                autoFocus
                className={isSubscribed ? "subscribed" : "subscribe"}
                onClick={handleSubscribe}
            >
                {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
        </div>
    );
};

export default SubButton;
