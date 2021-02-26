import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useDispatch} from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const dispatch = useDispatch();

  const showWhenViewed = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }
  const handleLike = () => {
    dispatch(likeBlog({
      ...blog,
      likes: blog.likes + 1
    }));
  }
  const handleDelete = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (result) {
      dispatch(deleteBlog(blog.id))
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blogContent">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{view ? 'close' : 'view'}</button>
        <div style={showWhenViewed} className='extendedBlogContent'>
          {blog.url}<br />
          likes {blog.likes}
          <button onClick={handleLike}>like</button> <br />
          {blog.user.username}<br />
          <button onClick={handleDelete}>remove</button>
        </div>
      </div>



    </div>


  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
