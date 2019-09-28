import React, { useEffect } from "react";
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
import { Button } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Route, Switch } from "react-router-dom";
import Main from "./main";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PolicyIcon from "@material-ui/icons/Policy";
import PeopleIcon from "@material-ui/icons/People";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import MenuItem from "@material-ui/core/MenuItem";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import Notifications from "./notification";
import ApplyLeave from "./applyleave";

import AllDepLeaves from "./alldepleaves";

import logout from "./logout.jpg";
import mainlogo from "./mainlogo.jpg";

import leave from "./leave.png";
import noti from "./noti.jpg";

import db from "./dashboard.jpg";

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
    backgroundColor: "#3f50b5",

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

export default function EmployeeDashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const exit = e => {
    e.preventDefault();
    localStorage.removeItem("empTokken");
    localStorage.removeItem("empID");
    props.history.push("/emplogin");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
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
          <Avatar alt="addprofile" src={mainlogo} />

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {"Employee dashboard"}
          </Typography>
          <IconButton onClick={exit} color="inherit">
            <Badge color="secondary">
              <Avatar
                alt="addprofile"
                src={logout}
                className={classes.avatar}
                style={{ margin: 0, width: 120, Heigth: 80 }}
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
        <List>
          <div>
            <ListItem button component={Link} to="/empdashboard">
              <ListItemIcon>
                <Avatar alt="addprofile" src={db} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/empdashboard/appleave">
              <ListItemIcon>
                <Avatar alt="addprofile" src={leave} />
              </ListItemIcon>

              <ListItemText primary="Apply Leave" />
            </ListItem>
            <ListItem button component={Link} to="/empdashboard/notification">
              <ListItemIcon>
                <Avatar alt="addprofile" src={noti} />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItem>
            <ListItem button component={Link} to="/empdashboard/alldepleaves">
              <ListItemIcon>
                <Avatar alt="addprofile" src={leave} />
              </ListItemIcon>
              <ListItemText primary="All Dept. Leaves" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>
      <Switch>
        <Route exact path="/empdashboard" component={Main} />
        <Route exact path="/empdashboard/appleave" component={ApplyLeave} />
        <Route
          exact
          path="/empdashboard/notification"
          component={Notifications}
        />
        <Route
          exact
          path="/empdashboard/alldepleaves"
          component={AllDepLeaves}
        />
      </Switch>
    </div>
  );
}
