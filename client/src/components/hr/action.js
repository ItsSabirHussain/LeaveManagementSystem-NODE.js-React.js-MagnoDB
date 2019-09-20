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
        The website{" "}
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

export default function Action(props) {
  const classes = useStyles();
  const [leave, setLeave] = useState({
    ID: props.match.params.id,
    Reason: "",
    Status: "Rejected"
  });

  const Reject = e => {
    e.preventDefault();
    axios
      .post("/rejectleave", leave)
      .then(res => {
        console.log(res);
        props.history.push("/hrdashboard/leavereq");
      })
      .catch(error => console.log(error));
  };

  const Accept = e => {
    e.preventDefault();
    axios
      .post("/rejectleave", { ID: props.data.ID, Status: "Accept" })
      .then(res => {
        console.log(res);
        props.history.push("/hrdashboard/leavereq");
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

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h5">
                Rejecting Leave
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="reason"
                label="Rejection Reason"
                name="reason"
                autoComplete="reason"
                autoFocus
                onChange={e => setLeave({ ...leave, RReason: e.target.value })}
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={Reject}
              >
                Reject
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h5">
                Accepting Leave
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={Accept}
              >
                Accept
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
