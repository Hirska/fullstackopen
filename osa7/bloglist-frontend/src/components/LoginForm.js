import React, { useState } from "react";
import { TextField, Grid, Button, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  signinButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({ login }) => {
  const styles = useStyles()
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });
    setPassword("");
    setUsername("");
  };

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleLogin}>
          <TextField
            type="text"
            value={username}
            name="Username"
            className="username"
            label="Username"
            fullWidth
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            type="password"
            value={password}
            name="Password"
            className="password"
            label="Password"
            fullWidth
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button className={styles.signinButton} fullWidth variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default LoginForm;
