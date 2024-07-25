import React from 'react'
import "./styles.css"
const Button = ({text,onClick,outlined}) => {
  return (
    <div className={outlined?"outlined_btn":'btn'} onClick={()=>onClick()}>
      {text}
    </div>
  )
}

export default Button
