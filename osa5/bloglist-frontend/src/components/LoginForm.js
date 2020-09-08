import React, { useState } from 'react'

const LoginForm = ({ login }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username, password
    })
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            className='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            className = 'password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm