import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../components/img/login2.jpg";
import validator from "validator";
import { NavigationBar } from "./navigationBar";
import { Jumbotron } from "./jumbotron";

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
    body: {}
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    width: 100,
    height: 100
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Manager(props) {
  const classes = useStyles();
  const [managerInfo, setManagerInfo] = useState({ ID: "", Key: "" });

  const onClick = e => {
    e.preventDefault();
    if (validator.isEmpty(managerInfo.ID)) {
      alert("Username must required.");
    } else if (!validator.isAlphanumeric(managerInfo.ID)) {
      alert("Invalid username.");
    } else if (validator.isEmpty(managerInfo.Key)) {
      alert("Password must required.");
    } else if (!validator.isAlphanumeric(managerInfo.Key)) {
      alert("Invalid password");
    } else {
      axios
        .post("/managerlogin", managerInfo)
        .then(res => {
          localStorage.setItem("managerTokken", res.data.token);
          localStorage.setItem("managerID", managerInfo.ID);
          console.log(res);
          props.history.push("/managerdashboard");
        })
        .catch(error => {
          console.log(error);
          alert("Authentication failed.");
        });
    }
  };

  return (
    <div>
      <NavigationBar />
      <Jumbotron />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar alt="Remy Sharp" src={logo} className={classes.avatar} />
          <Typography
            component="h1"
            style={{
              color: "Black",
              fontSize: 35,
              fontFamily: "Arial",
              textShadow:
                "-1px -1px 1px #aaa, 1px 5px 2px rgba(255,255,255), 5px 5px 6px rgba(255,255,250), 1px 1px 8px rgba(255,255,240)"
            }}
          >
            Manager Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ID"
              label="Username"
              name="ID"
              autoComplete="ID"
              autoFocus
              onChange={e =>
                setManagerInfo({ ...managerInfo, ID: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Key"
              label="Password"
              type="Key"
              id="Key"
              autoComplete="current-Key"
              onChange={e =>
                setManagerInfo({ ...managerInfo, Key: e.target.value })
              }
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
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
