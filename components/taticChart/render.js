import {init, dispose} from 'klinecharts'

var chart = null;

export default {
    data() {
        return {
            chartInit: []
        }
    },
    created() {
        this.initChart()
    },
    methods: {
        initChart() {
            chart = init('kline');
            chart.setOffsetRightDistance(10);
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
                crosshair: {
                    show: false
                },
                candle: {
                    type: "area",
                    area: {
                        lineSize: 1,
                        lineColor: '#2196F3',
                        value: 'close',
                        smooth: false,
                        backgroundColor: [{
                            offset: 0,
                            color: 'rgba(33, 150, 243, 0.15)'
                        }, {
                            offset: 1,
                            color: 'rgba(33, 150, 243, 0.5)'
                        }],
                        point: {
                            show: false
                        }
                    },
                    priceMark: {
                        show: false,
                    },
                    tooltip: {
                        showRule: "none"
                    }
                }
            });
        },
        updateChartData(chartData){
            if(chart) {
                chart.applyNewData(chartData)
            }
        }
    },
}