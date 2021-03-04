import React, { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setUrl("");
    setAuthor("");
  };
  return (
    <Grid direction="column">
      <form onSubmit={handleCreate}>
        <Grid item>
          <TextField
            type="text"
            value={title}
            name="Title"
            id="title"
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            value={author}
            name="Author"
            id="author"
            label="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="text"
            value={url}
            name="Url"
            id="url"
            label="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Grid>

        <Button variant='contained' color='primary' type="submit">create</Button>
      </form>
    </Grid>
  );
};

export default BlogForm;
