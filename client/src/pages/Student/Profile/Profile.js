import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ProfileCardWidget } from "./Card";
import { StudentForm } from "./Form";
import Profile3 from "../../../assets/img/team/profile-picture-3.jpg";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({token}) => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
      </div>

      <Row>
        <Col xs={12} xl={8}>
          <StudentForm token={token} />
        </Col>
      </Row>
    </>
  );
};