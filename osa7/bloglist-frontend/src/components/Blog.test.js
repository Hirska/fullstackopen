import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> test content', () => {
  let component
  const blog = {
    title: 'Test title for blog',
    author: 'Tero Teekkari',
    url: 'http://www.testthisblog.com',
    likes: 5,
    user: {
      username: 'Tero Teekkari'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders content but not extended content', () => {
    const content = component.container.querySelector('.blogContent')
    expect(content).toHaveTextContent(blog.title + ' ' + blog.author)
  })

  test('at start extended content is not displayed', () => {
    const div = component.container.querySelector('.extendedBlogContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, extended content is visible', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.extendedBlogContent')
    expect(div).not.toHaveStyle('display: none')
  })

})
describe('<Blog /> test calls', () => {
  const blog = {
    title: 'Test title for blog',
    author: 'Tero Teekkari',
    url: 'http://www.testthisblog.com',
    likes: 5,
    user: {
      username: 'Tero Teekkari'
    }
  }

  test('if like-button is clicked twice, modifyBlog is called twice', () => {
    const modifyBlog = jest.fn()
    const deleteBlog = jest.fn()

    const component = render(
      <Blog blog={blog} modifyBlog={modifyBlog} deleteBlog={deleteBlog} />
    )

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(modifyBlog.mock.calls).toHaveLength(2)
  })
})
