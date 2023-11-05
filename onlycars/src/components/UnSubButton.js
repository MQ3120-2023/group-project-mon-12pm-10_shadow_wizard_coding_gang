import React, { useContext } from "react";
import { CurrentUserContext } from "../App";

const UnSubButton = ({ user, refetchSubs }) => {
    const { currentUser } = useContext(CurrentUserContext);

    const handleUnsubscribe = async () => {
        try {
            const response = await fetch(`http://localhost:3001/unsubscribe`, {
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
                throw new Error("Failed to unsubscribe");
            }
            // Call the refetchSubs function to update the subscription data
            refetchSubs();
        } catch (error) {
            console.error("Error during unsubscription:", error);
        }
    };

    return (
        <button autoFocus className="unsubscribe" onClick={handleUnsubscribe}>
            X
        </button>
    );
};

export default UnSubButton;
