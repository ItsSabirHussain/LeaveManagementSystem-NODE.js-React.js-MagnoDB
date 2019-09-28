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
import uppro from "../../components/img/updateprofile.png";
import validator from "validator";

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
    width: 120,
    height: 120,
    margin: theme.spacing(1)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function UpdateProfile(props) {
  const classes = useStyles();

  const onClick = e => {
    localStorage.setItem("adminID", adminInfo.ID);
    if (validator.isEmpty(adminInfo.FullName)) {
      alert("Name must required.");
    } else if (!validator.isAlpha(adminInfo.FullName)) {
      alert("Invalid Name");
    } else if (validator.isEmpty(adminInfo.ID)) {
      alert("ID must required.");
    } else if (!validator.isAlphanumeric(adminInfo.ID)) {
      alert("Invalid username.");
    } else if (validator.isEmpty(adminInfo.OfficeID)) {
      alert("Office ID must required.");
    } else if (!validator.isAlphanumeric(adminInfo.OfficeID)) {
      alert("Invalid office ID.");
    } else if (validator.isEmpty(adminInfo.Email)) {
      alert("Email must required.");
    } else if (!validator.isEmail(adminInfo.OfficeID)) {
      alert("Invalid Email.");
    } else if (validator.isEmpty(adminInfo.Phone)) {
      alert("Phone number must required.");
    } else if (!validator.isMobilePhone(adminInfo.Phone)) {
      alert("Invalid phone.");
    } else if (validator.isEmpty(adminInfo.Key)) {
      alert("Key must required.");
    } else if (!validator.isAlphanumeric(adminInfo.Key)) {
      alert("Invalid key.");
    } else {
      axios
        .post("/updateprofile", adminInfo)
        .then(res => {
          props.history.push("/admindashboard/profile");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const [adminInfo, setAdminInfo] = React.useState({
    FullName: "",
    OfficeID: "",
    ID: "",
    Email: "",
    Key: "",
    Phone: "",
    IDD: ""
  });
  useEffect(() => {
    if (localStorage.getItem("adminTokken")) {
    } else {
      props.history.push("/emplogin");
    }
    if (adminInfo.FullName === "") {
      axios
        .post("/getadmin", { ID: localStorage.getItem("adminID") })
        .then(res => {
          console.log(res);
          setAdminInfo({
            OfficeID: res.data.OfficeID,
            FullName: res.data.Name,
            ID: res.data.ID,
            Email: res.data.Email,
            Phone: res.data.Phone,
            IDD: localStorage.getItem("adminID")
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <br></br>
        <br></br>
        <Avatar className={classes.avatar}>
          <Avatar
            style={{ width: 120, height: 120 }}
            alt="Remy Sharp"
            src={uppro}
          />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "Black",
            fontSize: 35,
            fontFamily: "Arial",
            textShadow:
              "-1px -1px 1px #aaa, 1px 5px 2px rgba(255,255,255), 5px 5px 6px rgba(255,255,250), 1px 1px 8px rgba(255,255,240)"
          }}
        >
          Update Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label={"Name: " + adminInfo.FullName}
                autoFocus
                onChange={e =>
                  setAdminInfo({ ...adminInfo, FullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label={"Username: " + adminInfo.ID}
                name="ID"
                autoComplete="ID"
                onChange={e =>
                  setAdminInfo({ ...adminInfo, ID: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="OfficeID"
                label={"Office ID: " + adminInfo.OfficeID}
                name="OfficeID"
                autoComplete="OfficeID"
                onChange={e =>
                  setAdminInfo({ ...adminInfo, OfficeID: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={"Email: " + adminInfo.Email}
                name="email"
                autoComplete="email"
                onChange={e =>
                  setAdminInfo({ ...adminInfo, Email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label={"Phone: " + adminInfo.Phone}
                name="phone"
                autoComplete="phone"
                onChange={e =>
                  setAdminInfo({ ...adminInfo, Phone: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Key"
                label="Password"
                type="password"
                id="Key"
                autoComplete="current-Key"
                onChange={e =>
                  setAdminInfo({ ...adminInfo, Key: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Update Profile
          </Button>
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
