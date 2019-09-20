import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Agile Leave Management System</Link>
      {""}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const drawerWidth = 240;

function notificationsList(props) {
  return props.map(function(cdata, i) {
    return <Data data={cdata} key={i} />;
  });
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const Data = props => (
  <tr>
    <td className={"completed"}>{props.data.Name}</td>
    <td className={"completed"}>{props.data.ID}</td>
    <td className={"completed"}>{props.data.OfficeID}</td>
    <td className={"completed"}>{props.data.Email}</td>
    <td className={"completed"}>{props.data.Phone}</td>
    <td className={"completed"}>{props.data.Department}</td>
    <td className={"completed"}>{props.data.Role}</td>
  </tr>
);

export default function AllEmployee(props) {
  const [allemp, setAllemp] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (allemp.length < 1) {
      axios
        .post("/getallemp", {})
        .then(res => {
          console.log(res);
          setAllemp(res.data);
        })
        .catch(error => console.log(error));
    }
  });
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Container component="main" className={classes.main} maxWidth="sm">
              <div>
                <h3>All Employee</h3>
                <table
                  className="table table-striped"
                  style={{ marginTop: 20 }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>OfficeID</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>{notificationsList(allemp)}</tbody>
                </table>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </main>
  );
}
