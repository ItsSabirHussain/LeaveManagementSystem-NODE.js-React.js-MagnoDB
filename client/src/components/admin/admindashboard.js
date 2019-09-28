import React, { useEffect, Profiler } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import axios from "axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PublishIcon from "@material-ui/icons/Publish";
import EditMember from "./editMember";
import { Route, Switch } from "react-router-dom";
import UpdateProfile from "./updateprofile";
import AllEmployee from "./allemp";
import Profile from "./profile";
import AddMember from "./addmember";
import { NavigationBar } from "../../components/navigationBar";
import { Jumbotron } from "../jumbotron";
import mainlogo from "../../components/img/mainlogo.jpg";
import db from "../../components/img/dashboard.jpg";
import profile from "../../components/img/profile.png";
import updateprofile from "../../components/img/updateprofile.png";
import addprofile from "../../components/img/addprofile.png";
import logout from "../../components/img/logout.jpg";

import Avatar from "@material-ui/core/Avatar";

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
    backgroundColor: "#3f50b5",
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
    height: 1000
  }
}));

export default function AdminDashbard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [empInfo, setEmpInfo] = React.useState({
    FullName: "",
    OfficeID: "",
    ID: "",
    Key: "",
    Email: "",
    Phone: ""
  });
  useEffect(() => {
    if (localStorage.getItem("adminTokken")) {
      setEmpInfo(localStorage.getItem("adminID"));
    } else {
      props.history.push("/adminlogin");
    }
    if (empInfo.FullName === "") {
      axios
        .post("/getadmin", { ID: localStorage.getItem("adminID") })
        .then(res => {
          console.log(res);
          setEmpInfo({
            OfficeID: res.data.OfficeID,
            FullName: res.data.FullName,
            Department: res.data.Department,
            Email: res.data.Email,
            Phone: res.data.Phone
          });
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  });
  const exit = e => {
    e.preventDefault();
    localStorage.removeItem("adminTokken");
    localStorage.removeItem("adminID");
    props.history.push("/adminlogin");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {});

  const onClick = e => {
    e.preventDefault();
    localStorage.removeItem("cuserTokken");
    localStorage.removeItem("cuserID");
    props.history.push("/cuserlogin");
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Avatar alt="Remy Sharp" src={mainlogo} />
            {""}
            {"   "}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {" "}
              {"Admin Dashboard with ID "}
            </Typography>
            <IconButton onClick={exit} color="inherit">
              <Badge color="secondary">
                <Avatar
                  className={classes.avatar}
                  style={{ margin: 0, width: 120, Heigth: 80 }}
                  alt="addprofile"
                  src={logout}
                />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List style={{ backgroundColor: "#9eba0", height: "200%" }}>
            <div>
              <ListItem button component={Link} to="/admindashboard/allemp">
                <ListItemIcon>
                  <Avatar alt="db" src={db} />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/admindashboard/profile">
                <ListItemIcon>
                  <Avatar alt="profile" src={profile} />
                </ListItemIcon>

                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admindashboard/updateprofile"
              >
                <ListItemIcon>
                  <Avatar alt="profile" src={updateprofile} />
                </ListItemIcon>
                <ListItemText primary="UpdateProfile" />
              </ListItem>
              <ListItem button component={Link} to="/admindashboard/addmember">
                <ListItemIcon>
                  <Avatar alt="addprofile" src={addprofile} />
                </ListItemIcon>
                <ListItemText primary="Add Member" />
              </ListItem>
            </div>
          </List>
          <Divider />
        </Drawer>

        <Switch>
          <Route exact path="/admindashboard" component={AllEmployee} />
          <Route
            exact
            path="/admindashboard/updateprofile"
            component={UpdateProfile}
          />

          <Route exact path="/admindashboard/allemp" component={AllEmployee} />
          <Route exact path="/admindashboard/profile" component={Profile} />
          <Route exact path="/admindashboard/addmember" component={AddMember} />
          <Route
            exact
            path="/admindashboard/allemp/edit"
            component={EditMember}
          />
        </Switch>
      </div>
    </div>
  );
}
