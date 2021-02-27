import React from "react";
import styles from "./Users.module.css";
import { useRouteMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
  const id = useRouteMatch("/users/:id");
  const users = useSelector(({ users }) => users);
  return (
    <div>
      <span className={styles.blogTitle}>blogs created</span>
      <ul className={styles.container}>
        {users?.map((user) => (
          
            <li className={styles.list} key={user.username}>
              <Link to={`/users/${user.id}`}>
                <span className={styles.username}>{user?.username}</span>
              </Link>
              <span className={styles.username}>{user?.blogs?.length}</span>
            </li>

        ))}
      </ul>
    </div>
  );
};

export default Users;
