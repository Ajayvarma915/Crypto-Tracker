import { ConvertDate } from "./ConvertDate";

export const SettingTwoCoinsData = (setChartData, prices1,prices2,crypto1,crypto2) => {
    setChartData({
        labels: prices1?.map((price) => ConvertDate(price.time)),
        datasets: [
            {
                label:crypto1,
                data: prices1?.map((price) => price.close),
                borderColor: "#3a80e9",
                borderWidth: 2,
                fill: false,
                tension: 0.25,
                backgroundColor:
                    "rgba(58,128,233,0.1)",
                pointRadius: 0,
                yAxisID: 'y',
            },
            {
                label: crypto2,
                data: prices2?.map((price) => price.close),
                borderColor: "#61c96f",
                borderWidth: 2,
                fill: false,
                tension: 0.25,
                backgroundColor:
                    "rgba(58,128,233,0.1)",
                pointRadius: 0,
                yAxisID: 'y1',
            },
        ],
    });
}