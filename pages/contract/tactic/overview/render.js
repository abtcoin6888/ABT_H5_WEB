import {init, dispose} from 'klinecharts'

var chart = null;

export default {
    data() {
        return {
            chartContainer: []
        }
    },
    created() {
        // this.initChart();
    },
    methods: {
        initChart() {
            chart = init('kline');

            const dataList = [
                {timestamp: 1624521600000, open: 2320.26, close: 2300.00, low: 2287.3, high: 2362.94},
                {timestamp: 1624608000000, open: 2300.00, close: 2291.30, low: 2288.26, high: 2308.38},
                {timestamp: 1624694400000, open: 2295.35, close: 2346.50, low: 2295.35, high: 2346.92},
                {timestamp: 1624780800000, open: 2347.22, close: 2358.98, low: 2337.35, high: 2363.8},
                {timestamp: 1624867200000, open: 2360.75, close: 2382.48, low: 2347.89, high: 2383.76}
            ];
            chart.applyNewData(dataList);
            chart.setMaxOffsetLeftDistance(0);
            chart.setScrollEnabled(false);
            chart.setStyles({
                grid: {
                    show: false
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                candle: {
                    type: "area",
                    area: {
                        lineSize: 1,
                        lineColor: '#2196F3',
                        value: 'close',
                        smooth: true,
                        backgroundColor: [{
                            offset: 0,
                            color: 'rgba(33, 150, 243, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(33, 150, 243, 0.8)'
                        }]
                    },
                    priceMark: {
                        show: false,
                    },
                    tooltip: {
                        showRule: "none"
                    },
                    crosshair: {
                        show: false
                    }
                }
            });
        },
    },
}