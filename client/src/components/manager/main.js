import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Agile Leave Management Sysatem</Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

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

export default function Main(props) {
  const classes = useStyles();
  const [manInfo, setManInfo] = React.useState({
    ID: "",
    FullName: "",
    OfficeID: "",
    Department: "",
    AvailLeave: "",
    LeftOver: ""
  });

  useEffect(() => {
    if (manInfo.FullName === "") {
      axios
        .post("/getmanager", { ID: localStorage.getItem("managerID") })
        .then(res => {
          console.log(res.data);
          setManInfo({
            ...manInfo,
            OfficeID: res.data.OfficeID,
            FullName: res.data.FullName,
            Department: res.data.Department,
            AvailLeave: res.data.AvailLeave,
            LeftOver: res.data.LeftOver
          });
        })
        .catch(error => console.log(error));
    }
  });
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* User Details */}
          <Grid item xs={12} md={8} lg={9}>
            <Jumbotron>
              <h1 className="display-6">{"Name: " + manInfo.FullName}</h1>
              <p className="lead">Office ID: {manInfo.OfficeID}</p>
              <p className="lead">Department: {manInfo.Department}</p>
              <p className="lead">Available Leaves: {manInfo.AvailLeave}</p>
              <p className="lead">Left Over Leaves: {manInfo.LeftOver}</p>

              <hr className="my-2" />
              <p></p>
              <p className="lead"></p>
            </Jumbotron>
          </Grid>
        </Grid>
      </Container>
      <Copyright />
    </main>
  );
}
