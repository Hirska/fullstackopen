import blogService from "../services/blogs";
import {handleNotificationChange} from './notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
        case "INITIALIZE_BLOGS":
            return action.data.sort((a,b) => b.likes - a.likes);
        case "ADD_BLOG":
            return state.concat(action.data);
        default:
            return state;
    }
};

export const initializeBlogs =  () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll();
            dispatch({ type: "INITIALIZE_BLOGS", data: blogs });
        } catch {
            dispatch(handleNotificationChange("Could not fetch data"));
        }

    };
};

export const createBlog = (params) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(params.blogObject);
            dispatch({ type: "ADD_BLOG", newBlog });
            params.blogFormRef.current.toggleVisibility();
        } catch (exception) {
            dispatch(handleNotificationChange("All fields must have values"));
        }
        
    };
};

export default reducer;
