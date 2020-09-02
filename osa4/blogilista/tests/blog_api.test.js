const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    //Test user is added
    const passwordHash = await bcrypt.hash(helper.testUser.password, 10)
    const user = new User({ username: helper.testUser.username, passwordHash })
    const initialBlogsWithUser = helper.initialBlogs.map(blog => ({ ...blog, user: user._id }))

    await Blog.insertMany(initialBlogsWithUser)
    await user.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('specific blog is in returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContainEqual('Canonical string reduction')
})

test('expect id-field to be defined', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    ids.map(id => expect(id).toBeDefined())
})

test('valid blog can be added', async () => {
    const token = await helper.getToken()

    const newBlog = { title: "Testing post", author: "Tero Teekkari", url: "https://posttest.com/", likes: 5 }
    await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContainEqual(newBlog.title)
})

test('Likes are set to 0 if not given', async () => {
    const token = await helper.getToken()

    const newBlog = { title: "Testing post", author: "Tero Teekkari", url: "https://posttest.com/" }
    const result = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(result.body.likes).toBe(0)
})

test('title or url must be given', async () => {
    const token = await helper.getToken()
    const newBlogWithoutTitle = { author: "Tero Teekkari", url: "https://posttest.com/" }
    const newBlogWithoutUrl = { title: "Testing post", author: "Tero Teekkari" }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutTitle)
        .expect(400)
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutUrl)
        .expect(400)
})

test('Cant add blog if jwt not given', async () => {

    const newBlog = { title: "Testing post", author: "Tero Teekkari", url: "https://posttest.com/" }
    const result = await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog can be deleted with id', async () => {

    const token = await helper.getToken()

    const blogsAtStart = await helper.blogsInDb()
    const blogToBeDeleted = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).not.toContainEqual(blogToBeDeleted.id)
})

test('cant delete without jwt', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToBeDeleted = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToBeDeleted.id}`)
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).toContainEqual(blogToBeDeleted.id)
})

afterAll(() => {
    mongoose.connection.close()
})