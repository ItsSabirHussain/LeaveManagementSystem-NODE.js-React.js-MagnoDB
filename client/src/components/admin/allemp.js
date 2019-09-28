import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import allmem from "../../components/img/allmem.png";
import Avatar from "@material-ui/core/Avatar";

import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Agile Leave Management</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(0, 0, 0)
  },
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
    display: "fixed",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function AllEmployee(props) {
  function allEmpList(props) {
    return props.map(function(cdata, i) {
      return <Data data={cdata} key={i} />;
    });
  }
  const Data = p => (
    <tr>
      <td>{p.data.Name}</td>
      <td>{p.data.ID}</td>
      <td>{p.data.OfficeID}</td>
      <td>{p.data.Email}</td>
      <td>{p.data.Phone}</td>
      <td>{p.data.Department}</td>
      <td>{p.data.Role}</td>

      <td>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          name={p.data.ID}
          className={classes.submit}
          onClick={e => {
            localStorage.setItem("editID", p.data.ID);
            props.history.push("/admindashboard/allemp/edit");
          }}
        >
          Updates
        </Button>
      </td>
    </tr>
  );

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
                {" "}
                <h3
                  style={{
                    color: "Black",
                    margin: 3,
                    fontSize: 35,
                    fontFamily: "Arial",
                    textShadow:
                      "-1px -1px 1px #aaa, 1px 5px 2px rgba(255,255,255), 5px 5px 6px rgba(255,255,250), 1px 1px 8px rgba(255,255,240)"
                  }}
                >
                  {" "}
                  Agile Leave Management System
                </h3>
                <table
                  className="table table-striped"
                  style={{
                    marginTop: 20,
                    border: "1px solid black",
                    color: "Black",
                    margin: 3,
                    fontSize: 15,
                    fontFamily: "Arial",
                    tableLayout: "relative",
                    width: "100%"
                  }}
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{allEmpList(allemp)}</tbody>
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
