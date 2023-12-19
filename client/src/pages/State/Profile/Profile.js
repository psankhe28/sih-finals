import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { StateForm } from "./Form";

const StateProfile = ({ token }) => {

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <StateForm token={token} />
        </Col>
      </Row>
    </>
  );
};
export default StateProfile