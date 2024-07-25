import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "./styles.css"
const Loader = () => {
  return (
    <div className='Loader_container'>
      <CircularProgress/>
    </div>
  )
}

export default Loader
