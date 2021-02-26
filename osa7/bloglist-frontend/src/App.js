import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleNotificationChange } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

import Blog from "./components/Blog";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const blogs = useSelector(({ blogs }) => blogs);
    const user = useSelector(({ user }) => user);

    const blogFormRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, []);

    const login = async (loginObject) => {
        try {
            const user = await loginService.login(loginObject);
            window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(setUser(user));
        } catch (exception) {
            handleNotificationChange("Wrong credentials");
        }
    };

    const handleLogout = () => {
        dispatch(setUser(null));
        window.localStorage.removeItem("loggedBlogUser");
    };

    const handleBlogCreation = (blogObject) => {
        blogFormRef.current.toggleVisibility();
        dispatch(createBlog(blogObject));
    };

    return (
        <div>
            <Notification />
            { user &&
                <>
                    <h2>blogs</h2>
                    <div>
                        {user.username} logged in
                        <br/>
                        <Button handleClick={handleLogout} text="logout" />
                    </div>
                </>
            }
            <Switch>
                <Route exact path="/users">
                    <Users blogs = {blogs}/>
                </Route>
                <Route exact path="/">
                    {user === null ? (
                        <LoginForm login={login} />
                    ) : (
                        <div>
                            <br />
                            <Togglable buttonLabel="new note" ref={blogFormRef}>
                                <BlogForm createBlog={handleBlogCreation} />
                            </Togglable>
                            {blogs.map((blog) => (
                                <Blog key={blog.id} blog={blog} />
                            ))}
                        </div>
                    )}
                </Route>
            </Switch>
        </div>
    );
};

export default App;
