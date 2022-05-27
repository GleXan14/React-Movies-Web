import './styles.scss';
import Movie from "../../models/movie";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MovieComponent from '../MovieComponent/MovieComponent';

interface Props{
    data: Movie[]
}

export default function MovieList(props:Props){

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {;
        setMovies(props.data!);
    }, [props.data]);

    
    return (
        <Container fluid>
                <Row>
                    
                    <Col md={12} >
                        <div 
                        className="custom-movie-list d-flex justify-content-start align-items-center flex-row">
                            {movies.map((item) => (
                                <MovieComponent key={item.id} movie={item} />
                            ))}
                        </div>
                    </Col>
                </Row>
                
        </Container>

    );
}