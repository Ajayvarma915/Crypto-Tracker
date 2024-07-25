import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import TabsComponent from '../components/dashboard/tabs'
import Search from '../components/dashboard/Search'
import PaginationComponent from '../components/dashboard/pagination'
import Loader from '../components/common/loader'
import BackToTop from '../components/common/BackToTop'
import { get100CoinsData } from '../functions/get100Coins'

const DashboardPage = () => {
  const [coins,setCoins]=useState([]);
  const [paginatedCoins,setPaginatedCoins]=useState([]);
  const [search,setSearch]=useState('');
  const [page, setPage] = useState(1);
  const [loading,setIsLoading]=useState(true);
    const [isError,setIsError]=useState(false);

  const handleChange = (event, value) => {
    setPage(value);
    var idx=(value-1)*10;
    setPaginatedCoins(coins.slice(idx,idx+10))
  };

  const onSearchChange=(e)=>{
      setSearch(e.target.value);
  }
  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()));

  useEffect(()=>{
    getCoinsData();
  },[])

  const getCoinsData=async()=>{
      try {
        setIsError(false);
          const CoinsData = await get100CoinsData();
          if (CoinsData) {
              setIsLoading(false);
              setCoins(CoinsData);
              setPaginatedCoins(CoinsData.slice(0, 10));
              setIsError(false);
          }
      } catch (error) {
        setIsError(true);
      }
  }
    if (isError) return <h1>Data not found Please try again after sometime.</h1>
  return (
    <>
      <Header />
      <BackToTop/>
    {
      loading ? <Loader/>:
          <div className='dashboard_container'>
            <Search search={search} onSearchChange={onSearchChange} />
            <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
            {
              !search &&
              (<PaginationComponent page={page} handleChange={handleChange} />)
            }
          </div>
    }
    
    </>
  )
}

export default DashboardPage