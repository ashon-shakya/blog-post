import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.post("http://localhost:9000/api/v1/auth/signup", {
      email,
      password,
      username,
    });

    navigate("/");
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <Form
              className="border p-4 rounded shadow"
              onSubmit={handleSignupSubmit}
            >
              <Form.Group className="mb-3 d-flex align-items-center justify-content-center">
                <Link to="/">
                  <Image
                    style={{ width: "50px", height: "auto" }}
                    src="/logo.png"
                    fluid
                  />
                </Link>
              </Form.Group>
              <hr />
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User name"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Signup
              </Button>
              <Link to="/login">
                <Button className="ms-2" variant="primary" type="submit">
                  Login
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
