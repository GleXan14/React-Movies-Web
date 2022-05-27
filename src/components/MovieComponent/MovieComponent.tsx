
import './styles.scss';
import { LinkContainer } from "react-router-bootstrap";
import Movie from "../../models/movie";

type Props = {
    movie: Movie
}

export default function MovieComponent({movie}:Props){

    return (
        <LinkContainer to={`/movie/${movie.id}`}>
            <div  className="mx-2 custom-movie">
                <img
                    className="custom-movie-img"
                    src={movie.getImage()}
                    alt={movie.title}
                    loading="lazy"
                />
                <div className="custom-movie-title">
                    <h6>{movie.title}</h6>
                </div>
            
            </div>
        </LinkContainer>
    );
}