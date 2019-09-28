import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import mainlogo from "../components/img/mainlogo.jpg";
import Avatar from "@material-ui/core/Avatar";

const Styles = styled.div`
  .navbar {
    background-color: #3140a0;
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand>
        {" "}
        <Avatar alt="Remy Sharp" src={mainlogo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link
              style={{
                color: "Black",
                fontSize: 25,
                fontFamily: "Arial",
                textShadow:
                  "2px 1px 1px white, 1px 1px 1px rgba(255,255,255), .5px .5px .5px rgba(255,255,250), .5px .5px .5px rgba(255,255,240)"
              }}
            >
              <Link to="/adminlogin">Admin</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item
            style={{
              color: "Black",
              fontSize: 25,
              fontFamily: "Arial",
              textShadow:
                "2px 1px 1px white, 1px 1px 1px rgba(255,255,255), .5px .5px .5px rgba(255,255,250), .5px .5px .5px rgba(255,255,240)"
            }}
          >
            <Nav.Link>
              <Link to="/hrlogin">HR</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item
            style={{
              color: "Black",
              fontSize: 25,
              fontFamily: "Arial",
              textShadow:
                "2px 1px 1px white, 1px 1px 1px rgba(255,255,255), .5px .5px .5px rgba(255,255,250), .5px .5px .5px rgba(255,255,240)"
            }}
          >
            <Nav.Link>
              <Link to="/managerlogin">Manager</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item
            style={{
              color: "Black",
              fontSize: 25,
              fontFamily: "Arial",
              textShadow:
                "2px 1px 1px white, 1px 1px 1px rgba(255,255,255), .5px .5px .5px rgba(255,255,250), .5px .5px .5px rgba(255,255,240)"
            }}
          >
            <Nav.Link>
              <Link to="/emplogin">Employee</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
