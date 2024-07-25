import React from 'react'
import "./styles.css"
import Button from '../../common/Button'
import gradient from '../../../assets/gradient.png'
import iphone from '../../../assets/iphone.png'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'
import {RWebShare} from 'react-web-share'
import {toast} from 'react-toastify'

const Maincomponent = () => {
  return (
    <div className='main_component_container'>
      <div className="text_container">
          <motion.h1 className='track_crypto_heading' 
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
          >Track Crypto</motion.h1>
          <motion.h1 className='real_time_heading'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5,delay:0.5 }}
          >Real Time.</motion.h1>
          <motion.p className='text_context'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >Track crypto through a public api in real time. Visit the dashboard to do so!</motion.p>
      <motion.div className="btns"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}>
        <Link to={"/dashboard"}><Button text={"Dashboard"} onClick={()=>console.log("button clicked")}></Button></Link>
        <RWebShare
            data={{
                text: "CryptoTracker made by Ajay Varma using React JS.",
                url: "https://ajayvarma915.github.io/Crypto-Tracker/",
                title: "CryptoTracker.",
            }}
            onClick={() => toast.info("App Shared!")}
        >
            <Button text={"Share App"} outlined={true} />
        </RWebShare>
        </motion.div>
      </div>
      <div className="image_container">
        <motion.img className="iphone_img_container" src={iphone} 
        initial={{y:-15}}
        animate={{y:15}}
        transition={{repeat:Infinity,repeatType:'mirror',type:"smooth",duration:1}}
        alt="" />
       <img className="gradient_img_container" src={gradient} alt="" />
      </div>
    </div>
  )
}

export default Maincomponent
