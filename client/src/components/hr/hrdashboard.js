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
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Route, Switch } from "react-router-dom";
import CEOMain from "./main";
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
import { Jumbotron } from "react-bootstrap";
import AllEmployee from "./allemp";
import LeaveReq from "./leavereq";
import { BottomNavigationAction } from "@material-ui/core";
import Action from "./action";
import logout from "./logout.jpg";
import leave from "./leave.png";
import mainlogo from "./mainlogo.jpg";

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

export default function HRDashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [ceo, setCeo] = React.useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (localStorage.getItem("hrTokken")) {
      setCeo(localStorage.getItem("hrID"));
    } else {
      props.history.push("/hrlogin");
    }
  });
  const exit = e => {
    e.preventDefault();
    localStorage.removeItem("hrTokken");
    localStorage.removeItem("hrID");
    props.history.push("/hrlogin");
  };
  const onClick = e => {
    e.preventDefault();
    localStorage.removeItem("ceoToken");
    localStorage.removeItem("ceoID");
    props.history.push("/ceologin");
  };

  return (
    <div className={classes.root}>
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
          <Link tp="/">
            {" "}
            <Avatar alt="addprofile" src={mainlogo} />
          </Link>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {""}
            HR Dashboard with Username: {" " + ceo}
          </Typography>
          <IconButton onClick={exit} color="inherit">
            <Badge color="secondary">
              <Avatar
                alt="addprofile"
                src={logout}
                className={classes.avatar}
                style={{ margin: 0, width: 120, Heigth: 80 }}
                alt="addprofile"
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
            <ListItem button component={Link} to="/hrdashboard">
              <ListItemIcon>
                <Avatar alt="addprofile" src={db} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/hrdashboard/leavereq">
              <ListItemIcon>
                <Avatar alt="addprofile" src={leave} />
              </ListItemIcon>

              <ListItemText primary="Leave Requests" />
            </ListItem>
          </div>
        </List>
        <Divider />
      </Drawer>

      <Switch>
        <Route exact path="/hrdashboard" component={AllEmployee} />
        <Route exact path="/hrdashboard/leavereq" component={LeaveReq} />
        <Route exact path="/hrdashboard/leavereq/action" component={Action} />
      </Switch>
    </div>
  );
}
