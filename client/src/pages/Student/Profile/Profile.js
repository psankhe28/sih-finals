import React from "react";
import { Col, Row } from '@themesberg/react-bootstrap';
import { StudentForm } from "./Form";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({token}) => {
  console.log(token)
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
      </div>

      <Row>
        <Col xs={12} xl={12}>
          <StudentForm token={token} />
        </Col>
      </Row>
    </>
  );
};