import  React  from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./styles.css"
export default function SelectDays({days,handleDaysChange,text}) {
    
    const styles={
        color:"var(--white)",
        borderColor:"var(--white)",
        border:"none",
        "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon":{
            color:"var(--blue)"
        },
        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline":{
            borderColor:"var(--white)"
        },
        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:hover":{
            borderColor:"var(--darkgrey)"
        }
    }
    return (
        <div className='select_container'>
                <InputLabel id="demo-simple-select-label" sx={styles}>{text}</InputLabel>
            <Select sx={styles}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={days}
                    label="Days"
                    onChange={handleDaysChange}
                >
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={90}>90</MenuItem>
                </Select>
        </div>
    );
}
