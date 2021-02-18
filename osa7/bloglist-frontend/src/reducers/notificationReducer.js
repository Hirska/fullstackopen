const reducer = (state = null, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data;
        default:
            return state;
    }
};

export const setNotification = data => {
    console.log(data)
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', data})
    }
}

export default reducer;
