
import './styles.scss';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CustomIf from '../IfComponent/IfComponent';

export default function ScrollTopButton(){

    const [buttonDisplay, setButtonDisplay] = useState<boolean>(false);

    useEffect(() => {
        checkScroll();
        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
            setButtonDisplay(false);
        }
    }, []);

    const checkScroll = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            setButtonDisplay(true);
        } else {
            setButtonDisplay(false);
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    
    return (
        <CustomIf condition={buttonDisplay}>
            <div className="custom-scroll-top-button"
            onClick={scrollTop}>
                <IconButton aria-label="scroll top" size="small">
                    <ArrowUpwardIcon />
                </IconButton>
            </div>
        </CustomIf>
    )
}