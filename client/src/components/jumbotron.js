import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import boatImage from "./img/jumbotrone.jpg";
import "./styles/jumbotrone.css";

const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: black;
    opacity: 0.2;
    position: absolute;
    top: -1%;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ;
  }
`;

export const Jumbotron = props => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1
          style={{
            color: "Black",
            fontSize: 50,
            fontWeight: "bold",
            fontFamily: "Times New Roman",
            fontStyle: "italic",
            textShadow:
              "2px 2px 4px #aaa, 6px 5px 2px rgba(255,255,255), 5px 5px 6px rgba(255,255,250), 3px 3px 8px rgba(255,255,240)"
          }}
          className="display-4"
        >
          Agile Leave Management System
        </h1>
        <p style={{ color: "black", fontWeight: "900" }}></p>
      </Container>
    </Jumbo>
  </Styles>
);
