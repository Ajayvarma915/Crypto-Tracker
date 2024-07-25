import React from 'react'
import "./styles.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const Search = ({search,onSearchChange}) => {
  return (
    <div className='search_bar'>
        <div className='search_bar_container'>
            <SearchRoundedIcon/>
        <input type="text" placeholder='Search' value={search} onChange={(e)=>onSearchChange(e)}/>
        </div>
      </div>
  )
}

export default Search
