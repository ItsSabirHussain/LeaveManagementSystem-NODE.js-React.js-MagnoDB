import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none" }}>
        Agile Leave Management System{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function HR(props) {
  const classes = useStyles();
  const [HR, setHR] = useState({ ID: "", Key: "" });

  const onClick = e => {
    e.preventDefault();
    axios
      .post("/hrlogin", HR)
      .then(res => {
        localStorage.setItem("hrTokken", res.data.token);
        localStorage.setItem("hrID", HR.ID);
        console.log(res);
        props.history.push("/hrdashboard");
      })
      .catch(error => console.log(error));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          HR Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ID"
            label="ID"
            name="ID"
            autoComplete="ID"
            autoFocus
            onChange={e => setHR({ ...HR, ID: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Key"
            label="Key"
            type="Key"
            id="Key"
            autoComplete="current-Key"
            onChange={e => setHR({ ...HR, Key: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
