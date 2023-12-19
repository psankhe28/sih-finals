import React from "react";
import styled from 'styled-components';
import moment from "moment-timezone";
import { Row, Col } from '@themesberg/react-bootstrap';

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 30;
  width: 100%;
`;

export default (props) => {
  const currentYear = moment().get("year");

  return (
    <FooterWrapper>
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © {currentYear}
            </p>
          </Col>
        </Row>
    </FooterWrapper>
  );
};
