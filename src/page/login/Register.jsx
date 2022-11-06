import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
// import GoogleLogin from "../components/GoogleLogin";

const Register = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (firstName === "") {
        alert("First Name is required");
        return;
    }
    if (lastName === "") {
        alert("Last Name is required");
        return;
    }
    if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
      const data = {
        email,
        password,
        name : firstName + lastName,
      };
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
          data
        );
        if (result.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.token);
          setToken(result.data.token);
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <header className="header-bg">
      <Card className="col-md-8 col-sm-11">
            <Card.Body>
                <Row>
                    <Col>
                        {!token ? (
                            <>
                            {/* <GoogleLogin
                                setToken={setToken}
                                label="Register with Google"
                            /> */}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="c">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="c">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" type="submit">
                                    Submit
                                </Button>
                                </div>
                            </Form>
                            </>
                        ) : (
                            <div className="d-grid gap-2">
                                <Button variant="danger" size="lg" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        )}
                </Col>
            </Row>
            </Card.Body>
        </Card>
      </header>
    </div>
  );
};

export default Register;
