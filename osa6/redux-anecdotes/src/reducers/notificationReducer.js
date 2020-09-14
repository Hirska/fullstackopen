
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      
      if(state !== null && state.timeout !== null) {
        clearTimeout(state.timeout)
      }

      return {notification: action.notification, timeout: action.timeout}
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const addNotification = (content, time) => {
  return async (dispatch) => {
    let addTimeout = setTimeout(() => {
      dispatch(resetNotification())
    }, time*1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification: content,
      timeout: addTimeout
    })
    
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer