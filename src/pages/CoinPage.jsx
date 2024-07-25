import React from 'react'
import { useParams } from 'react-router-dom'
import GetCoinPageInfo from '../components/CoinPage/GetCoinPageInfo';
import Header from '../components/common/Header';

const CoinPage = () => {
    const {id}=useParams();

  return (
    <>
    <Header/>
        <GetCoinPageInfo id={id}/>
    </>
  )
}

export default CoinPage
