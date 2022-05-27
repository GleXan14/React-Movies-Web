import { Fragment } from "react";

type Props = {
    condition:boolean,
    children: JSX.Element | JSX.Element[]
}

export default function CustomIf(props:Props){
    
    if(props.condition){
        return <Fragment>{props.children}</Fragment>;
    }
    return null;
}