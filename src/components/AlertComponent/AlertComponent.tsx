
// import { SvgIconTypeMap } from "@mui/material"
// import { OverridableComponent } from "@mui/material/OverridableComponent"
import { Container } from "react-bootstrap"
import './styles.scss';

type Props = {
    title:string,
    subtitle:string,
    // icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    //     muiName: string;
    // }
}

export default function CustomAlert(props:Props){

    return (
        <Container fluid className="p-5 custom-alert">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h3 className="my-0">{props.title}</h3>
                <p>{props.subtitle}</p>
            </div>
        </Container>
    )
}