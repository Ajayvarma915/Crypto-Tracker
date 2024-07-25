import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider, createTheme } from '@mui/material';
import Grid from '../Grid';
import "./styles.css"
import List from '../List';

export default function TabsComponent({coins}) {
    const [value, setValue] = useState('grid');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme=createTheme({
        palette:{
            primary:{
                main:"#3a80e9",
            }
        }
    })
    const style={
        color:"var(--white)",
        textTransform:'capitalize',
    }

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant='fullWidth'>
                    <Tab label="Grid" value="grid" sx={style}/>
                    <Tab label="List" value="list" sx={style}/>
                </TabList>
                <TabPanel value="grid">
                    <div className='grid_flex'>
                        {
                            coins.map((coin,i)=>{
                                return <Grid coin={coin} delay={(i%4)*0.2} key={i}/>
                            })
                        }
                    </div>
                </TabPanel>
                <TabPanel value="list">
                    <table className='list_table'>
                        <tbody className='list_table'>
                        {
                            coins.map((coin,i)=>{
                                return <List coin={coin} delay={(i%4)*0.2} key={i}/>
                            })
                        }
                        </tbody>
                    </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
}
