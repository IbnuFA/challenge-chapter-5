import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, Button, Form, Card, Nav, Navbar} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header({ token, setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            setToken(null);
            navigate.push("/");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Navbar className="navbar navbar-expand-md navbar-dark bg-dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white">MovieList</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup>
            <Form.Control
                controlId="searchTask"
                placeholder="cari Movie"
                name="search" 
            />
            <Button variant="danger" type="submit" >
                Cari
            </Button>
          </InputGroup>
          <Nav className="me-auto">
            {!token ? (
              <>
                <Button className="mx-2" variant="outline-danger" onClick={() => navigate(`/login`)}>
                    Login
                </Button>
                <Button variant="danger" onClick={() => navigate(`/register`)}>
                    Register
                </Button>
              </>
            ) : (
              <>
                <Button className="mx-2" variant="outline-danger" onClick={() => navigate(`/posts`)}>
                    Dashboard
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
