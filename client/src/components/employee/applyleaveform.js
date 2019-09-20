import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/promandashboard" style={{ textDecoration: "none" }}>
        Dashboard{" "}
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function ApplyLeaveForm(props) {
  const classes = useStyles();

  useEffect(() => {
    if (leaveDate.FullName === "") {
      axios
        .post("/getemp", { ID: localStorage.getItem("empID") })
        .then(res => {
          setLeaveDate({
            ...leaveDate,
            Department: res.data.Department,
            FullName: res.data.Department
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  const [leaveDate, setLeaveDate] = useState({
    StartDate: "",
    EndDate: "",
    Reason: "",
    Department: "",
    ID: localStorage.getItem("empID"),
    FullName: ""
  });
  console.log(leaveDate.FullName);
  const onClick = e => {
    e.preventDefault();
    axios
      .post("/eapplyleave", leaveDate)
      .then(res => {
        alert("Done");

        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Apply for leave
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="sdata"
                variant="outlined"
                required
                fullWidth
                id="sdate"
                label="Leave Start Date"
                autoFocus
                onChange={e =>
                  setLeaveDate({ ...leaveDate, StartDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="edate"
                label="Leave End Date"
                name="ID"
                autoComplete="edate"
                onChange={e =>
                  setLeaveDate({ ...leaveDate, EndDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reason"
                label="Reason"
                name="reason"
                autoComplete="reason"
                onChange={e =>
                  setLeaveDate({ ...leaveDate, Reason: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClick}
            >
              Apply
            </Button>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
