const { func } = require("prop-types")

describe('Blog app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tero Teekkari',
      username: 'tteekkari',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('input.username')
    cy.get('input.password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input.username').type('tteekkari')
      cy.get('input.password').type('salainen')

      cy.contains('login').click()

      cy.contains('blogs')
      cy.contains('tteekkari logged in')

      cy.contains('new note')
    })

    it('fails with wrong credentials', function () {
      cy.get('input.username').type('notactualuser')
      cy.get('input.password').type('notcorrectpassword')

      cy.contains('login').click()

      cy.get('.error').contains('Wrong credentials')
      cy.contains('log in to application')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tteekkari', password: 'salainen' })
    })
    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#author').type('test author')
      cy.get('#title').type('Title for this test blog')
      cy.get('#url').type('http:://www.testblog.com')

      cy.contains('create').click()
      cy.get('.blogContent')
        .contains('Title for this test blog test author')
        .contains('view')

    })
    describe('after blog is created', function () {
      beforeEach(function () {
        cy.addBlog({ title: 'Title for this test blog', author: 'test author', url: 'http:://www.testblog.com' })
      })
      it('Blog can be liked', function () {
        cy.get('.blogContent').contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')

      })
      it('blog can be deleted by creator', function() {
        cy.get('.blogContent').contains('view').click()
        cy.contains('remove').click().should('not.exist')

        cy.get('.blogContent').should('not.exist')
      })
      it('blog cannot be deleted by user which is not creator', function (){
        const user = {
          name: 'Not creater',
          username: 'notcreator',
          password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)

        cy.login({ username: user.username, password: user.password })
        cy.contains('view').click()
        cy.contains('remove').click().should('exist')
        cy.get('.error').contains('All fields must have values')
      })
      describe('after another blog is created', function () {
        beforeEach(function () {
          cy.addBlog({ title: 'Second blog', author: 'author for second', url: 'http:://www.second.com', likes: 1 })
          cy.addBlog({ title: 'Third blog', author: 'author for third', url: 'http:://www.third.com', likes: 2 })
        })
        it.only('blogs must be ordered correctly based on likes', function() {
          cy.get('.blogContent').each(($el, index) => {cy.get($el).contains(`likes ${2-index}`)})
        })
      })
    })

  })

})