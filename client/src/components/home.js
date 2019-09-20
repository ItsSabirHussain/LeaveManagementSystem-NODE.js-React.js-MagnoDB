import React from "react";
import "./styles/home.css";
import desktopImage from "./img/homebackground.jpg";
import mobileImage from "./img/homebackground.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { NavigationBar } from "./navigationBar";
import { Jumbotron } from "./jumbotron.js";
import { Link } from "react-router-dom";
const buttonStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

const Home = () => {
  const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;
  const bStyles = buttonStyles();
  return (
    <div>
      <NavigationBar />
      <Jumbotron />
      <div
        className="App"
        style={{
          backgroundColor: "white",
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <div className="App-content">
          <h1 style={{ color: "white" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div className={bStyles.center}>
                <Link to="/emplogin">
                  <Fab
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    className={bStyles.margin}
                  >
                    <NavigationIcon className={bStyles.extendedIcon} />
                    Get Started
                  </Fab>
                </Link>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
