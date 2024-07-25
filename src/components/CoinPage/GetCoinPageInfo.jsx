import React, { useCallback, useEffect, useState } from 'react'
import CoinInfo from '../coin/coininfo';
import { Tooltip } from '@mui/material';
import ConvertNumbers from '../../functions/convertNumbers';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import Loader from '../common/loader';
import "./styles.css"
import GetCoinPrices from '../../functions/getCoinPrices';
import { SettingChartData } from '../../functions/settingChartData';
import SelectDays from '../coin/SelectDays';
import LineChart from '../coin/LineChart';

const GetCoinPageInfo = ({id}) => {
    const [coinData,setCoinData]=useState({});
    const [tickerData,setTickerData]=useState({});
    const [loading,setIsLoading]=useState(true);
    const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
    const [days,setDays]=useState(7);
    const [isError,setIsError]=useState(false);

    const fetchCoinPageInfo = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            const response = await fetch(`https://api.coinpaprika.com/v1/coins/${id}`);
            const data = await response.json();
            setCoinData(data);
            if (data) {
                const tickerResponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`);
                let tickerData = await tickerResponse.json();
                tickerData = tickerData.quotes;
                setTickerData(tickerData);
                let PriceInfo = await GetCoinPrices(data.symbol, days);
                if (data && PriceInfo) {
                    if (PriceInfo) {
                        SettingChartData(setChartData, PriceInfo.Data.Data);
                        setIsLoading(false);
                        setIsError(false);
                    }
                }
            }

        } catch (error) {
            setIsError(true);
        }
    },[id,days]) 

    useEffect(()=>{
        fetchCoinPageInfo();
    },[fetchCoinPageInfo])

    const handleDaysChange = useCallback(async (Event) => {
        setDays(Event.target.value);
        const PriceInfo = await GetCoinPrices(coinData.symbol, Event.target.value);
        const PriceDetails = PriceInfo.Data.Data;
        if (PriceDetails) {
            SettingChartData(setChartData, PriceDetails);
            setIsLoading(false);
        }
    },[days,GetCoinPrices])
    
    if(isError) return <h1>Data not found Please try after sometime.</h1>
    
  return (
    <>
    {
        loading?<Loader/>:
        <>
        <div className='coin_info_page_container'>
        <table className='coin_info_container'>
            <tbody className='coin_info_container'>
                <tr className='list_container'>
                    <Tooltip title="Coin Logo" placement='top'>
                        <td className="list_img_container coin_">
                            <img src={coinData.logo} alt="missing" className='coin_logo coin_page_coin_logo' />
                        </td>
                    </Tooltip>
                    <td>
                        <div className="name_symbol coin_page_name_symbol">
                            <Tooltip title="Coin Symbol" placement='top'>
                                <p className='coin_symbol coin_page_coin_symbol'>{coinData.symbol}</p>
                            </Tooltip>
                            <Tooltip title="Coin Name" placement='top'>
                                <p className='coin_name coin_page_coin_name'>{coinData.name}</p>
                            </Tooltip>
                        </div>
                    </td>
                    <Tooltip title="24hrs price change in %" placement='top'>
                        {tickerData?.USD?.market_cap_change_24h >= 0 ?
                            (<td className="list_percentage_container">
                                <div className="percentage green">{tickerData?.USD?.market_cap_change_24h}%</div>
                                <div className='icon_up'><TrendingUpRoundedIcon /></div>
                            </td>)
                            :
                            (<td className="list_percentage_container">
                                <div className="percentage red">{tickerData?.USD?.market_cap_change_24h}%</div>
                                <div className="icon_down red"><TrendingDownRoundedIcon /></div>
                            </td>
                            )
                        }
                    </Tooltip>
                    <Tooltip title="Current Price" placement='top'>
                        <td className="price_value coin_page_price_value text_center_align" style={{ color: tickerData?.USD?.market_cap_change_24h >= 0 ? "var(--green)" : "var(--red)" }} >${tickerData?.USD?.price.toLocaleString()}
                        </td>
                    </Tooltip>
                    <Tooltip title="Total Volume" placement='top'>
                        <td>
                            <p className="volume volume_coin_page text_right_align total_volume">{tickerData?.USD?.volume_24h.toLocaleString()}</p>
                        </td>
                    </Tooltip>

                    <Tooltip title="Market Cap" placement='top'>
                        <td className='Desktop_Market_Cap'>
                            <p className="volume text_right_align">${tickerData?.USD?.market_cap.toLocaleString()}</p>
                        </td>
                    </Tooltip>

                    <Tooltip title="Market Cap" placement='top'>
                        <td className='Mobile_Market_Cap market_cap_coin_page'>
                            <p className="volume text_right_align">${ConvertNumbers(tickerData?.USD?.market_cap)}</p>
                        </td>
                    </Tooltip>
                </tr>
            </tbody>
        </table>
          <div className='chart_container'>
            <div className="days_container">
                <h2 style={{margin:"1rem 0rem",padding:"1rem 0rem"}}>price change in last 24 hrs</h2>
                <SelectDays days={days} handleDaysChange={(e)=>handleDaysChange(e)} text={"select data points"}/>
            </div>
            <LineChart chartData={chartData} multiAxis={false}/>
          </div>
        <div>
        <CoinInfo heading={coinData.name} description={coinData.description}/>
        </div>
        </div>
        </>
    }
    </>
  )
}

export default GetCoinPageInfo
