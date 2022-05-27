import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExplicitIcon from '@mui/icons-material/Explicit';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import './styles.scss';
import Movie from "../../models/movie";
import Utility from "../../utils/utility";
import MovieManager from "../../managers/movie.manager";
import CustomIf from "../IfComponent/IfComponent";
import ProgressCircle from "../ProgressCircleComponent/ProgressCircleComponent";


export default function MovieDetails(){

    const [movie, setMovie] = useState<Movie>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Utility.WindowToTop();
        getMovie();

        return () => {
            setMovie(null!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMovie = async () =>{
        const movie = await MovieManager.getMovie(parseInt(id as string));
        setMovie(movie);
    }

    const handleBackButton = () => {
        navigate(-1);
    }

    return (
        <Container fluid className="px-0">
            <CustomIf condition={!!movie && movie !== undefined}>
                <div className="custom-movie-container" 
                style={{'backgroundImage': `url(${movie?.getImage('backdrop')})`}}>
                    <Row className="py-4 custom-movie-detail">
                        <Col md={12} 
                        className="mb-3 d-flex justify-content-start align-items-center">
                            <Button className="mx-4 custom-back-button" 
                            onClick={handleBackButton}
                            variant="contained" startIcon={<ArrowBackIcon />}>
                                {Utility.BACK_BUTTON}
                            </Button>
                            
                        </Col>
                        
                        <Col sm={6}  xl={4}
                        className="d-flex justify-content-center  align-items-center">
                            <img
                                className="custom-movie-img"
                                src={movie?.getImage()}
                                alt={movie?.title}
                                loading="lazy"
                            />
                        </Col>

                        <Col sm={6}  xl={7}>
                            <div className="px-4 d-flex justify-content-center align-items-center align-items-md-start flex-column">
                                <div className="d-flex justify-content-center align-items-center flex-row">
                                    <CustomIf condition={movie?.isAdult!}>
                                        <Tooltip title="Content explicit">
                                            <ExplicitIcon fontSize="large" />
                                        </Tooltip>
                                    </CustomIf>
                                    <h2 className="mx-2 text-center text-md-start">{movie?.title} {`(${movie?.getYear()})`}</h2>
                                </div>
                                <p>{movie?.releaseDate} • {movie?.getGenres()} • {movie?.getRuntimeFormatted()}</p>
                                
                                <div className="my-2 d-flex justify-content-center align-items-center flex-row">
                                    <ProgressCircle width="75" height="75" percent={movie?.getVote()!} />
                                    <h4>{Utility.MOVIE_USER_SCORE}</h4>
                                </div>
                                <h4>{Utility.MOVIE_OVERVIEW}</h4>
                                <p>{movie?.description}</p>

                                <p><strong>{Utility.MOVIE_COMPANIES}: </strong>{movie?.getCompaniesName()}</p>
                                <CustomIf condition={!!movie?.homepage}>
                                    <Button variant="contained" 
                                    startIcon={<OpenInBrowserIcon />} 
                                    href={movie?.homepage!} target="_blank">
                                        {Utility.MOVIE_HOMEPAGE}
                                    </Button>
                                </CustomIf>

                            </div>
                        </Col>
                    </Row>
                </div>

            </CustomIf>
        </Container>
    );
}