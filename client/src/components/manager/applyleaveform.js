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
import appleave from "./appleave.png";
import DatePicker from "react-date-picker";
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
        .post("/getmanager", { ID: localStorage.getItem("managerID") })
        .then(res => {
          setLeaveDate({
            ...leaveDate,
            Department: res.data.Department,
            FullName: res.data.FullName
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  const [leaveDate, setLeaveDate] = useState({
    StartDate: new Date(),
    EndDate: new Date(),
    Reason: "",
    Department: "",
    ID: localStorage.getItem("managerID"),
    FullName: ""
  });
  console.log(leaveDate.FullName);
  const onClick = e => {
    e.preventDefault();
    const ms = leaveDate.StartDate.getMonth() + 1;
    const me = leaveDate.EndDate.getMonth() + 1;
    axios
      .post("/mapplyleave", {
        StartDate:
          leaveDate.StartDate.getDate() +
          "/" +
          ms +
          "/" +
          leaveDate.StartDate.getFullYear(),

        EndDate:
          leaveDate.EndDate.getDate() +
          "/" +
          ms +
          "/" +
          leaveDate.EndDate.getFullYear(),
        Reason: leaveDate.Reason,
        Department: leaveDate.Department,
        ID: localStorage.getItem("managerID"),
        FullName: leaveDate.FullName
      })
      .then(res => {
        alert("Your applications is submitted. " + leaveDate.StartDate);
        window.location.reload();
      })
      .catch(error => {
        alert("There is an error occur pleave try later.");
        window.location.reload();
      });
    props.history.push("/managerdashboard");
  };

  const sdchange = date => {
    setLeaveDate({ ...leaveDate, StartDate: new Date(date) });
  };
  const edchange = date => {
    setLeaveDate({ ...leaveDate, EndDate: new Date(date) });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          alt="addprofile"
          src={appleave}
          style={{ width: 120, height: 120 }}
        />

        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "Black",
            margin: 3,
            fontSize: 35,
            fontFamily: "Arial",
            textShadow:
              "-1px -1px 1px #aaa, 1px 5px 2px rgba(255,255,255), 5px 5px 6px rgba(255,255,250), 1px 1px 8px rgba(255,255,240)"
          }}
        >
          Apply for leave
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              Start Date
              <DatePicker onChange={sdchange} value={leaveDate.StartDate} />
            </Grid>
            <Grid item xs={12} sm={6}>
              End Date
              <DatePicker onChange={edchange} value={leaveDate.EndDate} />
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
