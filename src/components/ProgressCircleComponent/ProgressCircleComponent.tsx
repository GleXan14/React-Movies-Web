import { Fragment } from 'react';
import './styles.scss';

type Props = {
    width:string;
    height:string;
    percent:number;
}

export default function ProgressCircle(props:Props){

    return (
        <Fragment>
            <div className="circle-box">
                <svg xmlns="http://www.w3.org/2000/svg" 
                width={props.width} height={props.height}
                viewBox="0 0 42 42"
                className="custom-donut">
                    <circle className="donut-hole" 
                    cx="21" cy="21" r="15.91549430918954" 
                    fill="rgb(225, 219, 219)"></circle>

                    <circle className="donut-ring" 
                    cx="21" cy="21" r="15.91549430918954" 
                    fill="transparent" stroke="rgb(225, 219, 219)" strokeWidth="3"></circle>

                    <circle className="donut-segment" 
                    cx="21" cy="21" r="15.91549430918954" 
                    fill="transparent" stroke="rgb(89, 89, 179)" strokeWidth="3"
                    strokeDasharray={(props.percent)+' '+(100 - (props.percent))}
                    strokeDashoffset="0"></circle>

                    <text x="50%" y="50%" dominantBaseline="middle" 
                    textAnchor="middle" fill="#000" fontSize="12">
                        {props.percent+'%'}
                    </text>

                </svg>
            </div>
        </Fragment>
    );
}