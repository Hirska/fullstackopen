import React, { useEffect, useRef } from "react";
import "./App.css";
import { Route, Switch, Link, Redirect } from "react-router-dom";
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
import User from "./components/User";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {user && (
        <div className="topnav">
          <Link to="/">blog</Link>
          <Link to="/users">users</Link>
          <div>
            {user.username} logged in
            <Button handleClick={handleLogout} text="logout" />
          </div>
        </div>
      )}
      <Notification />
      {user && <h2>blog app</h2>}
      <Switch>
        <Route exact path="/users">
          {user ? <Users blogs={blogs} /> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/users/:id">
          {user ? <User /> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/blogs/:id">
          {user ? <Blog /> : <Redirect to="/login"/>}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/"/> : <LoginForm login={login} />}
        </Route>
        <Route exact path="/">
          {user ? (
            <div>
              <br />
              <Togglable buttonLabel="new note" ref={blogFormRef}>
                <BlogForm createBlog={handleBlogCreation} />
              </Togglable>
              {blogs.map((blog) => (
                <div style={blogStyle} key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
