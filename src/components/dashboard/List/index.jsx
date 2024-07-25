import React from 'react'
import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import ConvertNumbers from '../../../functions/convertNumbers';
import { useNavigate } from 'react-router-dom';
const List = ({coin,delay}) => {
	const navigate=useNavigate();
	const routing=()=>{
		navigate(`/coin/${coin.symbol}-${coin.id}`)
	}
  return (
    <motion.tr className='list_container' onClick={routing}
    initial={{opacity:0,x:100}}
    animate={{opacity:1,x:0}}
    transition={{duration:0.5,delay:delay}}
    >
            <Tooltip title="Coin Logo" placement='top'>
            <td className="list_img_container">
              <img src={coin.image} alt="" className='coin_logo' />
            </td>
            </Tooltip>
            <td>
              <div className="name_symbol">
                  <Tooltip title="Coin Symbol" placement='top'>
                  <p className='coin_symbol'>{coin.symbol}</p>
                  </Tooltip>
                  <Tooltip title="Coin Name" placement='top'>
                  <p className='coin_name'>{coin.name}</p>
                  </Tooltip>
              </div>
            </td>
		<Tooltip title="24hrs price change in %" placement='top'>
			  {coin.market_cap_change_percentage_24h >= 0 ?
              (<td className="list_percentage_container">
					  <div className="percentage green">{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
                  <div className='icon_up'><TrendingUpRoundedIcon /></div>
              </td> )
              :
              (<td className="list_percentage_container">
					  <div className="percentage red">{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
                  <div className="icon_down red"><TrendingDownRoundedIcon /></div>
              </td>
              )
          }
		</Tooltip>
          <Tooltip title="Current Price" placement='top'>
			  <td className="price_value text_center_align" style={{ color: coin.market_cap_change_percentage_24h >= 0 ? "var(--green)" : "var(--red)" }} >${coin.current_price.toLocaleString()}
            </td>
          </Tooltip>
          <Tooltip title="Total Volume" placement='top'>
          <td>
            <p className="volume text_right_align total_volume">{coin.total_volume.toLocaleString()}</p>
          </td>
          </Tooltip>
          <Tooltip title="Market Cap" placement='top'>
            <td className='Desktop_Market_Cap'>
                <p className="volume text_right_align">${coin.market_cap.toLocaleString()}</p>
            </td>
          </Tooltip>
          <Tooltip title="Market Cap" placement='top'>
            <td className='Mobile_Market_Cap'> 
                <p className="volume text_right_align">${ConvertNumbers(coin.market_cap)}</p>
            </td>
          </Tooltip>
    </motion.tr>
  )		
}

export default List
