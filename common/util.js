import {isNumeric} from "vant/lib/utils";
import moment from 'moment-timezone';

const unit = {
	'zh':['亿','万'],
	'zh-Hant':['亿','万'],
	'en':['HM','TH'],
	'ja':['億','万'],
	'ko':['亿','만']
};

export default {
    thousandSeparator(value, decimal = 2) {
        if (!value || value == '--' || isNaN(value)) return '0.00';
        if (parseFloat(value) === 0) {
            return '0.00';
        }
        const number = parseFloat(value);
        const formattedNumber = number.toFixed(decimal);

        const parts = formattedNumber.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return parts.join('.');
    },
    thousandUnit(value, decimal = 2) {
        if (!value) return '0';
        const number = parseFloat(value);
        if (number >= 10000) {
            return (number / 10000).toFixed(2) + 'M';
        }
        if (number >= 1000) {
            return (number / 1000).toFixed(2) + 'K';
        }
        return this.float(number);
    },
    float(v) {
        //不指定数字显示精度，格式化返回数字显示
        if (typeof v == 'undefined' || Number.isNaN(v)) {
            return '0.00';
        }
		v = String(v).replace(",","");
        if (parseFloat(v) == 0) {
            return '0.00';
        }
        const _fv = parseFloat(v) % 1 === 0 ? parseFloat(v).toFixed(2) : String(parseFloat(v));
        const parts = _fv.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return parts.join('.');
    },
    Number2(value) {
        try {
            return parseFloat(value).toFixed(2);
        } catch (e) {
            return '0.00';
        }
    },
    bigNumberToString(value) {
        value = parseFloat(value);
		var lang = uni.getStorageSync('lang');
		if(lang == '') {
			lang = 'zh'
		}
        if (value >= 100000000) {
            return (value / 100000000).toFixed(2) + unit[lang][0];
        }
        if (value >= 10000) {
            return (value / 10000).toFixed(2) + unit[lang][1];
        }
        return parseFloat(value).toFixed(2);
    },
    notOpne() {
        uni.showToast({
            title: '开发中，暂未开放',
            icon: "none",
            duration: 2000
        })
    },
    sortDesc(arrayList) {
        const result = [...arrayList].sort((a, b) => b.change_rate - a.change_rate)
        return result;
    },
    sortAsc(arrayList) {
        const result = [...arrayList].sort((a, b) => a.change_rate - b.change_rate)
        return result;
    },
    sortQuan(arrayList) {
        const result = [...arrayList].sort((a, b) => (b.quantity * b.new_price) - (a.quantity * a.new_price))
        return result;
    },
    replaceEmpty(v) {
        return v.replace(" ", "").replace("+", "");
    },
    isEmailAccount(input) {
        var regex = /@/;
        return regex.test(input);
    },
    /**
     * @desc 日期时间格式化
     * @param date 需要格式化的日期
     * @param format 格式化字符串(y-m-d h:i:s)
     * @param type  date的格式类型：1-日期字符串(2017/12/04 12:12:12) 2-时间戳(1603676514690) 3-日期字符串，无连接符(20171204121212)
     * 4-new Date()时间格式(Thu Oct 01 2020 00:00:00 GMT+0800 (中国标准时间))
     * @param isMs  时间戳精度是否为毫秒，默认为true（当精度为秒时传false），type=2时有效
     **/
    dateFormatter(date, format, type = 1, isMs = true) {
        let formatDate = ""
        if (type === 3) {
            formatDate = this._formatTimeStr(date, format)
        } else {
            formatDate = this._formatDate(format, date, type, isMs)
        }
        return formatDate;
    },
    _formatDate(formatStr, fdate, type = 1, isMs) {
        if (!fdate) return '';
        let fTime, fStr = 'ymdhis';
        if (type === 4) {
            fTime = fdate;
        } else {
            fdate = fdate.toString()
            if (~fdate.indexOf('.')) {
                fdate = fdate.substring(0, fdate.indexOf('.'));
            }
            fdate = fdate.replace('T', ' ').replace(/\-/g, '/');
            if (!formatStr)
                formatStr = "y-m-d h:i:s";
            if (fdate) {
                if (type === 2) {
                    fdate = isMs ? Number(fdate) : Number(fdate) * 1000
                }
                fTime = new Date(fdate);
            } else {
                fTime = new Date();
            }
        }
        let month = fTime.getMonth() + 1;
        let day = fTime.getDate();
        let hours = fTime.getHours();
        let minu = fTime.getMinutes();
        let second = fTime.getSeconds();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? ('0' + hours) : hours;
        minu = minu < 10 ? '0' + minu : minu;
        second = second < 10 ? '0' + second : second;
        let formatArr = [
            fTime.getFullYear().toString(),
            month.toString(),
            day.toString(),
            hours.toString(),
            minu.toString(),
            second.toString()
        ]
        for (let i = 0; i < formatArr.length; i++) {
            formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
        }
        return formatStr;
    },
    str2number(num) {
        if (num && num != undefined && num != null) {
            let _num = num;
            _num = _num.toString();
            _num = _num.replace(/,/gi, '');
            return _num
        } else {
            return num
        }
    },
    /**
     * 获取计价货币符号
     * @returns {any|string}
     */
    getLCS(){
        var currency = uni.getStorageSync('local-currency');
        if(typeof  currency != 'undefined' && currency != ''){
            return currency['symbol'];
        }else{
            return '$';
        }
    },
    /**
     * 获取计价汇率
     * @returns {number}
     */
    getLCR(){
        var rate = uni.getStorageSync('local-fee');
        if(typeof rate != 'undefined' && rate > 0){
            return parseFloat(rate);
        }else{
            return '1.00';
        }
    },
    getDateStr(){
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
	getDateAddDay(date,n){
		let diyDate = new Date(date)
		date = new Date(diyDate.setDate(diyDate.getDate() + n));
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
	},
	getDateTimeAddTime(n){
		var zone = uni.getStorageSync('time_zone');
		var localDate = moment(); 
		localDate.tz(zone); 
		localDate.add(n, 'minutes');
		return localDate.format('YYYY-MM-DD HH:mm');
		// var localDate = new Date();
		// var options = {
		// 	year: 'numeric', month: '2-digit', day: '2-digit',
		// 	hour: '2-digit', minute: '2-digit', second: '2-digit', 
		// 	hour12: false, timeZone: zone 
		// };
		// const formatter = new Intl.DateTimeFormat('en-US', options);
		// const formattedDate = formatter.format(localDate);
		// const [year, month, day, hour, minute, second] = formattedDate.match(/\d+/g);
		// return `${day}-${year}-${month} ${hour}:${parseInt(minute)+1}`;
	},
	getCurrentTicker(id,ticker){
		for(var c in ticker){
			if(parseInt(id) === parseInt(c)){
				return ticker[c];
			}
		}
		return {};
	},
	compareCurrency(list,ticker){
		if(ticker.cm_id || ticker.currency_id){
			var index = list.findIndex(item => parseInt(item.id) === parseInt(ticker.currency_id));
			if(index >= 0){
				list[index]['new_price'] = ticker.data['c'];
				list[index]['change_rate'] = ticker.data['P'];
				list[index]['quantity'] = ticker.data['v'];
			}
		}else{
			for(var c in ticker){
				var _ticker = ticker[c];
				var index = list.findIndex(item => parseInt(item.id) === parseInt(c));
				if(index >= 0){
					list[index]['new_price'] = _ticker['c'];
					list[index]['change_rate'] = _ticker['P'];
					list[index]['quantity'] = _ticker['v'];
				}
			}
		}
		
		return list;
	},
	hideText(str){
		if (str.length <= 8) {
			return str;
		}
		
		const start = str.substring(0, 3);
		const second = str.split('@');
		if(second.length > 1){
			const end = second[0].substring(str.length - 4);
			return start + "****" + end+"@"+second[1];
		}else{
			const end = str.substring(str.length - 4);
			return start + "****" + end;
		}
	},
	serverTime(){
		var zone = uni.getStorageSync('time_zone');
		var localDate = moment();
		localDate.tz(zone); 
		return localDate.format('YYYY-MM-DD HH:mm:ss');
		// var zone = uni.getStorageSync('time_zone');
		// var localDate = new Date();
		// var options = {
		// 	year: 'numeric', month: '2-digit', day: '2-digit',
		// 	hour: '2-digit', minute: '2-digit', second: '2-digit', 
		// 	hour12: false, timeZone: zone 
		// };
		// const formatter = new Intl.DateTimeFormat('en-US', options);
		// const formattedDate = formatter.format(localDate);
		// var [year, month, day, hour, minute, second] = formattedDate.match(/\d+/g);
		// if(parseFloat(hour) === 24){
		// 	hour = '00';
		// }
		// return `${day}-${year}-${month} ${hour}:${minute}:${second}`;
	},
	toPage(path){
		uni.navigateTo({
			url:path
		})
	}
}