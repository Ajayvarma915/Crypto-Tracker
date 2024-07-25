import axios from "axios";
export const get100CoinsData=()=>{
    const data=axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1')
        .then((Response) => {
            return Response.data;
        })
        .catch((Error) => {
            console.log("error in fetching data");
        })
    return data;
}