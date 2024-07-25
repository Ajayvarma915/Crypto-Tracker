import { InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./styles.css"
import SelectDays from '../../coin/SelectDays';
import CoinInfo from '../../coin/coininfo';
import Loader from '../../common/loader';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import ConvertNumbers from '../../../functions/convertNumbers';
import GetCoinPrices from '../../../functions/getCoinPrices';
import { SettingTwoCoinsData } from '../../../functions/settingTwoCoinsChartData';
import LineChart from '../../coin/LineChart';

const SelectCoins = ({crypto1,crypto2,days,setCrypto1,setCrypto2,setDays}) => {
    const [coinNames, setCoinNames] = useState([]);
    const [coinInfo1,setCoinInfo1]=useState({});
    const [coinInfo2,setCoinInfo2]=useState({});
    const [tickerInfo1,setTickerInfo1]=useState({});
    const [tickerInfo2,setTickerInfo2]=useState({});
    const [loading,setIsLoading]=useState(true);
    const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
    const [CoinPrices1, setCoinPrice1] = useState({});
    const [CoinPrices2, setCoinPrice2] = useState({});
    const [isError,setIsError]=useState(false);

    const fetchChartData = useCallback(async () => {
        try {
            const symbol1 = crypto1.split('-')[0]
            const symbol2 = crypto2.split('-')[0]
            var price1 = await GetCoinPrices(symbol1, days);
            price1 = price1.Data.Data;
            setCoinPrice1(price1);
            var price2 = await GetCoinPrices(symbol2, days);
            price2 = price2.Data.Data;
            setCoinPrice2(price2);
            if (price1 && price2) {
                SettingTwoCoinsData(setChartData, price1, price2, crypto1, crypto2);
            }
        } catch (error) {
            console.log(error.message);
        }
    },[crypto1,crypto2,days]) 

    const fetchCoinInfo = useCallback(async (id) => {
        try {
            const response = await fetch(`https://api.coinpaprika.com/v1/coins/${id}`);
            const data = await response.json();
            if (data) {
                const tickerResponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`);
                let tickerData = await tickerResponse.json();
                tickerData = tickerData.quotes;
                return [data, tickerData];
            }
        } catch (error) {
            console.log(error.message);
        }
    },[]) 

    const fetchAllCoinsApi = useCallback(async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const data = await response.json();
            setCoinNames(data.slice(0, 100));
            if (data) {
                const [data1, tickerdata1] = await fetchCoinInfo(crypto1);
                const [data2, tickerdata2] = await fetchCoinInfo(crypto2);
                setCoinInfo1(data1);
                setCoinInfo2(data2);
                setTickerInfo1(tickerdata1);
                setTickerInfo2(tickerdata2);
                if (data1 && data2) {
                    fetchChartData();
                }
                setIsLoading(false);
                setIsError(false);
            }
        } catch (error) {
            console.log(error.message);
            setIsError(true);
        }
    },[crypto1,crypto2,fetchChartData,fetchCoinInfo])
  

  useEffect(() => {
    fetchAllCoinsApi();
  },[fetchAllCoinsApi]);

    const styles = useMemo(()=>({
        color: "var(--white)",
        borderColor: "var(--white)",
        border: "none",
        "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
            color: "var(--blue)"
        },
        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)"
        },
        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:hover": {
            borderColor: "var(--darkgrey)"
        }
    }),[]);

    const handleCoinChange1 = useCallback(async (Event) => {
        setCrypto1(Event.target.value);
        const [data1, tickerdata1] = await fetchCoinInfo(Event.target.value);
        setCoinInfo1(data1);
        setTickerInfo1(tickerdata1);
        const symbol1 = Event.target.value.split('-')[0]
        let price1 = await GetCoinPrices(symbol1, days);
        price1 = price1.Data.Data;
        SettingTwoCoinsData(setChartData, price1, CoinPrices2, Event.target.value, coinInfo2.name);
        setIsLoading(false);
    },[fetchCoinInfo,days,coinInfo1,CoinPrices1])

    const handleCoinChange2 = useCallback(async (Event) => {
        setCrypto2(Event.target.value);
        const [data2, tickerdata2] = await fetchCoinInfo(Event.target.value);
        setCoinInfo2(data2);
        setTickerInfo2(tickerdata2);
        const symbol2 = Event.target.value.split('-')[0]
        let price2 = await GetCoinPrices(symbol2, days);
        price2 = price2.Data.Data;
        SettingTwoCoinsData(setChartData, CoinPrices1, price2, coinInfo1.name, Event.target.value);
        setIsLoading(false);
    },[fetchCoinInfo,days,coinInfo2,CoinPrices2]) 

    const handleDaysChange = useCallback(async (Event) => {
        setDays(Event.target.value);
        const symbol1 = crypto1.split('-')[0]
        const symbol2 = crypto2.split('-')[0]
        var price1 = await GetCoinPrices(symbol1, days);
        price1 = price1.Data.Data;
        setCoinPrice1(price1);
        if (price1) {
            var price2 = await GetCoinPrices(symbol2, days);
            price2 = price2.Data.Data;
            setCoinPrice2(price2);
            SettingTwoCoinsData(setChartData, price1, price2, coinInfo1.name, coinInfo2.name);
        }
    },[GetCoinPrices,days])

if (isError) return <h1>Data not found Please try after sometime.</h1>

  return (
    loading?<Loader/>:
    <>
    <div className='compare_page_container'>
      <InputLabel id="demo-simple-select-label" sx={styles}>Crypto 1</InputLabel>
      <Select sx={styles}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={crypto1}
        label="Crypto1"
        onChange={handleCoinChange1}
      >
        {
          coinNames.filter((item)=>item.id!==crypto2).map((eachCoin)=>{
            return <MenuItem key={eachCoin.id} value={eachCoin.id}>{eachCoin.name}</MenuItem>
          })
        }
      </Select>
      
      <InputLabel id="demo-simple-select-label" sx={styles}>Crypto 2</InputLabel>
      <Select sx={styles}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={crypto2}
        label="Crypto2"
        onChange={handleCoinChange2}
      >
        {
          coinNames.filter((item)=>item.id!==crypto1).map((eachCoin)=>{
            return <MenuItem key={eachCoin.id} value={eachCoin.id}>{eachCoin.name}</MenuItem>
          })
        }
      </Select> 
       <SelectDays days={days} handleDaysChange={handleDaysChange} text={"select data points"}/>
    </div>
    <table className='coin_info_container'>
        <tbody className='coin_info_container'>
            <tr className='list_container'>
                <Tooltip title="Coin Logo" placement='top'>
                    <td className="list_img_container compare_page_coin_logo">
                        <img src={coinInfo1.logo} alt="missing" className='coin_logo' />
                    </td>
                </Tooltip>
                <td>
                    <div className="name_symbol compare_page_ ame_symbol">
                        <Tooltip title="Coin Symbol" placement='top'>
                            <p className='coin_symbol'>{coinInfo1.symbol}</p>
                        </Tooltip>
                        <Tooltip title="Coin Name" placement='top'>
                            <p className='coin_name'>{coinInfo1.name}</p>
                        </Tooltip>
                    </div>
                </td>
                <Tooltip title="24hrs price change in %" placement='top'>
                    {tickerInfo1?.USD?.market_cap_change_24h >= 0 ?
                        (<td className="list_percentage_container">
                            <div className="percentage green">{tickerInfo1?.USD?.market_cap_change_24h}%</div>
                            <div className='icon_up'><TrendingUpRoundedIcon /></div>
                        </td>)
                        :
                        (<td className="list_percentage_container">
                            <div className="percentage red">{tickerInfo1?.USD?.market_cap_change_24h}%</div>
                            <div className="icon_down red"><TrendingDownRoundedIcon /></div>
                        </td>
                        )
                    }
                </Tooltip>
                <Tooltip title="Current Price" placement='top'>
                    <td className="price_value compare_page_price_value text_center_align" style={{ color: tickerInfo1?.USD?.market_cap_change_24h >= 0 ? "var(--green)" : "var(--red)" }} >${tickerInfo1?.USD?.price.toLocaleString()}
                    </td>
                </Tooltip>
                <Tooltip title="Total Volume" placement='top'>
                    <td>
                        <p className="volume compare_page_volume text_right_align total_volume">{tickerInfo1?.USD?.volume_24h.toLocaleString()}</p>
                    </td>
                </Tooltip>

                <Tooltip title="Market Cap" placement='top'>
                    <td className='Desktop_Market_Cap'>
                        <p className="volume text_right_align">${tickerInfo1?.USD?.market_cap.toLocaleString()}</p>
                    </td>
                </Tooltip>

                <Tooltip title="Market Cap" placement='top'>
                    <td className='Mobile_Market_Cap compare_page_market_cap'>
                        <p className="volume text_right_align">${ConvertNumbers(tickerInfo1?.USD?.market_cap)}</p>
                    </td>
                </Tooltip>
            </tr>
        </tbody>
    </table>
     <table className='coin_info_container'>
        <tbody className='coin_info_container'>
            <tr className='list_container'>
                <Tooltip title="Coin Logo" placement='top'>
                    <td className="list_img_container compare_page_coin_logo">
                        <img src={coinInfo2.logo} alt="missing" className='coin_logo' />
                    </td>
                </Tooltip>
                <td>
                    <div className="compare_page_name_symbol">
                        <Tooltip title="Coin Symbol" placement='top'>
                            <p className='coin_symbol'>{coinInfo2.symbol}</p>
                        </Tooltip>
                        <Tooltip title="Coin Name" placement='top'>
                            <p className='coin_name'>{coinInfo2.name}</p>
                        </Tooltip>
                    </div>
                </td>
                <Tooltip title="24hrs price change in %" placement='top'>
                    {tickerInfo2?.USD?.market_cap_change_24h >= 0 ?
                        (<td className="list_percentage_container">
                            <div className="percentage green">{tickerInfo2?.USD?.market_cap_change_24h}%</div>
                            <div className='icon_up'><TrendingUpRoundedIcon /></div>
                        </td>)
                        :
                        (<td className="list_percentage_container">
                            <div className="percentage red">{tickerInfo2?.USD?.market_cap_change_24h}%</div>
                            <div className="icon_down red"><TrendingDownRoundedIcon /></div>
                        </td>
                        )
                    }
                </Tooltip>
                <Tooltip title="Current Price" placement='top'>
                    <td className="price_value compare_page_price_value text_center_align" style={{ color: tickerInfo2?.USD?.market_cap_change_24h >= 0 ? "var(--green)" : "var(--red)" }} >${tickerInfo2?.USD?.price.toLocaleString()}
                    </td>
                </Tooltip>
                <Tooltip title="Total Volume" placement='top'>
                    <td>
                        <p className="volume compare_page_volume text_right_align total_volume">{tickerInfo2?.USD?.volume_24h.toLocaleString()}</p>
                    </td>
                </Tooltip>

                <Tooltip title="Market Cap" placement='top'>
                    <td className='Desktop_Market_Cap'>
                        <p className="volume text_right_align">${tickerInfo2?.USD?.market_cap.toLocaleString()}</p>
                    </td>
                </Tooltip>

                <Tooltip title="Market Cap" placement='top'>
                    <td className='Mobile_Market_Cap compare_page_market_cap '>
                        <p className="volume text_right_align">${ConvertNumbers(tickerInfo2?.USD?.market_cap)}</p>
                    </td>
                </Tooltip>
            </tr>
        </tbody>
    </table>
    <div className='chart_container'>
        <LineChart chartData={chartData} multiAxis={true} />
    </div>        
    <div>
      <CoinInfo heading={coinInfo1.name} description={coinInfo1.description}/>
      <CoinInfo heading={coinInfo2.name} description={coinInfo2.description} />
  </div>
  <div>

  </div>
    </>
  )
}

export default SelectCoins
