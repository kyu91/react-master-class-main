import { useOutletContext } from "react-router";
import { useQuery } from 'react-query';
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

interface IcoinId {
    coinId: string;
}

interface IHistorical {
    close: string,
    high: string,
    low: string,
    market_cap: number,
    open: string,
    time_close: number,
    time_open: number,
    volume: string,
}

const Price = () => {
    const { coinId } = useOutletContext<IcoinId>();
    const { isLoading, data } = useQuery<IHistorical[]>(
        ['ohlcv', coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    )
    return (
        <div>
            {
                isLoading ? "Loading chart..." :
                    <ApexChart
                        type='area'
                        series={[
                            {
                                name: "Chart",
                                data: data?.map((price) => parseInt(price.close)) ?? [],
                            },
                        ]}
                        options={{
                            theme: {
                                mode: "dark",
                            },
                            chart: {
                                height: 300,
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                                background: "transparent",
                            },
                            grid: {
                                show: false,
                            },
                            yaxis: {
                                show: false,
                            },
                            xaxis: {
                                axisBorder: {
                                    show: false,
                                },
                                labels: {
                                    show: false,
                                },
                                axisTicks: {
                                    show: false,
                                },
                                type: "datetime",
                                categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    gradientToColors: ["blue"], stops: [0, 100]
                                },
                            },
                            colors: ["red"],
                            tooltip: {
                                y: {
                                    formatter: (value) => `$ ${value}`,
                                },
                            }

                        }}
                    />
            }
        </div>
    )
}

export default Price