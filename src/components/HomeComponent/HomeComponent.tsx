import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Tooltip, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import './styles.scss';
import Utility from "../../utils/utility";
import Movie from "../../models/movie";
import MovieList from "../MovieListComponent/MovieListComponent";
import TMDBAtributtion from "../TMDBAtributtion/TMDB";
import ScrollTopButton from "../ScrollTopButton/ScrollTopButton";
import MovieManager from "../../managers/movie.manager";


function Home(){
    
    const [trending, setTrending] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        Utility.WindowToTop();
        loadMoviesData();
        
        return () => {
            setTrending([]);
            setTopRated([]);
            setUpcoming([]);
            setNowPlaying([]);
            setSearchText('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMoviesData = async () => {
        const trendingData = await MovieManager.getTrendingMovies();
        const topRatedData = await MovieManager.getTopRatedMovies();
        const upcomingData = await MovieManager.getUpcomingMovies();
        const nowPlayingData = await MovieManager.getNowPlayingMovies();

        setTrending(trendingData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);
        setNowPlaying(nowPlayingData);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleClick = () => {
        navigate(`/movies?search=${searchText}&page=1`);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if(event.key === 'Enter'){
            handleClick();
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col md={12} 
                className="p-4 d-flex justify-content-center align-items-center flex-row">
                    <TextField id="outlined-basic" 
                    label={Utility.SEARCH_PLACEHOLDER} variant="outlined"
                    style={{'width': '90vw'}}
                    value={searchText}
                    onKeyUp={handleKeyUp}
                    onChange={handleSearchChange}/>
                    <Tooltip title={Utility.SEARCH}>
                        <IconButton
                            size="large"
                            sx={{ color: 'rgb(89, 89, 179)' }}
                            aria-label={Utility.SEARCH}
                            onClick={handleClick}
                        >
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col md={12}>
                    <div className="my-3">
                        <h3>{Utility.TRENDING_TITLE}</h3>
                    </div>
                </Col>
                <Col md={12}>
                    <MovieList data={trending} />
                </Col>
            </Row>

            <Row  className="my-2">
                <Col md={12}>
                    <div className="my-3">
                        <h3>{Utility.TOP_RATED_TITLE}</h3>
                    </div>
                </Col>
                <Col md={12}>
                    <MovieList data={topRated} />
                </Col>
            </Row>

            <Row  className="my-2">
                <Col md={12}>
                    <div className="my-3">
                        <h3>{Utility.NOW_PLAYING_TITLE}</h3>
                    </div>
                </Col>
                <Col md={12}>
                    <MovieList data={nowPlaying} />
                </Col>
            </Row>

            <Row  className="my-2">
                <Col md={12}>
                    <div className="my-3">
                        <h3>{Utility.UPCOMING_TITLE}</h3>
                    </div>
                </Col>
                <Col md={12}>
                    <MovieList data={upcoming} />
                </Col>
            </Row>

            <Row className="my-5">
                <Col md={12}>
                    <TMDBAtributtion />
                </Col>
            </Row>

            <ScrollTopButton />
        </Container>

    );
}

export default Home;