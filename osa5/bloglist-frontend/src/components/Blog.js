import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, modifyBlog, deleteBlog }) => {
  const [view, setView] = useState()

  const toggleView = () => {
    setView(!view)
  }
  const handleLike = () => {
    modifyBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }
  const handleDelete = () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if(result) {
      deleteBlog(blog.id)
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
    <div style={blogStyle}>
      {!view ?
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleView}>view</button>
        </div> :
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleView}>close</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLike}>like</button>
          <br/>
          {blog.user.username}
          <br/>
          <button onClick={handleDelete}>remove</button>
        </div>
      }

    </div>


  )
}

Blog.propTypes = {
  deleteBlog: PropTypes.func.isRequired,
  modifyBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
