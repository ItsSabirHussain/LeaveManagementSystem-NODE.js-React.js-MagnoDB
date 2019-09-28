import React, { useState } from "react";
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
import validator from "validator";
import addprofile from "../../components/img/addmem.png";

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

export default function AddMember(props) {
  const classes = useStyles();
  const [memInfo, setMemInfo] = useState({
    Name: "",
    ID: "",
    OfficeID: "",
    Key: "",
    Role: "",
    Department: "",
    Email: "",
    Phone: ""
  });

  const onClick = e => {
    if (validator.isEmpty(memInfo.Name)) {
      alert("Name must required.");
    } else if (!validator.isAlpha(memInfo.Name)) {
      alert("Invalid Name");
    } else if (validator.isEmpty(memInfo.ID)) {
      alert("ID must required.");
    } else if (!validator.isAlphanumeric(memInfo.ID)) {
      alert("Invalid username.");
    } else if (validator.isEmpty(memInfo.OfficeID)) {
      alert("Office ID must required.");
    } else if (!validator.isAlphanumeric(memInfo.OfficeID)) {
      alert("Invalid office ID.");
    } else if (validator.isEmpty(memInfo.Email)) {
      alert("Email must required.");
    } else if (!validator.isEmail(memInfo.Email)) {
      alert("Invalid Email.");
    } else if (validator.isEmpty(memInfo.Phone)) {
      alert("Phone number must required.");
    } else if (!validator.isMobilePhone(memInfo.Phone)) {
      alert("Invalid phone.");
    } else if (validator.isEmpty(memInfo.Department)) {
      alert("Department must required.");
    } else if (!validator.isAlpha(memInfo.Department)) {
      alert("Invalid department.");
    } else if (validator.isEmpty(memInfo.Role)) {
      alert("Invalid phone.");
    } else if (!validator.isAlpha(memInfo.Role)) {
      alert("Invalid role.");
    } else if (validator.isEmpty(memInfo.Key)) {
      alert("Key must required.");
    } else if (!validator.isAlphanumeric(memInfo.Key)) {
      alert("Invalid key.");
    } else {
      axios
        .post("/addmember", memInfo)
        .then(res => {
          props.history.push("/admindashboard/allemp");
        })
        .catch(error => {
          alert("ID already exist.");
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <br></br>
      <br></br>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Avatar
            className={classes.avatar}
            alt="addprofile"
            src={addprofile}
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
          Add Member Details
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
                label="Name"
                autoFocus
                onChange={e => setMemInfo({ ...memInfo, Name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label="Username"
                name="ID"
                autoComplete="ID"
                onChange={e => setMemInfo({ ...memInfo, ID: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="OfficeID"
                label="Office ID"
                name="OfficeID"
                autoComplete="OfficeID"
                onChange={e =>
                  setMemInfo({ ...memInfo, OfficeID: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={e =>
                  setMemInfo({ ...memInfo, Email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                onChange={e =>
                  setMemInfo({ ...memInfo, Phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="department"
                label="Department (CS, )"
                name="department"
                autoComplete="department"
                onChange={e =>
                  setMemInfo({
                    ...memInfo,
                    Department: e.target.value.toUpperCase()
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="role"
                onChange={e => setMemInfo({ ...memInfo, Role: e.target.value })}
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
                onChange={e => setMemInfo({ ...memInfo, Key: e.target.value })}
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
            Add Member
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
