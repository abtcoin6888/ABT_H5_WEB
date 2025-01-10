import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

import Api from '/common/api/common';

export default {
    data() {
        return {
            pageBodyHeight: "",
            assetsArr: {
                assetsContent: [{
                    title: this.$t('analyze.text1'),
                    limit: "0.00",
                }],
                plArr: [{
                    text: this.$t('analyze.text2'),
                    amount: "0.00"
                }, {
                    text: this.$t('analyze.text3'),
                    amount: "0.00"
                }, {
                    text: this.$t('analyze.text4'),
                    amount: "0.00"
                }]
            },
            primaryTabs: [
                this.$t('analyze.text5'),
                this.$t('analyze.text6'),
                this.$t('analyze.text7')
            ],
            primaryTabCurrent: 0,
            timeTabs: [
                this.$t('analyze.text8'),
                this.$t('analyze.text9'),
                // this.$t('analyze.text10')
            ],
            timeTabCurrent: 0,
            modalShow: false,
            modalActive: 0,
            modalContent: [
                this.$t('analyze.text14'),
                this.$t('analyze.text15'),
                this.$t('analyze.text16')],
            datePickerShow: false,
            opts: {
                day:{
                    color: ['#4d9eb1'],
                    padding: [15, 0, 0, 0],
                    animation: true,
                    dataLabel: false,
                    enableScroll: false,
                    dataPointShape:false,
                    legend: {},
                    xAxis: {
                        disabled: true,
                        disableGrid: true,
                        axisLine: true,
                        title: "日期",
                        fontSize:5,
                        titleFontSize: 5,
                        boundaryGap: 'center',
                        gridType:"solid",
                        gridColor:"#262323",
                    },
                    yAxis: {
                        gridType:"dash",
                        dashLength:2,
                        disabled: false,
                        disableGrid: false,
                        axisLine: false,
                        gridColor:"#262323",
                        data: [{
                            min : 0,
                            max : 4000
                        }]
                    },
                    extra: {
                        tooltip: {
                            showBox: true,
                            splitLine: false,
                        },
                        column: {
                            type: "group", //curve
                            opacity: 0.5,
                            addLine: true,
                            width: 10,
                            gradient: true,
                            activeBgColor: "#000000",
                            activeBgOpacity: 0.08
                        }
                    }
                },
                sum:{
                    color: ['#4d9eb1'],
                    padding: [15, 0, 0, 0],
                    animation: true,
                    dataLabel: false,
                    enableScroll: false,
                    dataPointShape:false,
                    legend: {},
                    xAxis: {
                        disabled: true,
                        disableGrid: true,
                        axisLine: true,
                        title: "日期",
                        fontSize:5,
                        titleFontSize: 5,
                        boundaryGap: 'center',
                        gridType:"solid",
                        gridColor:"#262323",
                    },
                    yAxis: {
                        disabled: false,
                        disableGrid: false,
                        axisLine: false,
                        gridColor:"#262323",
                        data: [{
                            type: "value",
                            position: "left",
                            axisLine: false,
                            axisLineColor:"#262323",
                            calibration: false,
                            fontSize: 12,
                            tofix:2,
                            min : 0,
                            max : 0
                        }]
                    },
                    extra: {
                        tooltip: {
                            showBox: true,
                            splitLine: false,
                        },
                        line: {
                            type: "curve", //curve
                            opacity: 0.5,
                            addLine: true,
                            width: 2,
                            gradient: true,
                            activeType: "none"
                        }
                    }
                },
                balance:{
                    color: ['#4d9eb1'],
                    padding: [15, 0, 0, 0],
                    animation: true,
                    dataLabel: false,
                    enableScroll: false,
                    dataPointShape:false,
                    legend: {},
                    xAxis: {
                        disabled: true,
                        disableGrid: true,
                        axisLine: true,
                        title: "日期",
                        fontSize:5,
                        titleFontSize: 5,
                        boundaryGap: 'center',
                        gridType:"solid",
                        gridColor:"#262323",
                    },
                    yAxis: {
                        gridType:"dash",
                        dashLength:2,
                        disabled: false,
                        disableGrid: false,
                        axisLine: false,
                        gridColor:"#262323",
                        data: [{
                            tofix:2,
                            min : 0,
                            max : 4000
                        }]
                    },
                    extra: {
                        tooltip: {
                            showBox: true,
                            splitLine: false,
                        },
                        line: {
                            type: "curve", //curve
                            opacity: 0.5,
                            addLine: true,
                            width: 2,
                            gradient: true,
                            activeType: "none"
                        }
                    }
                }
            },
            groupData: {
                sumProfit:{
                    categories:[],
                    series:[{
                        name:"日期",
                        data:[]
                    }]
                },
                dayProfit:{
                    categories:[],
                    series:[{
                        name:"日期",
                        data:[]
                    }]
                },
                balance:{
                    categories:[],
                    series:[{
                        name:"日期",
                        data:[]
                    }]
                }
            },
            balance:{},
            timedate:"",
            total : '0.00',
            group : {}
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    onShow(){
        this.getData();
    },
	watch:{
		timeTabCurrent(v){
			this.getData();
		}
	},
    methods: {
        getData(){
            //this.$refs.loading.open();
            Api.analyze({day:this.timeTabCurrent === 0 ? 7 : 30}).then(res=>{
                //this.$refs.loading.close();
                this.group = res.data;
                this.balance = res.data.balance;
                this.timedate = res.data.time;
                this.total = res.data.total;
                this.assetsArr.assetsContent[0].limit = this.$util.thousandSeparator(parseFloat(res.data.balance.contract_balance) + parseFloat(res.data.balance.lock_contract));
                this.assetsArr.plArr[0]['amount'] = this.$util.thousandSeparator(res.data.day,2);
                this.assetsArr.plArr[1]['amount'] = this.$util.thousandSeparator(res.data.week,2);
                this.assetsArr.plArr[2]['amount'] = this.$util.thousandSeparator(res.data.month,2);
                let sumopt = this.opts.sum;
                sumopt.yAxis.data[0].min = res.data.sumList.value.reduce((a, b) => Math.min(a, b), Infinity) * 1.3;
                sumopt.yAxis.data[0].max = res.data.sumList.value.reduce((a, b) => Math.max(a, b), -Infinity) * 1.3;
                this.opts.sum = sumopt;
                let sumprofit = this.groupData.sumProfit ;

                sumprofit.categories = res.data.sumList.key;
                sumprofit.series[0] = {data:res.data.sumList.value,name:""};
                this.groupData.sumProfit = sumprofit;

                let dayOpt = this.opts.day;
                dayOpt.yAxis.data[0].min = res.data.dayList.value.reduce((a, b) => Math.min(a, b), Infinity) * 1.3;
                dayOpt.yAxis.data[0].max = res.data.dayList.value.reduce((a, b) => Math.max(a, b), -Infinity) * 1.3;
                this.opts.day = dayOpt;

                let dayValues = [];
                res.data.dayList.value.map(item=>{
                    if(parseFloat(item) >= 0){
                        dayValues.push({value:parseFloat(item),color:"#4d9eb0"});
                    }else{
                        dayValues.push({value:parseFloat(item),color:"#e5054b"});
                    }
                });
                let daySeries = this.groupData.dayProfit;
                daySeries.categories = res.data.dayList.key;
                daySeries.series[0] = {data:dayValues,name:""}
                this.groupData.dayProfit = daySeries;

                let bopt = this.opts.balance;
                bopt.yAxis.data[0].min = res.data.balanceList.value.reduce((a, b) => Math.min(a, b), Infinity) * 1.3;
                bopt.yAxis.data[0].max = res.data.balanceList.value.reduce((a, b) => Math.max(a, b), -Infinity) * 1.3;
                this.opts.balance = bopt;

                let bgroup = this.groupData.balance ;

                bgroup.categories = res.data.balanceList.key;
                bgroup.series[0] = {data:res.data.balanceList.value,name:""};
                this.groupData.balance = bgroup;


            });
        },
        initNavigation(e) {
            this.pageBodyHeight = uni.getSystemInfoSync().windowHeight -  e.height - e.statusBarHeight;
        },
        primaryTabSwtich(e) {
            this.primaryTabCurrent = e;
        },
        timeTabSwitch(e) {
            this.timeTabCurrent = e;
            this.datePickerShow = e == 2 ? true : false;
        },
        modalOpen(e) {
            this.modalActive = e;
            this.modalShow = true;
        },
        pickerChange(e){
            console.log(e)
        },
        toDetails(){
            console.log('111')
            uni.navigateTo({
                url: "/pages/wallet/analyze/datedetails/datedetails"
            })
        }
    }
}