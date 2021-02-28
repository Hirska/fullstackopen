const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const verifyJwt = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    return decodedToken
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog=>blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = verifyJwt(request.token)

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0: body.likes,
        user: user._id,
        comments: []
    })
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response)=> {

    const decodedToken = verifyJwt(request.token)

    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }
    
})

blogsRouter.put('/:id', async(request, response)=> {
    const body = request.body
    if(body.likes) {
        const blog = {
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {username: 1, name: 1})
        response.json(updatedBlog.toJSON())
    } else {
        response.status(400).end()
    }
    
})

blogsRouter.post('/:id/comments', async(request, response)=> {
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    if(body.comment && blog) {
        blog.comments = blog.comments.concat(body.comment)
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(updatedBlog.toJSON())
    } else {
        response.status(400).end()
    }
    
})

module.exports = blogsRouter