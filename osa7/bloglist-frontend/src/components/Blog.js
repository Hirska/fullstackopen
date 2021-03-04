import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Grid,
} from "@material-ui/core";
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
    if (comment === "") {
      return;
    }
    dispatch(addComment(blog?.id, comment));
    setComment("");
  };
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
    <Card className="blogContent">
      <CardHeader title={`${blog.title} ${blog.author}`} />
      <CardContent>
        <Grid direction="column">
          <Grid item>
            URL: <a href={blog.url}>{blog.url}</a>
          </Grid>
          <Grid item>
            Liked by {blog.likes}
            <Button onClick={handleLike}>like</Button>
          </Grid>
          <Grid item>Added by {blog.user.username}</Grid>
          <Grid item>
            <Button onClick={handleDelete}>remove</Button>
          </Grid>

          <h3>comments</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              value={comment}
              name="Comment"
              id="comment"
              onChange={({ target }) => setComment(target.value)}
            />
            <Button variant="contained" type="submit" color="primary">
              add comment
            </Button>
          </form>
          <ul>
            {blog.comments?.map((comment) => (
              <li key={comment?.id}>{comment?.title}</li>
            ))}
          </ul>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
