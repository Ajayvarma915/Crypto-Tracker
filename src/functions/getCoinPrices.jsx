import axios from "axios";
const GetCoinPrices=(symbol,days)=>{
    const priceData = axios.get(`https://min-api.cryptocompare.com/data/v2/histoday`, {
        params: {
            fsym: symbol,
            tsym: 'USD',
            limit: days,
            api_key: '675904b8b04a3f0a7289ac31ea9a373b3fab0d8cf3ef8f0aa3d1063bab347b44'
        },})
        .then((Response) => {
            return Response.data
        })
        .catch((Error) => {
            console.log(Error.message);
        })
    return priceData;
}
export default GetCoinPrices;