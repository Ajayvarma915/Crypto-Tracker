import React, { useEffect, useState } from 'react'
import "./styles.css"
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 150) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const topBtn=()=>{
        window.scrollTo({top:0,left:0,behavior:"smooth"})
    }
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
        {
        isVisible?
        <div className='backToTop_container' id='myBtn'>
        <button onClick={()=>topBtn()}><ArrowUpwardRoundedIcon/></button>
            </div>
        :<div></div>
        }
        </>
  )
}

export default BackToTop
