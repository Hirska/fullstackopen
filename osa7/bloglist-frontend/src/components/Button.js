import React from 'react'
import { Button } from '@material-ui/core'
const Button = ({ handleClick, text }) => (
  <Button onClick={handleClick}>
    {text}
  </Button>
)

export default Button