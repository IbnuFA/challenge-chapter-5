import React from "react";
import Popular from "./Popular";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, Button, Form, Card, Nav, Row, Col} from "react-bootstrap";
import logo from "./logo512.png"

export default function Main(){
    return(
        <div>
            <Container className="mt-3 mb-3">
                <InputGroup>
                <Form.Control
                        controlId="searchTask"
                        placeholder="Cari Movie"
                        name="search" 
                    />
                    <Button variant="danger" type="submit" >
                        Cari
                    </Button>
                </InputGroup>
            </Container>
            <Popular/>
        </div>
    )
}