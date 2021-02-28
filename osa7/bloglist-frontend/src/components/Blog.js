import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer";

const Blog = () => {
  const match = useRouteMatch("/blogs/:id");
  const blog = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === match.params.id)
  );
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(comment === "") {
      return;
    }
    dispatch(addComment(blog?.id, comment))
    setComment('')
  }
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          name="Comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">
          add comment
        </button>
      </form>
      <ul>
        {blog.comments?.map((comment) => (
          <li key={comment?.id}>{comment?.title}</li>
        ))}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
