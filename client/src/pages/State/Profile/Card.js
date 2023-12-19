
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartArea, faChartBar, faChartLine, faFlagUsa, faFolderOpen, faGlobeEurope, faPaperclip, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';

import Profile1 from "../../../assets/img/team/profile-picture-1.jpg";

export const ProfileCardWidget = () => {
    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "image.png"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
    return (
      <Card border="light" className="text-center p-0 mb-4">
        <div className="profile-cover rounded-top" />
        <Card.Body className="pb-5">
          <Card.Img src={Profile1} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
          <Card.Title>Neil Sims</Card.Title>
          <Card.Subtitle className="fw-normal">Senior Software Engineer</Card.Subtitle>
          <Card.Text className="text-gray mb-4">New York, USA</Card.Text>
  
          <Button variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faUserPlus} className="me-1" /> Download 
          </Button>
        </Card.Body>
      </Card>
    );
  };