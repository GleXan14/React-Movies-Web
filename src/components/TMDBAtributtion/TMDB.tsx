import './styles.scss';

import { Col, Container, Row } from 'react-bootstrap';
import Utility from '../../utils/utility';
import TMDB_logo from '../../assets/svg/TMDB_logo_full.svg';

export default function TMDBAtributtion(){

    return (
        <Container fluid className="tmdb_atributtion">
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={5} className="content px-3 py-4">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <h6>{Utility.TMDB_NOTICE} Link below</h6>
                        <a href="https://www.themoviedb.org/" rel="noreferrer" target="_blank">
                            <img 
                            style={{'width': '150px', 'height': '75px'}}
                            src={TMDB_logo} alt="TMDB logo" />
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}