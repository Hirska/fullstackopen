import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
    const message = useSelector(({ notification }) => notification || null);
    let style = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };

    if (message === null) {
        return null;
    }
    return (
        <div className="error" style={style}>
            {message}
        </div>
    );
};

export default Notification;
