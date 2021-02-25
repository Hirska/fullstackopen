const reducer = (state = null, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.data;
        default:
            return state;
    }
};

export const setNotification = (data) => {
    console.log(data);
    return async (dispatch) => {
        dispatch({ type: "SET_NOTIFICATION", data });
    };
};

export const handleNotificationChange = (message) => {
    return async (dispatch) => {
        dispatch(setNotification(message));
        setTimeout(() => {
            dispatch(setNotification(null));
        }, 2000);
    };
};

export default reducer;
