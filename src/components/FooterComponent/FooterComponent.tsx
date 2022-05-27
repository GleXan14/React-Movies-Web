import { LinkContainer } from 'react-router-bootstrap';
import Utility from '../../utils/utility';
import './styles.scss';

export default function Footer(){

    return(
        <div className="p-5 position-relative d-flex justify-content-center align-items-center flex-column">
            <LinkContainer to="/" style={{'cursor': 'pointer'}}>
                <h3 className="mb-5">{Utility.SITE_NAME}</h3>
            </LinkContainer>
            
            <p className="rights-reserved">
                &copy; {new Date().getFullYear()} {Utility.SITE_NAME}. All reserved rights
            </p>
            
            {/* <p className="made-by">Made by Angel Peña</p> */}
        </div>
    )
}