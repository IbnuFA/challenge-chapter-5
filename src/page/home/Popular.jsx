import React, { useEffect, useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, Button, Form, Card, Nav, Row, Col} from "react-bootstrap";
import "../style/popular.css"

export default function Popular (){
    const [movies, setMovies] = useState([])
    
    const fetchData = async () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
            params: {
                api_key: process.env.REACT_APP_TMDB_KEY,
            }
            }).then((res) => {
            console.log("data =>", res.data.results)
            setMovies(res.data.results)
        })
    }

    useEffect(() => {
      fetchData();
    }, [])

    return(
        <div>
            <Container>
                <Card>
                    <Card.Body>
                        <Nav activeKey="/home">
                            <Nav.Item className="ms-1">
                                <Nav.Link href="/home">Popular Movie</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ms-auto">
                                <Nav.Link eventKey="link-1">Show More</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Row className="justify-content-between">
                            {movies?.map((results, index) => {
                                return(
                                    <Col md={3} sm={12} key={index}>
                                        {/* <Card className="col-sm-12 cardWrapper" style={{ maxHeight: '40rem' }}> */}
                                        <Card className="col-sm-12 cardWrapper">
                                            <Card.Img variant="top" src={`${process.env.REACT_APP_IMG_URL}/${results.poster_path}`} alt="poster-movie"/>
                                            <Card.Body>
                                                <Card.Title className="text-center">{results.title}</Card.Title>
                                                <Card.Text className="text-left">{results.overview}</Card.Text>
                                                <Card.Text className="text-left">Release Date : {results.release_date}</Card.Text>
                                                <Card.Text className="text-left">Score : {results.vote_average}</Card.Text>
                                                <Button variant="primary">Detail</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}