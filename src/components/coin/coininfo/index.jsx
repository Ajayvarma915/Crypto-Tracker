import React, { useState } from 'react'
import "./styles.css"
const CoinInfo = ({heading,description}) => {
  const [flag,setFlag]=useState(false);
    if(!description) return;
  const shortDesc = description.slice(0, 220) +"<span style='color:var(--grey)'> Read More...</span>"
  const longDesc=description+"<span style='color:var(--grey)'> Read Less...</span>"
  return (
    description?
    <>
      <div className='Coin_page_container'>
      <h2 className='coin_page_heading'>{heading}</h2>
      {
        description.length>220? 
          <p className='coin_page_desc' dangerouslySetInnerHTML={{ __html: flag ? longDesc : shortDesc }} onClick={() => setFlag(!flag)}></p> :
          <p className='coin_page_desc' dangerouslySetInnerHTML={{__html:description}}></p>
      }
      
    </div>
      </>:
          <div className='Coin_page_container' style={{display:'none'}}>
              <h2 className='coin_page_heading'>{heading}</h2>
              {
                  description.length > 220 ?
                      <p className='coin_page_desc' dangerouslySetInnerHTML={{ __html: flag ? longDesc : shortDesc }} onClick={() => setFlag(!flag)}></p> :
                      <p className='coin_page_desc' dangerouslySetInnerHTML={{ __html: description }}></p>
              }

          </div>
  )
}

export default CoinInfo
