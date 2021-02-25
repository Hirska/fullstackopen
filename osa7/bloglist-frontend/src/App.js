import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { handleNotificationChange } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import Blog from "./components/Blog";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [abc, setBlogs] = useState([]);
    const blogs = useSelector(({blogs}) => blogs)

    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const login = async (loginObject) => {
        try {
            const user = await loginService.login(loginObject);
            window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            handleNotificationChange("Wrong credentials");
        }
    };
    const modifyBlog = async (blogObject) => {
        try {
            const modifiedBlog = await blogService.modify(blogObject);
            setBlogs(
                blogs
                    .map((blog) =>
                        modifiedBlog.id === blog.id
                            ? { ...blog, likes: modifiedBlog.likes }
                            : blog
                    )
                    .sort((a, b) => b.likes - a.likes)
            );
        } catch (exception) {
            handleNotificationChange("All fields must have values");
        }
    };

    const deleteBlog = async (id) => {
        try {
            await blogService.deleteBlog(id);
            setBlogs(blogs.filter((blog) => id !== blog.id));
        } catch (exception) {
            handleNotificationChange("All fields must have values");
        }
    };
    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogUser");
    };

    const handleBlogCreation = (blogObject) => {
        blogFormRef.current.toggleVisibility();
        dispatch(createBlog(blogObject))
    };

    return (
        <div>
            <Notification />
            {user === null ? (
                <div>
                    <LoginForm login={login} />
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    <div>
                        {user.username} logged in
                        <Button handleClick={handleLogout} text="logout" />
                    </div>
                    <br />
                    <Togglable buttonLabel="new note" ref={blogFormRef}>
                        <BlogForm createBlog={handleBlogCreation} />
                    </Togglable>

                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            modifyBlog={modifyBlog}
                            deleteBlog={deleteBlog}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
