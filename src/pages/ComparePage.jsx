import React, { useState } from 'react'
import SelectCoins from '../components/Compare page/Select Coins'
import Header from '../components/common/Header'

const ComparePage = () => {
    const [crypto1, setCrypto1] = useState('btc-bitcoin');
    const [crypto2, setCrypto2] = useState('eth-ethereum');
    const [days, setDays] = useState(7);

  return (
    <>
      <Header/>
      <>
    <div>
      <SelectCoins crypto1={crypto1} crypto2={crypto2} days={days} setCrypto1={setCrypto1} setCrypto2={setCrypto2} setDays={setDays}/>
    </div>
    </>
      </>
  )
}

export default ComparePage
