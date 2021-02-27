import usersService from '../services/users.js'

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.data;
    default:
      return state;
  }
};


export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const users = await usersService.getUsers();
            dispatch({type: 'SET_USERS', data: users.map(user  => {return  {...user, blogs : user.blogs.length} } )})
        } catch {
            console.log('testi')
        }
    };
};

export default reducer;
