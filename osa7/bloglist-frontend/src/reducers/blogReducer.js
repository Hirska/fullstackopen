import blogService from "../services/blogs";
import {handleNotificationChange} from './notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
        case "INITIALIZE_BLOGS":
            return action.data.sort((a,b) => b.likes - a.likes);
        case "ADD_BLOG":
            return state.concat(action.data);
        case "LIKE_BLOG":
            return state.map((blog) => action.data.id === blog.id
                    ? action.data
                    : blog).sort((a, b) => b.likes - a.likes);
        case "ADD_COMMENT":
            return state.map((blog) => action.data.id === blog.id ? action.data : blog)
        case "DELETE_BLOG":
            return state.filter((blog) => action.id !== blog.id)
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

export const createBlog = (blogObject) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blogObject);
            dispatch({ type: "ADD_BLOG", data: newBlog });
        } catch (exception) {
            dispatch(handleNotificationChange("All fields must have values"));
        }
        
    };
};

export const likeBlog = (blogObject) => {
    return async (dispatch) => {
            try {
                const modifiedBlog = await blogService.modify(blogObject);
                dispatch({type: 'LIKE_BLOG', data: modifiedBlog})
            } catch (exception) {
                handleNotificationChange("All fields must have values");
            }
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            await blogService.deleteBlog(id);
            dispatch({type: 'DELETE_BLOG', id});
        } catch (exception) {
            handleNotificationChange("All fields must have values");
        }
    };
};

export const addComment = (id, comment) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.addComment(id, comment);
            dispatch({type: 'ADD_COMMENT', data: updatedBlog});
        } catch (exception) {
            handleNotificationChange("All fields must have values");
        }
    };
};

export default reducer;
