import {
    mapState,
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    data() {
        return {
            pageBodyHeight: "",
            startTime: "",
            endTime: "",
            dataList: [{
                time: "2024-05-14",
                dataArr: [
                    {
                        text: this.$t('detail.text2'),
                        limit: "0.00"
                    }, {
                        text: this.$t('detail.text3'),
                        limit: "0.00"
                    }, {
                        text: this.$t('detail.text4'),
                        limit: "0.00"
                    }, {
                        text: this.$t('detail.text5'),
                        limit: "0.00"
                    }
                ]
            }],
            datePickerShow: false
        }
    },
    computed: {
        ...mapGetters(['userTheme'])
    },
    mounted() {
        this.getDate();
    },
    methods: {
        initNavigation(e) {
            this.pageBodyHeight = uni.getSystemInfoSync().windowHeight - e.height - e.statusBarHeight;
        },
        getFormattedDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        },
        getDate() {
            let currentDate = new Date();
            let formattedToday = this.getFormattedDate(currentDate);

            let previousDate = new Date(currentDate);
            previousDate.setDate(currentDate.getDate() - 1);

            let formattedPrevious = this.getFormattedDate(previousDate);
            this.startTime = formattedPrevious;
            this.endTime = formattedToday;
        },
        pickerChange(e) {
            this.startTime = e.startDate.result;
            this.endTime = e.endDate.result;
        }
    }
}