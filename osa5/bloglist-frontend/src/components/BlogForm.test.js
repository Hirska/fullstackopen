import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(url, {
    target: { value: 'https://www.testingurl.com' }
  })
  fireEvent.change(title, {
    target: { value: 'Title of this test' }
  })
  fireEvent.change(author, {
    target: { value: 'Tero Teekkari' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.testingurl.com')
  expect(createBlog.mock.calls[0][0].author).toBe('Tero Teekkari')
  expect(createBlog.mock.calls[0][0].title).toBe('Title of this test')
})