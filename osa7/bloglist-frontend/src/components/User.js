import React from "react";
import { useRouteMatch } from "react-router-dom";
import {useSelector} from 'react-redux'

const User = () => {
  const match = useRouteMatch("/users/:id");
  const user = useSelector(({users}) => users?.find(user => user.id === match.params.id))
  if(!user) {
    return null
  }
  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs?.map(blog => <li>{blog.title}</li>)}
      </ul>
    </div>
  );
};

export default User;