import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../utils/AuthContext";

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="footer bg-dark text-light py-4 mt-4">
      <Container>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Blog App. All rights reserved.{" "}
              {user ? <p> {user} LOGGGED IN</p> : ""}
            </p>
            <br />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
