import React from 'react';
import Pagination from '@mui/material/Pagination';
import "./styles.css"
import { useMediaQuery } from '@mui/material';
export default function PaginationComponent({page,handleChange}) {
    const smallScreen=useMediaQuery('(max-width:767px)');
    return (
        <div className='pagination_container'>
            <Pagination count={10} page={page} onChange={(event,value)=>handleChange(event,value)} className={smallScreen?"smallPagination":"largePagination"} sx={{
                "& .MuiPaginationItem-text": {
                    color: "#fff !important",
                    border: "1px solid var(--grey)",
                },
                "& .MuiPaginationItem-text:hover": {
                    backgroundColor: "transparent !important",
                },
                "& .Mui-selected  ": {
                    backgroundColor: "var(--blue) !important",
                    borderColor: "var(--blue)",
                },
                "& .MuiPaginationItem-ellipsis": {
                    border: "none",
                },
            }} size={smallScreen?'medium':'large'}/>
        </div>
    );
}
