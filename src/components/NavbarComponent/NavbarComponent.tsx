import './styles.scss';
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Utility from "../../utils/utility";

export default function GlobalNavbar(){
    return (
        
        <Navbar variant="dark" sticky="top" expand="lg" className="custom-navbar">
            <Container fluid>
                <Navbar.Brand>
                    <LinkContainer to="/" style={{'cursor': 'pointer'}}>
                        <h2>{Utility.SITE_NAME}</h2>
                    </LinkContainer>
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/">
                            <Nav.Link><h5>{Utility.NAVBAR_HOME}</h5></Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/movies">
                            <Nav.Link><h5>{Utility.NAVBAR_MOVIES}</h5></Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}