import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = () => {
  const match = useRouteMatch("/blogs/:id");
  const blog = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === match.params.id)
  );
  console.log(match);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(
      likeBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );
  };
  const handleDelete = () => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );

    if (result) {
      dispatch(deleteBlog(blog.id));
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blogContent">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      likes {blog.likes}
      <button onClick={handleLike}>like</button> <br />
      {blog.user.username}
      <br />
      <button onClick={handleDelete}>remove</button>
      <h3>comments</h3>
      <ul>
        {blog.comments?.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
