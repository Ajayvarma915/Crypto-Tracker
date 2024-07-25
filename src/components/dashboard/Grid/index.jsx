import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'; 
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Grid = ({coin,delay}) => {
  return (
    <Link to={`/coin/${coin.symbol}-${coin.id}`}>
      <motion.div className={`grid_container ${coin.market_cap_change_percentage_24h < 0 && "grid_container_red"}`}
      initial={{opacity:0,y:50}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.5,delay:delay}}
      >
          <div className="info_container">
                  <img src={coin.image} alt="" className='coin_logo grid_coin_logo'/>
              <div className="name_symbol">
                  <p className='coin_symbol'>{coin.symbol}</p>
                  <p className='coin_name'>{coin.name}</p>
              </div>
          </div>
        {coin.market_cap_change_percentage_24h >=0?
            <div className="percentage_container">
            <div className="percentage green">{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
            <div className="percentage1 green">{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon_up'><TrendingUpRoundedIcon/></div>
                <div className='grid_icon_up'><TrendingUpRoundedIcon/></div>
            </div>
            :
            <div className="percentage_container">
                <div className="percentage red">{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
                <div className="percentage1 red">{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
                <div className="icon_down red"><TrendingDownRoundedIcon/></div>
                <div className="grid_icon_down red"><TrendingDownRoundedIcon/></div>
            </div>
          }
        <div className="price_value" style={{ color: coin.market_cap_change_percentage_24h >= 0 ?"var(--green)":"var(--red)"}} >${coin.current_price.toLocaleString()}
          </div>
          <p className="volume">Total Volume : {coin.total_volume.toLocaleString()}</p>
          <p className="volume">Market Cap : ${coin.market_cap.toLocaleString()}</p>
        </motion.div>
    </Link>
  )
}

export default Grid
