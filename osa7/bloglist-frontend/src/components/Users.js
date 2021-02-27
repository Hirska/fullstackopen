import React from "react";
import styles from './Users.module.css'

import { useSelector } from "react-redux";
const Users = () => {
  const users = useSelector(({ users }) => users);
  return (
    <div>
      <span className={styles.blogTitle}>blogs created</span>
      <ul className={styles.container}>
        {users?.map((user) => (
          <li className={styles.list} key={user.username}>
                <span className={styles.username}>{user?.username}</span>
                <span className={styles.username}>
                  {user?.blogs}
                </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
