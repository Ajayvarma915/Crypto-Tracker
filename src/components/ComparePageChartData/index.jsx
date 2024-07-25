import React, { useEffect, useState } from 'react'
import GetCoinPrices from '../../functions/getCoinPrices';
import LineChart from '../coin/LineChart';
import { SettingTwoCoinsData } from '../../functions/settingTwoCoinsChartData';
import SelectDays from '../coin/SelectDays';

const ComparePageChartData = ({crypto1,crypto2,days,setCrypto1,setCrypto2,setDays}) => {
    const [chartData,setChartData]=useState({});
    const [CoinPrices1,setCoinPrice1]=useState({});
    const [CoinPrices2,setCoinPrice2]=useState({});

    const fetchChartData = async () => {
        try {
            const symbol1=crypto1.split('-')[0]
            const symbol2=crypto2.split('-')[0]
            var price1=await GetCoinPrices(symbol1,days);
            price1=price1.Data.Data;
            setCoinPrice1(price1);
            if(price1){
                var price2 = await GetCoinPrices(symbol2, days);
                price2 = price2.Data.Data;
                setCoinPrice2(price2);
                SettingTwoCoinsData(setChartData,price1,price2);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleCoinChange1=async(Event)=>{
        setCrypto1(Event.target.value);
        const symbol1 = Event.target.value.split('-')[0]
        let price1 = await GetCoinPrices(symbol1, days);
        price1 = price1.Data.Data;
        SettingTwoCoinsData(setChartData, price1,CoinPrices2);
    }
    const handleCoinChange2=async(Event)=>{
        setCrypto2(Event.target.value);
        const symbol2 = Event.target.value.split('-')[0]
        let price2 = await GetCoinPrices(symbol2, days);
        price2= price2.Data.Data;
        SettingTwoCoinsData(setChartData, CoinPrices1,price2);
    }
    const handleDaysChange=async(Event)=>{
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
            SettingTwoCoinsData(setChartData, price1, price2);
        }
    }

    useEffect(() => {
        fetchChartData();
    }, [])
  return (
    <div>
        <SelectDays days={days} handleDaysChange={handleDaysChange}/>
        <LineChart chartData={chartData}/>
    </div>
  )
}

export default ComparePageChartData
